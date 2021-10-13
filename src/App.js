import Home from './Components/HomePage/Home';
import Login from './Components/LoginPage/Login';
import Register from './Components/RegisterPage/Register';
import UpdateAccount from './Components/UpdateAccountPage/UpdateAccount';
import ListQuiz from './Components/ListQuizPage/listQuiz';
import CreateQuiz from './Components/CreateQuizPage/CreateQuiz';
import EditQuiz from './Components/EditQuizPage/EditQuiz';
import Communication from './Components/Communication/Communication';
import Quiz from './Components/Quiz/quiz';
import FeedBack from './Components/FeedBack/FeedBack';
import Share from './Components/SharePage/Share';
import Supervisor from './Components/SupervisorDashboard/SupervisorDashboard';
import LEC from './Components/LECDashboard/LECDashboard';
import MyLECs from './Components/MyLECsPage/MyLECs';
import ViewLECs from './Components/ViewLECsPage/ViewLECs';
import ViewComments from './Components/ViewCommentsPage/ViewComments';
import "./App.css";
import "./NavBar.css";


import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import {Navbar,Container,Nav,Modal,Button,Form,NavDropdown} from 'react-bootstrap';
import React from "react";
import Logo from "./Components/images/logo.png";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            identity:0,
            username:"Anonymous",
            login:false,
            commentShow:false
        };
        this.setPare = this.setPare.bind(this);
        this.handleUserLogin = this.handleUserLogin.bind(this);
        console.log(this.props.location.pathname)
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

    handleUserLogout(){
        this.setState({
            identity:0,
            username:"Anonymous",
            login:false,
        })

    }

    showComment(){
        this.setState({
            commentShow:true
        })
    }

    closeComment(){
        this.setState({
            commentShow:false
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
                                <Nav.Link href="/register"   style={{display: this.state.login==0? "block":"none"}}>Register</Nav.Link>
                                <Nav.Link href="/login"   style={{display: this.state.login==0? "block":"none"}}>Login</Nav.Link>
                                <Nav.Link onClick={this.handleUserLogout.bind(this)} href="/"   style={{display: this.state.login==0? "none":"block"}}>Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>

                        <Navbar.Text style={{display: this.state.login==true? "block":"none"}}>
                            {"Welcome "+ this.state.username+"!"}
                        </Navbar.Text>
                        <NavDropdown title="User" style={{display: this.state.login==true? "block":"none"}} id="dropdown">
                            <NavDropdown.Item href="#action/3.1">Dashboard</NavDropdown.Item>
                            <NavDropdown.Item><Link to="/updateAccount">Update account detail</Link> </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={this.handleUserLogout.bind(this)} href="/" >Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Container>
                </Navbar>



                <Switch>
                    <Route path='/login' render={(props) => (<Login handleUserLogin={this.handleUserLogin} {...props}/>)}/>
                    <Route path='/register' component={RegisterPage}/>
                    <Route path='/updateAccount' component={UpdateAccount}/>
                    <Route path='/listQuiz' render={(props) => (<ListQuiz login={this.state.login} username={this.state.username} {...props}/>)}/>
                    <Route path='/createQuiz' render={(props) => (<CreateQuiz login={this.state.login} username={this.state.username} {...props}/>)}/>
                    <Route path='/editQuiz' component={EditQuizPage}/>
                    <Route path='/communication' component={CommunicationPage}/>
                    <Route path='/quiz' component={QuizPage}/>
                    <Route path='/feedback' component={FeedBackPage}/>
                    <Route path='/share' component={SharePage}/>
                    <Route path='/supervisor' render={(props) => (<Supervisor login={this.state.login} username={this.state.username} {...props}/>)}/>
                    <Route path='/lec' component={LEC}/>
                    <Route path='/myLECs' render={(props) => (<MyLECs username={this.state.username} {...props}/>)}/>
                    <Route path='/viewLECs' component={ViewLECsPage}/>
                    <Route path='/viewComments' component={ViewComments}/>
                    <Route exact path='/'  render={(props) => (<Home setPare={this.setPare} {...props}/>)}/>

                </Switch>



                <Navbar bg="light" expand="lg" fixed="bottom" style={{display:this.state.identity==1&&this.props.location.pathname!="/"?"block":"none"}}>
                    <Container>
                        <Navbar.Brand>How do you feel about using LEx Mirror? Tell us how you think we can improve!</Navbar.Brand>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">

                                <Nav.Link onClick={this.showComment.bind(this)}>Give Comment</Nav.Link>

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>


                <Modal  show = {this.state.commentShow}
                        onClick =  {this.cancelLeaveQuiz}
                >

                    <Modal.Header>
                        Please tell us how we can improve LEx Mirror
                        <Button className = "cancel" onClick={this.closeComment.bind(this)}>X</Button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Control as="textarea"/>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeComment.bind(this)}>Submit</Button>
                    </Modal.Footer>


                </Modal>

            </div>
        );
    }
}

const RegisterPage = () => (
    <Register />
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



const ViewLECsPage = () => (
    <ViewLECs />
);


export default withRouter(App);