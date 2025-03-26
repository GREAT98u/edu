import './App.css';
import Auth from './components/Auth';
import {Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PersonalizedLearning from './components/PersonalizedLearning';
import Chatbot from './components/Chatbot';
import GetBooks from './components/GetBook';


function App() {
  return (
    <div>
      <LandingPage/>
      <Routes>
        <Route path='/PersonalizedLearning' element={<PersonalizedLearning/>}></Route>
        <Route path='/chatbot' element={<Chatbot/>}></Route>
        <Route path='/get_books' element={<GetBooks/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
