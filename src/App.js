import Home from './Components/HomePage/Home';
import Login from './Components/LoginPage/Login';
import Register from './Components/RegisterPage/Register';
import ListQuiz from './Components/ListQuizPage/ListQuiz';

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

export default App;
