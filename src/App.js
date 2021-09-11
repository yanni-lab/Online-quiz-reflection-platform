import Home from './Components/HomePage/Home';
import Login from './Components/LoginPage/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (

        <div className="App">
            <HomePage />

        </div>


  );
}
const HomePage = () => (
    <Home />
);
const LoginPage = () => (
    <Login />
);

export default App;
