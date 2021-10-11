import React from "react";
import {Button,Form,Row,Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import LoginLogo from '../images/loginLogo.png';


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            showModal: false,
            successModal:false
        };

        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancelModal = this.handleCancelModal.bind(this);
        this.handleSuccessCancelModal = this.handleSuccessCancelModal.bind(this);
        // this.validateForm = this.validateForm.bind(this);
    };
    // validateForm() {
    //     return !this.state.username ||
    //         ! this.state.password ||
    //         || !this.state.repassword.length > 0;
    // }

    handleUserChange(evt) {
        this.setState({
            username: evt.target.value,
        });
    };

    handlePassChange(evt) {
        this.setState({
            password: evt.target.value,
        });
    }

    handleSubmit() {
        this.setState({
            successModal:true
        })


        /**console.log(this.state);
        var dataSent = JSON.stringify({"username": this.state.username,"password": this.state.password});
        this.token = "";
        event.preventDefault();
        fetch('http://localhost:8080/user/login',{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body:dataSent
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            console.log(data["token"]);
            if (data["token"] != ""){
                this.token = data["token"].split(":")[1];
            }
            else{
                this.token = "";
            }
            if(this.token == ""){
                this.setState({
                        showModal:true
                    }
                )
            }
            console.log(this.token);
            if(this.token==""){
                this.setState({
                        showModal:true
                    }
                )
            }
            else{
                this.setState({
                    successModal:true
                })
            }
            //data from backend
        }).catch(function(error){
            console.log(error)
        })**/

        //const token = "111"

    }

    handleCancelModal(){
        this.setState({
                showModal:false
            }
        )
    }

    handleSuccessCancelModal(){
        this.setState({
            successModal:false,
        })
        this.props.handleUserLogin(this.state.username)
        this.props.history.push({
            pathname: "/supervisor",
            state:{
                username:this.state.username
            }
        })
    }


    render(){
        document.title = "Login"
        return (
            <div className="Login">
                <div className="box justify-content-center align-items-center">
                    <Form className="loginForm"
                          // onSubmit={this.handleSubmit}
                    >
                        <div className="loginlogo">
                            <img href="/"
                                 src={LoginLogo}
                                 alt="Logo"
                                 className="login-img"
                            />
                        </div>
                        <div className = "heading">
                            Login
                        </div>
                        <Form.Group size="lg" controlId="username">
                            <Form.Label className = "label">Username</Form.Label>
                            <Form.Control className = "input"
                                          autoFocus
                                          type="text"
                                          value={this.state.username}
                                          onChange={this.handleUserChange}                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label className = "label">Password</Form.Label>
                            <Form.Control className = "input"
                                          type="password"
                                          value={this.state.password}
                                          onChange={this.handlePassChange}
                            />
                        </Form.Group>

                        <Row>
                            {/*<Link>*/}
                            <Button className="loginButton"
                                    size="lg"
                                    // type="submit"
                                    onClick = {this.handleSubmit}
                                // disabled={this.validateForm()}
                            >
                                Login
                            </Button>
                            {/*</Link>*/}

                        </Row>

                        <Row>
                            <Link to='/register'>
                                <Button className="loginButton"
                                        size="lg"
                                        // type="submit"
                                    // disabled={this.validateForm()}
                                >
                                    Create Account
                                </Button>
                            </Link>
                        </Row>
                        <Row>
                            <a href='#'>Lost your password ?</a>
                        </Row>
                    </Form>
                </div>

                <Modal  show = {this.state.showModal}
                        onClick =  {this.handleCancelModal}
                >

                    <Modal.Body>
                        Incorrect username or password.
                    </Modal.Body>
                    <Modal.Footer>
                        {/*<Button href = "./listQuiz" className = "ensureExit">Yes</Button>*/}
                        <Button onClick = {this.handleCancelModal} className = "cancelExit">Yes</Button>
                    </Modal.Footer>


                </Modal>

                <Modal  show = {this.state.successModal}
                        // onClick =  {this.handleSuccessCancelModal}
                >

                    <Modal.Body>
                        Successfully logged in. You will be directed to quiz Page.
                    </Modal.Body>
                    <Modal.Footer>
                        {/*<Button href = "./listQuiz" className = "ensureExit">Yes</Button>*/}
                        <Button onClick = {this.handleSuccessCancelModal} className = "cancelSuccessExit">OK</Button>
                    </Modal.Footer>


                </Modal>

            </div>
        );
    }
}


export default withRouter(Login)