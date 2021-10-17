import React,{ Component } from 'react';
import './FeedBack.css';
import {Row, Col, Button,Form,Modal,InputGroup} from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import Login from '../LoginPage/Login';




class FeedBack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbackContent: props.location.state.feedback,
            leave:false,
            save:false,
            share:false
        };

        this.leaveQuiz = this.leaveQuiz.bind(this);
        this.cancelLeaveQuiz = this.cancelLeaveQuiz.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelSave = this.cancelSave.bind(this);
        this.handleShare = this.handleShare.bind(this);
        this.cancelShare = this.cancelShare.bind(this);

    };

    handleSubmit(){
        this.setState(
            {
                save:true
            }
        )
    }

    cancelSave(){
        this.setState(
            {
                save:false
            }
        )
    }

    cancelLeaveQuiz(){
        this.setState({
            leave: false
        })

    }

    leaveQuiz(){
        this.setState({
            leave: true,

        })

    }

    cancelShare(){
        this.setState(
            {
                share:false
            }
        )
    }

    handleShare(){
        this.setState(
            {
                share:true
            }
        )
    }

    render() {

        console.log(this.state.feedbackContent)

        return (
            <div className="feedbackPage">
                <Row>
                    <Col>

                        <Button className="backButton"
                                size="lg"
                                variant="outline-primary"
                                onClick = {this.leaveQuiz}

                        >Exit Quiz</Button>

                    </Col>
                </Row>



                    <div className="text-container">
                        <span className="title">Feedback</span>
                    </div>

                    <div className="text-container">
                        <span className="feedbackContent">{this.state.feedbackContent}</span>
                    </div>
                    <div className="text-container">
                        <span className="title">Reflection Diary</span>
                    </div>

                    <div className="text-container">
                        <span className="content">Write down your thoughts and feelings. What are your strengths? What can you do to improve?</span>
                    </div>

                    <div className="text-container">
                        <Form >
                            <Form.Group size="lg" controlId="username">
                                <Form.Control className = "reflectionInput"
                                              autoFocus
                                              type="text"
                                             // value={this.state.username}
                                             // onChange={this.handleUserChange}
                                />



                            </Form.Group>

                            <Row>
                                <Col className = "feedbackFormCol">
                                    <Button className="feedbackFormButton"
                                            size="lg"
                                            //type="submit"
                                            onClick={this.handleSubmit}
                                        // disabled={this.validateForm()}
                                    >
                                        Save
                                    </Button>
                                </Col>
                                <Col className = "feedbackFormCol">
                                    <Button className="feedbackFormButton"
                                            size="lg"

                                            onClick={this.handleShare}

                                    >
                                        Share
                                    </Button>
                                </Col>

                            </Row>



                        </Form>
                    </div>






                <Modal  show = {this.state.leave}
                        onClick =  {this.cancelLeaveQuiz}
                >

                    <Modal.Body>
                        Are you sure you want to exit the quiz? (Have you saved / shared ?)
                    </Modal.Body>
                    <Modal.Footer>
                        <Button href = "./listQuiz" className = "ensureExit">Yes</Button>
                        <Button onClick = {this.cancelLeaveQuiz} className = "cancelExit">No</Button>
                    </Modal.Footer>


                </Modal>


                <Modal  show = {this.state.save}

                        className = "saveModal"
                >

                    <Modal.Body>
                        It looks like you haven't signed in, please sign in to save your feedback
                        <Login />
                    </Modal.Body>
                    <Modal.Footer>

                        <Button onClick = {this.cancelSave} className = "cancelExit">No</Button>
                    </Modal.Footer>


                </Modal>

                <Modal  show = {this.state.share}
                        className = "shareModal"
                >
                    <Modal.Header>
                        Please enter the recipient's email you would like to share your feedback to!
                        <Button onClick = {this.cancelShare}>X</Button>
                    </Modal.Header>


                    <Modal.Body>
                        <div className="Share">
                            <Form className="shareForm" onSubmit={this.handleSubmit}>
                                <Form.Group size="lg" controlId="share-email">
                                    <Form.Label className = "label">Email</Form.Label>
                                    <Form.Control className = "input"
                                                  autoFocus
                                                  type="text"
                                                  value={this.state.username}
                                                  onChange={this.handleUserChange}
                                    />
                                </Form.Group>

                                <Form.Group size="lg" controlId="username">
                                    <Form.Check
                                        required
                                        name="terms"
                                        label="Share with the supervisor"
                                        feedbackType="invalid"
                                        feedbackTooltip
                                    />
                                </Form.Group>

                                <Form.Group size="lg" controlId="username">
                                    <Form.Check
                                        required
                                        name="terms"
                                        label="Include my reflection diary in sharing"
                                        feedbackType="invalid"
                                        feedbackTooltip
                                    />
                                </Form.Group>




                            </Form>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row className="share-row">
                            <Col>
                                <Button className="share-button"
                                        size="lg"
                                        type="submit"
                                >
                                    Share
                                </Button>
                            </Col>
                            <Col>
                                <Button onClick = {this.cancelShare}
                                        className = "share-button"
                                        size="lg"
                                >
                                    Cancel
                                </Button>
                            </Col>

                        </Row>

                    </Modal.Footer>


                </Modal>
            </div>

        );
    }
}




export default  withRouter(FeedBack);