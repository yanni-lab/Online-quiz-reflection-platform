import React from 'react';
import './FeedBack.css';
import {Row, Col, Button,Form,Modal,InputGroup} from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import Login from '../LoginPage/Login';
import cookie from 'react-cookies'




class FeedBack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbackContent: props.location.state.feedback,
            quizId:props.location.state.quizId,
            choices:props.location.state.choices,
            score:props.location.state.score,
            leave:false,
            save:0,
            share:false,
            saveFlag:false,
            reflection:"",
            shareEmail:"",
        };

        this.leaveQuiz = this.leaveQuiz.bind(this);
        this.cancelLeaveQuiz = this.cancelLeaveQuiz.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelSave = this.cancelSave.bind(this);
        this.handleShare = this.handleShare.bind(this);
        this.cancelShare = this.cancelShare.bind(this);
        this.submitShare = this.submitShare.bind(this);
        this.handleReflectionChange=this.handleReflectionChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.cancelSuccessfulSave=this.cancelSuccessfulSave.bind(this)

    };

    handleSubmit(){
        if(cookie.load("login")=="false"){
            this.setState({
                save:1
            })
        }

        if(cookie.load("login")=="true"){
            this.setState({
                save:2
            })
        }

    }

    cancelSave(){
        this.setState(
            {
                save:0
            }
        )
    }

    cancelSuccessfulSave(){
        fetch('http://localhost:8080//result/save_result',{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                "userId":cookie.load("userId"),
                "quizId":this.state.quizId,
                "choices":this.state.choices,
                "score":this.state.score,
                "reflection":this.state.reflection,
                "reflectionAvailable":false,
                "supervisorId":1,
                "isSaved":this.state.saveFlag,
            })

        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            console.log(data["token"]);

        }).catch(function(error){
            console.log(error)
        })

        this.setState(
            {
                saveFlag:true,
                share:false
            }
        )



        this.setState(
            {
                save:0,
                saveFlag:true
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

    handleReflectionChange(event){
        this.setState({
            reflection:event.target.value
        })
    }

    handleEmailChange(event){
        this.setState({
            shareEmail:event.target.value
        })
    }

    submitShare(){

        fetch('http://localhost:8080/result/share_result',{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                "userId":cookie.load("userId"),
                "quizId":this.state.quizId,
                "choices":this.state.choices,
                "score":this.state.score,
                "reflection":this.state.reflection,
                "supervisor_id":1,
                "reflectionAvailable":true,
                "email":this.state.shareEmail,
                "isSaved":this.state.saveFlag,

            })

        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            console.log(data["token"]);

        }).catch(function(error){
            console.log(error)
        })

        this.setState(
            {
                saveFlag:true,
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

        document.title = "Feedback"
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
                                              as="textarea"
                                              value={this.state.reflection}
                                              onChange={this.handleReflectionChange}
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


                {/*click save without login*/}
                <Modal  show = {this.state.save==1}
                        className = "saveModal"
                >
                    <Modal.Body>
                        It looks like you haven't signed in, please sign in to save your feedback
                        <Login txt={"quiz"} cancel={this.cancelSuccessfulSave}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick = {this.cancelSave} className = "cancelExit">No</Button>
                    </Modal.Footer>
                </Modal>

                {/*click save with login*/}
                <Modal  show = {this.state.save==2}
                        className = "saveModal"
                >
                    <Modal.Body>
                        Successfully saved!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick = {this.cancelSave} className = "cancelExit">Ok</Button>
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
                                                  placeholder="xxxx@xxx.com"
                                                  autoFocus
                                                  type="text"
                                                  value={this.state.shareEmail}
                                                  onChange={this.handleEmailChange}
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
                                        onClick = {this.submitShare}
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