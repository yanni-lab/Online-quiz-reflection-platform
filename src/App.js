import Home from './Components/HomePage/Home';
import Login from './Components/LoginPage/Login';
import Register from './Components/RegisterPage/Register';
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

export default App;