import Home from './Components/HomePage/Home';
import Login from './Components/LoginPage/Login';
import ResetPassword from './Components/resetPassword/resetPassword';
import Register from './Components/RegisterPage/Register';
import UpdateAccount from './Components/UpdateAccountPage/UpdateAccount';
import ListQuiz from './Components/ListQuizPage/listQuiz';
import CreateQuiz from './Components/CreateQuizPage/CreateQuiz';
import EditQuiz from './Components/EditQuizPage/EditQuiz';
import Communication from './Components/Communication/Communication';
import Quiz from './Components/Quiz/quiz';
import FeedBack from './Components/FeedBack/FeedBack';
import Supervisor from './Components/SupervisorDashboard/SupervisorDashboard';
import MyLECs from './Components/MyLECsPage/MyLECs';
import ViewLECs from './Components/ViewLECsPage/ViewLECs';
import ViewComments from './Components/ViewCommentsPage/ViewComments';
import "./App.css";
import "./NavBar.css";


import cookie from 'react-cookies'
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
            commentShow:false,
            comment:""
        };

    }





    handleUserLogout(){
        this.setState({
            identity:0,
            username:"Anonymous",
            login:false,
        })
        cookie.save('identity',0)
        cookie.save('username',"Anonymous")
        cookie.save('login',false)
        console.log(cookie.load('username'))
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

    handleCommentChange(event){
        this.setState({comment:event.target.value})
    }

    submitComment(){
        this.setState({
            commentShow:false
        })

        fetch('http://localhost:8080/result/save_comment',{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({"comment": this.state.comment})
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            console.log(data["errorMessage"]);
            //data from backend
        }).catch(function(error){
            console.log(error)
        })
    }


    render(){


        return (
            <div className="App">
                <Navbar bg="light" expand="lg" fixed="top" >
                    <Container>
                        <img href="/"
                             src={Logo}
                             alt="Logo"
                             className="icon-img"
                             onClick={this.handleUserLogout.bind(this)}
                        />
                        <Navbar.Brand href="/"
                                      className="brand"
                                      onClick={this.handleUserLogout.bind(this)}
                        > LEx mirror </Navbar.Brand>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href='/' style={{display: cookie.load("login")=="true"? "none":"block"}}>Home</Nav.Link>
                                <Nav.Link href={cookie.load("identity")=="1"? "/listQuiz":"/supervisor"} style={{display: cookie.load("login")=="true"? "block":"none"}}>My dashboard</Nav.Link>
                                <Nav.Link href="/register"   style={{display: cookie.load("login")=="true"? "none":"block"}}>Register</Nav.Link>
                                <Nav.Link href="/login"   style={{display: cookie.load("login")=="true"? "none":"block"}}>Login</Nav.Link>
                                <Nav.Link onClick={this.handleUserLogout.bind(this)} href="/"   style={{display: cookie.load("login")=="true"? "block":"none"}}>Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>

                        <Navbar.Text style={{display: cookie.load("login")=="true"? "block":"none"}}>
                            {"Welcome "+ cookie.load("username")+"!"}
                        </Navbar.Text>
                        <NavDropdown title="User" style={{display: cookie.load("login")=="true"? "block":"none"}} id="dropdown">
                            <NavDropdown.Item><Link to={cookie.load("identity")=="1"? "/listQuiz":"/supervisor"}>Dashboard</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to="/updateAccount">Update account detail</Link> </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={this.handleUserLogout.bind(this)} href="/" >Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Container>
                </Navbar>


                <div className="App-container">
                    <Switch>
                        <Route path='/login' component={Login}/>)}/>
                        <Route path='/resetPassword' component={ResetPassword}/>)}/>
                        <Route path='/register' component={RegisterPage}/>
                        <Route path='/updateAccount' component={UpdateAccount}/>
                        <Route path='/listQuiz' render={(props) => (<ListQuiz login={this.state.login} username={this.state.username} {...props}/>)}/>
                        <Route path='/createQuiz' render={(props) => (<CreateQuiz login={this.state.login} username={this.state.username} {...props}/>)}/>
                        <Route path='/editQuiz' component={EditQuizPage}/>
                        <Route path='/communication' component={CommunicationPage}/>
                        <Route path='/quiz' component={QuizPage}/>
                        <Route path='/feedback' component={FeedBackPage}/>
                        <Route path='/supervisor' render={(props) => (<Supervisor login={this.state.login} username={this.state.username} {...props}/>)}/>

                        <Route path='/myLECs' render={(props) => (<MyLECs username={this.state.username} {...props}/>)}/>
                        <Route path='/viewLECs' component={ViewLECsPage}/>
                        <Route path='/viewComments' component={ViewComments}/>
                        <Route exact path='/'  component={Home}/>

                    </Switch>
                </div>







                <Navbar bg="light" expand="lg" fixed="bottom" style={{display:cookie.load('identity')==1&&this.props.location.pathname!="/"?"block":"none"}}>
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
                            <Form.Control as="textarea"
                                          className="give-comment-textarea"
                                          value={this.state.comment}
                                          onChange={this.handleCommentChange.bind(this)}
                                          placeholder="Please leave your comment here..."
                            />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.submitComment.bind(this)}>Submit</Button>
                    </Modal.Footer>


                </Modal>

            </div>
        );
    }
}

const RegisterPage = () => (
    <Register />
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


const ViewLECsPage = () => (
    <ViewLECs />
);


export default withRouter(App);
