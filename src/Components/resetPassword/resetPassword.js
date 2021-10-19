import React from "react";
import {Button,Form,Row,Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./resetPassword.css";
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import LoginLogo from '../images/loginLogo.png';
import cookie from 'react-cookies';

class ResetPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            email: '',
            password: '',
            confirmPassword:'',
            passChangeSuccess: false,
            show: false

        };

        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleConfirmPassChange = this.handleConfirmPassChange.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.handleclose = this.handleclose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    changePassword(){
        this.setState({
            passChangeSuccess: true,
        })
    }

    handleclose() {
        this.setState({
            show: false,
        })
    }

    handleOpen(){
        this.setState({
            show: true,
        })
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
            console.log(data["token"]);
            //data from backend
        }).catch(function(error){
            console.log(error)
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
                                          value={this.state.username}
                                          onChange={this.handleUserChange}                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label className = "label">Email</Form.Label>
                            <Form.Control className = "input"
                                          autoFocus
                                          type="email"
                                          value={this.state.email}
                                          onChange={this.handleEmailChange}                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label className = "label">Password</Form.Label>
                            <Form.Control className = "input"
                                          type="password"
                                          value={this.state.password}
                                          onChange={this.handlePassChange}
                            />
                        </Form.Group>

                        <Form.Group size="lg" controlId="comfirmPassword">
                            <Form.Label className = "label">Confirm Password</Form.Label>
                            <Form.Control className = "input"
                                          type="password"
                                          value={this.state.confirmPassword}
                                          onChange={this.handleConfirmPassChange}
                            />
                        </Form.Group>

                        <Row>

                            <Button className="resetButton"
                                    size="lg"
                                    onClick = {this.handleSubmit && this.handleOpen}
                            >
                                Update Password
                            </Button>
                        </Row>
                    </Form>

                    <Modal show={this.state.show} >
                        <Modal.Header >
                            <Modal.Title>Reset Password</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Woohoo, you're updating password!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleclose}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default withRouter(ResetPassword)