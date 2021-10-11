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
import Supervisor from './Components/SupervisorDashboard/SupervisorDashboard';
import MyLECs from './Components/MyLECsPage/MyLECs';
import ViewLECs from './Components/ViewLECsPage/ViewLECs';
import "./App.css";
import "./NavBar.css";


import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import {Navbar,Container,Nav} from 'react-bootstrap';
import React from "react";
import Logo from "./Components/images/logo.png";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            identity:0,
            username:"",
            login:false
        };
        this.setPare = this.setPare.bind(this);
        this.handleUserLogin = this.handleUserLogin.bind(this);
    }

    setPare(){
        console.log("select LEC!")
        this.setState({
            identity:1
        })

    }

    handleUserLogin(username){
        this.setState({
            identity:2,
            username:username,
            login:true,
        })
    }





    render(){


        return (
            <div className="App">
                <Navbar bg="light" expand="lg" >
                    <Container>
                        <img href="/"
                             src={Logo}
                             alt="Logo"
                             className="icon-img"
                        />
                        <Navbar.Brand href="/" className="brand"> LEx mirror </Navbar.Brand>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">

                                <Nav.Link href='/'>Home</Nav.Link>
                                <Nav.Link href="/register"   style={{display: this.state.identity==0? "block":"none"}}>Register</Nav.Link>
                                <Nav.Link href="/login"   style={{display: this.state.identity==0? "block":"none"}}>Login</Nav.Link>


                                <Nav.Link href="/login"    style={{display: this.state.identity==0? "none":"block"}}>Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>

                        <Navbar.Text style={{display: this.state.login==true? "block":"none"}}>
                            {"Welcome "+ this.state.username+"!"}
                        </Navbar.Text>
                    </Container>
                </Navbar>



                <Switch>
                    <Route path='/login' render={(props) => (<Login handleUserLogin={this.handleUserLogin} {...props}/>)}/>
                    <Route path='/register' component={RegisterPage}/>
                    <Route path='/listQuiz' component={ListQuizPage}/>
                    <Route path='/createQuiz' component={CreateQuizPage}/>
                    <Route path='/editQuiz' component={EditQuizPage}/>
                    <Route path='/communication' component={CommunicationPage}/>
                    <Route path='/quiz' component={QuizPage}/>
                    <Route path='/feedback' component={FeedBackPage}/>
                    <Route path='/share' component={SharePage}/>
                    <Route path='/supervisor' component={SupervisorDashboard}/>
                    <Route path='/myLECs' component={MyLECsPage}/>
                    <Route path='/viewLECs' component={ViewLECsPage}/>
                    <Route exact path='/'  render={(props) => (<Home setPare={this.setPare} {...props}/>)}/>

                </Switch>



                <Navbar bg="light" expand="lg" fixed="bottom" style={{display:this.state.identity==1?"block":"none"}}>
                    <Container>
                        <Navbar.Brand>How do you feel about using LEx Mirror? Tell us how you think we can improve!</Navbar.Brand>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">

                                <Nav.Link href="/login">Give Comment</Nav.Link>

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

            </div>
        );
    }
}


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

const SupervisorDashboard = () => (
    <Supervisor />
);

const MyLECsPage = () => (
    <MyLECs />
);

const ViewLECsPage = () => (
    <ViewLECs />
);


export default App;
