import Home from './Components/HomePage/Home';
import Login from './Components/LoginPage/Login';
import Register from './Components/RegisterPage/Register';
import ListQuiz from './Components/ListQuizPage/listQuiz';
import Communication from './Components/Communication/Communication';
import Quiz from './Components/Quiz/quiz';


import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar/NavBar';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
        <div className="App">
            <NavBar />
            <Switch>
                <Route path='/login' component={LoginPage}/>
                <Route path='/register' component={RegisterPage}/>
                <Route path='/listQuiz' component={ListQuizPage}/>
                <Route path='/communication' component={CommunicationPage}/>
                <Route path='/quiz' component={QuizPage}/>
                <Route exact path='/' component={HomePage}/>
            </Switch>
        </div>
  );
}
const HomePage = () => (
    <Home />
);
const LoginPage = () => (
    <Login />
);
const RegisterPage = () => (
    <Register />
);

const ListQuizPage = () => (
    <ListQuiz />
);

const CommunicationPage = () => (
    <Communication />
);

const QuizPage = () => (
    <Quiz />
);

export default App;
