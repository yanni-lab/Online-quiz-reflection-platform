import React from "react";
import {Button,Form,Row,Modal} from "react-bootstrap";
import "./UpdateAccount.css";
import { withRouter } from "react-router-dom";
import LoginLogo from '../images/loginLogo.png';
import cookie from 'react-cookies'

class UpdateAccount extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            repassword:'',
            email:cookie.load('email'),
            isSupervisor:cookie.load('identity')=='2'?true:false,
            successModal:false
        };

        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleRePassChange = this.handleRePassChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleIsSupervisorChange = this.handleIsSupervisorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSuccessCancelModal = this.handleSuccessCancelModal.bind(this);

    };


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

    handleRePassChange(evt) {
        this.setState({
            repassword: evt.target.value,
        });
    }
    handleEmailChange(evt) {
        this.setState({
            email: evt.target.value,
        });
    }
    handleIsSupervisorChange(evt) {
        this.setState({
            isSupervisor: evt.target.checked,
        });
    }

    handleSubmit(event) {
        console.log(this.state);
        var dataSent = JSON.stringify({
            "userId":cookie.load("userId"),
            "username": this.state.username,
            "password": this.state.password,
            "email":cookie.load("email"),
            "isSupervisor":this.state.isSupervisor

        });
        event.preventDefault();
        fetch('http://localhost:8080/user/update_user',{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body:dataSent
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            console.log(data['errorMessage'])
        }).catch(function(error){
            console.log(error)
        })
        this.setState({successModal:true})
    }


    handleSuccessCancelModal(){
        this.setState({
            successModal:false,
        })
        if(cookie.load("identity")==1){
            this.props.history.push({
                pathname: "/listQuiz",
                state:{
                    username:this.state.username
                }
            })
        }

        if(cookie.load("identity")==2){
            this.props.history.push({
                pathname: "/supervisor",
                state:{
                    username:this.state.username
                }
            })
        }
    }



    render(){
        document.title = "Update Account Details"
        return (
            <div className="UpdateAccount">
                <div className="box justify-content-center align-items-center">

                    <Form className="registerForm">
                        <div>
                            <img href="/"
                                 src={LoginLogo}
                                 alt="Logo"
                                 className="login-img"
                            />
                        </div>
                        <div className = "heading">
                            Update Account Details
                        </div>
                        <Form.Group size="lg" controlId="username">
                            <Form.Label className = "label">Username</Form.Label>
                            <Form.Control className = "input"
                                          autoFocus
                                          type="text"
                                          value={this.state.username}
                                          onChange={this.handleUserChange}
                                          placeholder="Username"
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label className = "label">Password</Form.Label>
                            <Form.Control className = "input"
                                          type="password"
                                          value={this.state.password}
                                          onChange={this.handlePassChange}
                                          placeholder="******"
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="repassword">
                            <Form.Label className = "label">Repeat Password</Form.Label>
                            <Form.Control className = "input"
                                          type="password"
                                          value={this.state.repassword}
                                          onChange={this.handleRePassChange}
                                          placeholder="******"
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label className = "label">Email</Form.Label>
                            <Form.Control className = "input"
                                          type="email"
                                          readOnly={true}
                                          value={this.state.email}
                                          onChange={this.handleEmailChange}

                            />
                        </Form.Group>
                        <Row>
                            <Form.Group size="lg" className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox"
                                            label="As supervisor"
                                            value={this.state.handleIsSupervisorChange}
                                            checked={this.state.isSupervisor}
                                            onChange={this.handleIsSupervisorChange}

                                />
                            </Form.Group>
                        </Row>
                        <Row className="update-button-row">
                            <Button className="button"
                                    size="lg"
                                    onClick={this.handleSubmit}
                            >
                                Update account
                            </Button>
                        </Row>

                    </Form>

                </div>



                <Modal  show = {this.state.successModal}>
                    <Modal.Body>
                        Successfully updated. You will be directed to quiz Page.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick = {this.handleSuccessCancelModal} className = "cancelSuccessExit">OK</Button>
                    </Modal.Footer>
                </Modal>


            </div>
        );
    }
}



export default withRouter(UpdateAccount)