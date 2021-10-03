import Home from './Components/HomePage/Home';
import Login from './Components/LoginPage/Login';
import Register from './Components/RegisterPage/Register';
import ListQuiz from './Components/ListQuizPage/listQuiz';
import CreateQuiz from './Components/CreateQuizPage/CreateQuiz';
import EditQuiz from './Components/EditQuizPage/EditQuiz';
import Communication from './Components/Communication/Communication';
import Quiz from './Components/Quiz/quiz';
import FeedBack from './Components/FeedBack/FeedBack';
import Share from './Components/SharePage/Share';
import "./App.css";


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
                <Route path='/createQuiz' component={CreateQuizPage}/>
                <Route path='/editQuiz' component={EditQuizPage}/>
                <Route path='/communication' component={CommunicationPage}/>
                <Route path='/quiz' component={QuizPage}/>
                <Route path='/feedback' component={FeedBackPage}/>
                <Route path='/share' component={SharePage}/>

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

const CreateQuizPage = () => (
    <CreateQuiz />
);

const EditQuizPage = () => (
    <EditQuiz />
);

const CommunicationPage = () => (
    <Communication />
);

const QuizPage = () => (
    <Quiz />
);

const FeedBackPage = () => (
    <FeedBack />
);


const SharePage = () => (
    <Share />
);

export default App;
