CREATE TABLE IF NOT EXISTS students_info(
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
