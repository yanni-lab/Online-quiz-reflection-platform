import React, { useState } from "react";
import {Button,Form,Row,Col,InputGroup} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login.css"

export default function Register () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="Register">
            <div className="box justify-content-center align-items-center">
                <Form className="registerForm" onSubmit={handleSubmit}>
                    <div className = "heading">
                        Login
                    </div>
                    <Form.Group size="lg" controlId="username">
                        <Form.Label className = "label">Username</Form.Label>
                        <Form.Control className = "input"
                                      autoFocus
                                      type="text"
                                      value={username}
                                      onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label className = "label">Password</Form.Label>
                        <Form.Control className = "input"
                                      type="password"
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Row className="d-grid gap-2">
                        <Col >
                            <Button className="loginButton"
                                    size="lg"
                                    variant="outline-primary"
                                    type="submit"
                                     disabled={!validateForm()}
                            >
                                Login
                            </Button>
                        </Col>
                    </Row>

                </Form>
            </div>
        </div>
    );
}

