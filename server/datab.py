######################
## CONNECTION SETUP ##
######################
import psycopg2
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()
def get_db_connection(autocommit=False,dbname = os.getenv("MY_DATABASE")):
    try:
        conn = psycopg2.connect(
            database=dbname,
            host=os.getenv("MY_HOST"),
            port=os.getenv("MY_PORT"),
            password=os.getenv("MY_PASSWORD"),
            user=os.getenv("MY_USER"),
        )

        # if dbname == "postgres":
        conn.autocommit = autocommit

    except Exception as e:
        raise ConnectionError (f"error: {e} occurred while connecting to database")

    return conn



def create_database():
    """Drops and recreates the 'hackathon' database."""
    conn = get_db_connection(dbname='postgres')  # Connect to 'postgres' database
    conn.autocommit = True  # Required for DROP DATABASE
    try:
        with conn.cursor() as cur:
            # Terminate active connections before dropping the DB
            cur.execute("""
                SELECT pg_terminate_backend(pg_stat_activity.pid)
                FROM pg_stat_activity
                WHERE datname = 'hackathon' AND pid <> pg_backend_pid();
            """)
            cur.execute("DROP DATABASE IF EXISTS hackathon;")
            cur.execute("CREATE DATABASE hackathon;")
        print("Database 'hackathon' created successfully!")
    finally:
        conn.close()
    conn = get_db_connection(dbname='hackathon')
    print("Now connected to:", query(conn, "SELECT current_database();", fetch=True)[0][0])
    # ✅ Reconnect to 'hackathon' DB and create tables
    create_tables()

def create_tables():
    """Executes SQL script from a file and lists tables after execution."""
    ddl = """CREATE TABLE IF NOT EXISTS students_info(
                                       id SERIAL PRIMARY KEY,
                                       first_name TEXT NOT NULL,
                                       last_name TEXT NOT NULL,
                                       email VARCHAR(40) NOT NULL UNIQUE,
                                       country TEXT NOT NULL,
                                       state TEXT NOT NULL,
                                       language TEXT NOT NULL,
                                       class INT NOT NULL CHECK (class >= 6 AND class <= 12),
                                       password VARCHAR(40) NOT NULL
    );

CREATE TABLE IF NOT EXISTS teachers_info(
                                            id SERIAL PRIMARY KEY,
                                            first_name TEXT NOT NULL,
                                            last_name TEXT NOT NULL,
                                            email VARCHAR(40) NOT NULL UNIQUE,
                                            country TEXT NOT NULL,
                                            state TEXT NOT NULL,
                                            language TEXT NOT NULL,
                                            class INT NOT NULL CHECK (class >= 6 AND class <= 12),
                                            password VARCHAR(40) NOT NULL
    );
"""

    script = ddl.strip().split(";")

    with get_db_connection(autocommit=True,) as conn:
        with conn.cursor() as cur:
            for statement in script:
                if statement.strip():
                    # print(f"Executing SQL:\n{statement}")  # Debugging
                    cur.execute(statement)

            # # Check if tables exist after execution
            # cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
            # tables = cur.fetchall()
            # print("Tables in database:", tables)            #######DEBUGGING##


def query(conn, q, fetch=False, data=None):
    with conn.cursor() as cur:

        if fetch:  # Always return data if fetch=True
            # print("Fetch is True")
            if data:
                # print("Executing with data:", data)
                cur.execute(q, data)
            else:
                # print("Executing without data")
                cur.execute(q)

            result = cur.fetchall()  # Fetch results
            return result # Return fetched data

        elif data:  # If fetch=False but data exists, execute query
            print("Executing with data (no fetch):", data)
            if isinstance(data, tuple):
                cur.execute(q, data)
            else:
                cur.executemany(q, data)

        else:  # If neither fetch nor data, just execute query
            print("Executing query without fetch or data")
            cur.execute(q)

def insert_students(student: tuple):
    ddl = "INSERT INTO students_info (first_name, last_name,email,password, country, state, language, class) VALUES (%s, %s,%s, %s, %s, %s,%s); "
    with get_db_connection(autocommit=True,) as conn:
        with conn.cursor() as cur:
            query(conn,ddl, data = student)
# data.get("first_name"), data.get("last_name"), data.get("email"), data.get("password"),
# data.get("country"), data.get("state"), data.get("role"), data.get("language"),
# int(data.get("class", 0))  # Ensure "class" is an integer
def insert_teachers(teacher: tuple):
    ddl = "INSERT INTO teachers_info (first_name, last_name,email,password, country, state, language, class) VALUES (%s, %s,%s, %s, %s, %s,%s); "
    with get_db_connection(autocommit=True,) as conn:
        with conn.cursor() as cur:
            query(conn,ddl, data = teacher)

def check_user_exist(detail):
    # detail = (email, password)
    ddl = "SELECT id, role FROM users WHERE email = %s AND password = %s;"
    with get_db_connection(autocommit=True) as conn:
        result = query(conn, ddl, fetch=True, data=detail)
        return result[0] if result else None


create_database()
