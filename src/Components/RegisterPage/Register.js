import React from "react";
import {Button,Form,Row,Modal} from "react-bootstrap";
import "./Register.css";

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            repassword:'',
            email:'',
            isSupervisor:false,
            showModal:false
        };

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleRePassChange = this.handleRePassChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleIsSupervisorChange = this.handleIsSupervisorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancelModal = this.handleCancelModal.bind(this);

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
            "username": this.state.username,
            "password": this.state.password,
            "email":this.state.email,
            "isSupervisor":this.state.isSupervisor
            //
        });
        event.preventDefault();
        fetch('http://localhost:8080/user/register',{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body:dataSent
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
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
            console.log(this.token)
        }).catch(function(error){
            console.log(error)
        })
    }

    handleCancelModal(){
        this.setState({
            showModal:false,
        })
    }




    render(){
        return (
            <div className="Register">
                <div className="box justify-content-center align-items-center">
                    <Form className="registerForm" onSubmit={this.handleSubmit}>
                        <div className = "heading">
                            Register Account
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
                                          value={this.state.email}
                                          onChange={this.handleEmailChange}
                                          placeholder="xxx@xxx.com"
                            />
                        </Form.Group>
                        <Form.Group size="lg" className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox"
                                        label="As supervisor"
                                        value={this.state.handleIsSupervisorChange}
                                        cheked={this.state.isSupervisor}
                                        onChange={this.handleIsSupervisorChange}

                            />
                        </Form.Group>
                        <Row>
                            <Button className="button"
                                    size="lg"
                                    type="submit"
                                    // disabled={this.validateForm()}
                            >
                                Create account
                            </Button>
                        </Row>
                    </Form>
                </div>


                <Modal  show = {this.state.showModal}
                        onClick =  {this.handleCancelModal}
                >

                    <Modal.Body>
                        The email has already been registered. Please use another one.
                    </Modal.Body>
                    <Modal.Footer>
                        {/*<Button href = "./listQuiz" className = "ensureExit">Yes</Button>*/}
                        <Button onClick = {this.cancelModal} className = "cancelExit">Yes</Button>
                    </Modal.Footer>


                </Modal>


            </div>
        );
    }
}


export default Register