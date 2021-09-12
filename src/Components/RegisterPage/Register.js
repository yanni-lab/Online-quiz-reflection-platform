import React, { useState,Component } from "react";
import {Button,Form,Row} from "react-bootstrap";
import "./Register.css";

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            repassword:''
        };

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleRePassChange = this.handleRePassChange.bind(this);
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

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
        fetch('http://localhost:8080/user/login',{
            method:'post',
            headers:{},
            body:'username=${this.state.username}&password=${this.state.passward}'
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            console.log(data)
        }).catch(function(error){
            console.log(error)
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
                        <Form.Group size="lg" controlId="repassword">
                            <Form.Label className = "label">Repeat Password</Form.Label>
                            <Form.Control className = "input"
                                          type="password"
                                          value={this.state.repassword}
                                          onChange={this.handleRePassChange}                            />
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
            </div>
        );
    }
}


export default Register