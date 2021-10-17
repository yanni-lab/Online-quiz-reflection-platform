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
    };




    render(){
        return (
            <div className="Share">
                    <Form className="shareForm" onSubmit={this.handleSubmit}>
                        <Form.Group size="lg" controlId="username">
                            <Form.Label className = "label">Email</Form.Label>
                            <Form.Control className = "input"
                                          autoFocus
                                          type="text"
                                          value={this.state.username}
                                          onChange={this.handleUserChange}                            />
                        </Form.Group>

                        <div className="share-row">
                            <Button className="share-button"
                                    size="lg"
                                    type="submit"
                            >
                                Share
                            </Button>
                        </div>


                    </Form>

            </div>
        );
    }
}


export default withRouter(Share)