import React from "react";
import {Button,Form,Row,Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./resetPassword.css";
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import LoginLogo from '../images/loginLogo.png';
import cookie from 'react-cookies'


class ResetPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword:'',
            showModal: false,
            successModal:false,
            txt:this.props.txt
        };

        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleConfirmPassChange = this.handleConfirmPassChange.bind(this);
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
        // if(this.state.username=="lec"){
        //     cookie.save('identity',1)
        // }
        // if(this.state.username=="haobow1"){
        //     cookie.save('identity',2)
        // }
        //
        // cookie.save('username',this.state.username)
        // cookie.save('login',true)
        //
        // this.setState({
        //     successModal:true
        // })

        console.log(this.state);
        var dataSent = JSON.stringify({"email": this.state.username,"password": this.state.password});
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
            if (data["token"] !== ""){
                this.token = data["token"].split(":")[1];
            }
            else{
                this.token = "";
            }

            if(this.token===""){
                this.setState({
                        showModal:true
                    }
                )
            }
            else{
                this.setState({
                    successModal:true
                })

                cookie.save('email',data['email'])
                cookie.save('username',data["username"])
                cookie.save('userId',data["userId"])
                cookie.save('login',true)
            }
            //data from backend
        }).catch(function(error){
            console.log(error)
        })

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

        if(this.state.txt=="quiz"){
            this.props.cancel()
        }

        else{
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
                        <Form.Group size="lg" controlId="email">
                            <Form.Label className = "label">Email</Form.Label>
                            <Form.Control className = "input"
                                          autoFocus
                                          type="email"
                                          value={this.state.email}
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

                        <Form.Group size="lg" controlId="comfirmPassword">
                            <Form.Label className = "label">Confirm Password</Form.Label>
                            <Form.Control className = "input"
                                          type="password"
                                          value={this.state.comfirmPassword}
                                          onChange={this.handleConfirmPassChange}
                            />
                        </Form.Group>

                        <Row>
                            {/*<Link>*/}
                            <Button className="resetButton"
                                    size="lg"
                                // type="submit"
                                    onClick = {this.handleSubmit}
                                // disabled={this.validateForm()}
                            >
                                Update Password
                            </Button>
                            {/*</Link>*/}

                        </Row>

                    </Form>
                </div>

                <Modal  show = {this.state.showModal}
                        onClick =  {this.handleCancelModal}
                >

                    <Modal.Body>
                        Incorrect user Email or password.
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
                        {this.state.txt=="quiz"?"Successfully logged in and saved. You will be redirected to quiz Page.":"Successfully logged in. You will be redirected to quiz Page."}

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


export default withRouter(ResetPassword)