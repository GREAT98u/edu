import './App.css';
import Auth from './components/Auth';
import {Route, Routes} from 'react-router-dom';
import PersonalizedLearning from './components/PersonalizedLearning';
import Chatbot from './components/Chatbot';
import GetBooks from './components/GetBook';
import TrendingTopics from './components/TrendingTopics'
import QuizGenerator from './components/QuizGenerator';
import TeacherSupport from './components/TeacherSupport';
import Land from './components/Land';


function App() {
  return (
    <div className='fog'>
      
      <Routes>
        <Route path='/' element={<Auth/>}></Route>
        <Route path='/first' element={<Land/>}></Route>
        <Route path='/PersonalizedLearning' element={<PersonalizedLearning/>}></Route>
        <Route path='/chatbot' element={<Chatbot/>}></Route>
        <Route path='/get_books' element={<GetBooks/>}></Route>
        <Route path='/get_trend' element={<TrendingTopics/>}></Route>
        <Route path='/Quiz' element={<QuizGenerator/>}></Route>
        <Route path='/Auth' element={<Auth/>}></Route>
        <Route path='/teach' element={<TeacherSupport/>}></Route>
      </Routes>

    </div>
  );
}

export default App;
