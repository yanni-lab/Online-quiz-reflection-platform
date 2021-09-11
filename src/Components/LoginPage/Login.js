import React from 'react';
import {Button,Form,Row,Col} from 'react-bootstrap';
import useForm from './useForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login.css"

const Login = () => {
    const {handleChange, handleSubmit,values,errors} = useForm();
    return(
        <div class = "container">
            <div className='box justify-content-center align-items-center'>
                <Form className="loginForm" onSubmit={handleSubmit}>
                    <div className = "heading">
                        User Login
                    </div>

                    <Form.Group className ='inputContent'>
                        <Form.Label className = "label">Username</Form.Label>
                        <Form.Control className = "input"
                                      type = "text"
                                      placeholder="User Name"
                                      value= {values.username}
                                      onChange ={handleChange}
                        />
                    </Form.Group>


                    <Form.Group className ='inputContent'>
                        <Form.Label className = "label">Password</Form.Label>
                        <Form.Control className = "input"
                                      type = "password"

                                      placeholder="****"
                                      value= {values.password}
                                      onChange ={handleChange}
                        />
                    </Form.Group>
                    <Row className="button">
                        <Button size="lg" type="save">
                            Submit
                        </Button>
                    </Row>

                </Form>
            </div>
        </div>
    );
};

export default Login
