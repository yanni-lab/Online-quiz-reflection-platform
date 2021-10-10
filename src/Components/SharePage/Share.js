import React from "react";
import {Button,Form,Row,Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Share.css";
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import LoginLogo from '../images/loginLogo.png';


class Share extends React.Component {
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

    handleSubmit(event) {
        console.log(this.state);


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
        this.props.history.push("./ListQuiz")
    }


    render(){
        return (
            <div className="Share">
                <div className="box justify-content-center align-items-center">
                    <Form className="shareForm" onSubmit={this.handleSubmit}>
                        <Form.Group size="lg" controlId="username">
                            <Form.Label className = "label">Email</Form.Label>
                            <Form.Control className = "input"
                                          autoFocus
                                          type="text"
                                          value={this.state.username}
                                          onChange={this.handleUserChange}                            />
                        </Form.Group>

                        <Row>
                            <Button className="button"
                                    size="lg"
                                    type="submit"
                                // disabled={this.validateForm()}
                            >
                                Share
                            </Button>
                        </Row>


                    </Form>
                </div>
            </div>
        );
    }
}


export default withRouter(Share)