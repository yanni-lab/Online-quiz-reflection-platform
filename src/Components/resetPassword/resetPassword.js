import React from "react";
import {Button,Form,Row,Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./resetPassword.css";
import { withRouter } from "react-router-dom";
import LoginLogo from '../images/loginLogo.png';



class ResetPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            email: '',
            password: '',
            confirmPassword:'',
            passChangeSuccess: false,
            passChangeFail:false
        };

        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleConfirmPassChange = this.handleConfirmPassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };


    handleUserChange(evt) {
        this.setState({
            username: evt.target.value,
        });
    };
    handleEmailChange(evt) {
        this.setState({
            email: evt.target.value,
        });
    };

    handlePassChange(evt) {
        this.setState({
            password: evt.target.value,
        });
    }

    handleConfirmPassChange(evt) {
        this.setState({
            confirmPassword: evt.target.value,
        });
    }

    handleSubmit(event) {

        console.log(this.state);
        var dataSent = JSON.stringify({
            "email": this.state.email,
            "username":this.state.username,
            "password": this.state.password
        });
        this.token = "";
        event.preventDefault();
        fetch('http://localhost:8080/user/reset_password',{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body:dataSent
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            if(data["errorCode"]=="00000"){
                this.setState({
                    passChangeSuccess:true
                })
            }
            else{
                this.setState({
                    passChangeFail:true
                })
            }


            //data from backend
        }).catch(function(error){
            console.log(error)
        })

    }

    handleSuccessCancelModal(){
        this.props.history.push({
            pathname: "/login",
        })
        this.setState({
            passChangeSuccess:false
        })
    }

    handleCancelModal(){
        this.setState({
            passChangeFail:false
        })
    }

    render(){
        document.title = "ResetPassword"
        return (
            <div className="ResetPassword">
                <div className="box justify-content-center align-items-center">
                    <Form className="resetPasswordForm"
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
                            Reset Password
                        </div>
                        <Form.Group size="lg" controlId="username">
                            <Form.Label className = "label">Username</Form.Label>
                            <Form.Control className = "input"
                                          autoFocus
                                          type="text"
                                          placeHolder="Username"
                                          value={this.state.username}
                                          onChange={this.handleUserChange}                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label className = "label">Email</Form.Label>
                            <Form.Control className = "input"
                                          autoFocus
                                          type="email"
                                          placeHolder="xxx@xxx.com"
                                          value={this.state.email}
                                          onChange={this.handleEmailChange}                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label className = "label">Password</Form.Label>
                            <Form.Control className = "input"
                                          type="password"
                                          placeHolder="****"
                                          value={this.state.password}
                                          onChange={this.handlePassChange}
                            />
                        </Form.Group>

                        <Form.Group size="lg" controlId="comfirmPassword">
                            <Form.Label className = "label">Confirm Password</Form.Label>
                            <Form.Control className = "input"
                                          type="password"
                                          placeHolder="****"
                                          value={this.state.confirmPassword}
                                          onChange={this.handleConfirmPassChange}
                            />
                        </Form.Group>

                        <Row>

                            <Button className="resetButton"
                                    size="lg"
                                    onClick = {this.handleSubmit}
                            >
                                Update Password
                            </Button>
                        </Row>

                    </Form>

                </div>

                <Modal  show = {this.state.passChangeSuccess}>

                    <Modal.Body>
                        Reset password successfully! You will be redirected to the login page.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick = {this.handleSuccessCancelModal.bind(this)} className = "cancelSuccessExit">OK</Button>
                    </Modal.Footer>


                </Modal>

                <Modal  show = {this.state.passChangeFail}>

                    <Modal.Body>
                        Reset password fail. Please check the email and username again.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick = {this.handleCancelModal.bind(this)} className = "cancelSuccessExit">OK</Button>
                    </Modal.Footer>


                </Modal>
            </div>
        );
    }
}

export default withRouter(ResetPassword)