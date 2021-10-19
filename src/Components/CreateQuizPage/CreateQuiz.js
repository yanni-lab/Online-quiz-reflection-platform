import React from 'react';
import { withRouter } from 'react-router-dom';
import './CreateQuiz.css';
import {Row, Col, Button, Modal} from 'react-bootstrap';
import {Link} from "react-router-dom";
import cookie from 'react-cookies'

class CreateQuiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username:cookie.load("username"),
            userId:cookie.load("userId"),
            publicList:[
                {quiz_id:1, quiz_title:"Collaborative Learning"},
                {quiz_id:2, quiz_title:"Leadership"},
                {quiz_id:3, quiz_title:"Resilience"}
            ],
            privateList:[
                {quiz_id:1, quiz_title:"newQuiz"},
            ],
            ensureDeleteShow:false
        };


        fetch('http://localhost:8080/quiz/supervisor_quiz',{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({"userId": this.state.userId})//send supervisor's userId to check corresponding quiz list
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            this.setState({
                    publicList:data["publicQuizList"],
                    privateList:data["privateQuizList"]
                });

            //data from backend
        }).catch(function(error){
            console.log(error)
        })



        this.handleCreateClick = this.handleCreateClick.bind(this);


    };


    handleCreateClick(){
        this.setState({})
        this.state.privateList.push({
            quiz_id:0,
            quiz_title:""
        })
    }

    handelPrivatetoPublic = (quiz_id,event) => {
        this.setState(state => {
            state.publicList.push(state.privateList[event.target.value]);
            state.privateList.splice(event.target.value,1)
            return state;
        });


        fetch('http://localhost:8080/quiz/set_public',{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({"quizId": quiz_id})
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            console.log(data)
            //data from backend
        }).catch(function(error){
            console.log(error)
        })
    }

    handelPublictoPrivate = (quiz_id,event) => {
        this.setState(state => {
            state.privateList.push(state.publicList[event.target.value]);
            state.publicList.splice(event.target.value,1)
            return state;
        });

        fetch('http://localhost:8080/quiz/set_private',{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({"quizId": quiz_id})
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            console.log(data)
            //data from backend
        }).catch(function(error){
            console.log(error)
        })
    }

    showEnsureDelete = (index,quiz_id,private_or_public,event) => {
        this.setState({
            ensureDeleteShow:true,
            delete_index:index,
            delete_id:quiz_id,
            pp:private_or_public
        })
    }

    cancelDelete(){
        this.setState({
            ensureDeleteShow:false
        })
    }

    ensureDelete(){
        if(this.state.pp=="public"){
            this.setState(state => {
                state.publicList.splice(this.state.delete_index,1);
                return state;
            });

        }
        if(this.state.pp=="private"){
            this.setState(state => {
                state.privateList.splice(this.state.delete_index,1);
                return state;
            });

        }

        this.setState({
            ensureDeleteShow:false
        })

        fetch('http://localhost:8080/quiz/delete_quiz',{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({"quizId": this.state.delete_id})
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            console.log(data)
            //data from backend
        }).catch(function(error){
            console.log(error)
        })
    }

    render(){
        document.title = "My Quizzes"

        return(
            <div className="createQuizPage">
                <Row>
                    <Col>
                        <Link to={{
                            pathname:'./supervisor',
                            state:{
                                username: this.state.username
                            }
                        }}>
                            <Button className="backButton"
                                    size="lg"
                                    variant="outline-primary"
                            >Back</Button>
                        </Link>
                    </Col>
                    <Col>
                        <div className="header">
                            My Quizzes
                        </div>
                    </Col>
                    <Col>
                        <Link to={{pathname:"/editQuiz",
                            state:{action:"Create"}
                        }}>
                            <Button className="createQuizButton"
                                    size="lg"
                                    variant="outline-primary"
                            >Create<br/> new quiz</Button>
                        </Link>


                    </Col>
                </Row>

                {/*Public Quiz List*/}
                <Row>
                    <div className="myQuiz">Public</div>
                </Row>
                <Row className="quizName">
                    <div className="no_private" style={{display: this.state.publicList.length==0? "block":"none"}}>
                        There are no public quizzes here yet!
                    </div>
                    <div>
                        {
                            this.state.publicList.map((quiz,index) =>
                                    <Button className="QuizZone">
                                        {quiz.quiz_title}
                                        <div className="button-onfocus">
                                            <Button className = "transform-button"
                                                    value = {index}
                                                    onClick = {this.handelPublictoPrivate.bind(this, quiz.quiz_id)}>
                                                Make private
                                            </Button>
                                            <Link to={{pathname:"/editQuiz",
                                                state:
                                                    {
                                                        quiz_id:quiz.quiz_id,
                                                        action:"Edit"
                                                    }
                                            }}>
                                                <Button className = "edit-button" >
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button className = "delete-quiz-button"
                                                    onClick={this.showEnsureDelete.bind(this,index,quiz.quiz_id,"public")}
                                            >
                                                X
                                            </Button>
                                        </div>
                                    </Button>
                                // </Link>
                            )
                        }

                    </div>
                </Row>

                {/*Private Quiz List*/}
                <Row>
                    <div className="myQuiz">Private</div>
                </Row>

                <Row>
                    <div className="no_private" style={{display: this.state.privateList.length==0? "block":"none"}}>
                        There are no private quizzes here yet!
                    </div>
                    <div>
                        <div className="quizName">
                            {
                                this.state.privateList.map((quiz,index) =>

                                        <Button className="QuizZone">
                                            {quiz.quiz_title}
                                            <div className="button-onfocus">
                                                <Button className = "transform-button"
                                                        value = {index}
                                                        onClick = {this.handelPrivatetoPublic.bind(this, quiz.quiz_id)}>
                                                    Make public
                                                </Button>
                                                <Link to={{pathname:"/editQuiz",
                                                    state:
                                                        {
                                                            quiz_id:quiz.quiz_id,
                                                            action:"edit"
                                                        }
                                                }}>
                                                    <Button className = "edit-button" >
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button className = "delete-quiz-button"
                                                        onClick={this.showEnsureDelete.bind(this,index,quiz.quiz_id,"private")}
                                                >
                                                    X
                                                </Button>

                                            </div>

                                        </Button>



                                )
                            }
                        </div>
                    </div>
                </Row>

                <Modal  show = {this.state.ensureDeleteShow}>
                    <Modal.Body className="modal-body">
                        Are you sure you want to delete this quiz?
                    </Modal.Body>
                    <Modal.Footer>
                        <Row>
                            <Col>
                                <Button onClick = {this.cancelDelete.bind(this)} className = "cancelDel">
                                    Cancel
                                </Button>
                            </Col>
                            <Col>
                                <Button onClick = {this.ensureDelete.bind(this)} className = "ensureDel">
                                    Yes
                                </Button>
                            </Col>
                        </Row>

                    </Modal.Footer>
                </Modal>

            </div>
        );



    }
}



export default withRouter(CreateQuiz);