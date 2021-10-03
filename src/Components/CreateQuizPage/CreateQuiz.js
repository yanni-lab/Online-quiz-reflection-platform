import React from 'react';
import { withRouter } from 'react-router-dom';
import './CreateQuiz.css';
import {Row, Col, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";

class CreateQuiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // newQuiz:props.location.state.newQuiz,
            quizList:[
                {quiz_id:1, quiz_title:"Collaborative Learning"},
                {quiz_id:2, quiz_title:"Leadership"},
                {quiz_id:3, quiz_title:"Resilience"}
            ],
            createList:[
                {quiz_id:1, quiz_title:"newQuiz"},
            ],
        };


        fetch('http://localhost:8080/quiz/available_quiz',{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({"username": "111"})//this is just to send sth, meaningless
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            //this.state.quizList = JSON.parse(data["quizList"]);
            this.setState({quizList:JSON.parse(data["quizList"])});
            console.log("back");
            console.log(this.state.quizList);
            //data from backend
        }).catch(function(error){
            console.log(error)
        })

        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handelPrivatetoPublic = this.handelPrivatetoPublic.bind(this);
        this.handelPublictoPrivate = this.handelPublictoPrivate.bind(this);


    };


    handleCreateClick(){
        this.setState({})
        this.state.createList.push({
            quiz_id:0,
            quiz_title:""
        })
    }

    handelPrivatetoPublic(event){
        this.setState(state => {
            state.quizList.push(state.createList[event.target.value]);
            state.createList.splice(event.target.value,1)
            return state;
        });

    }

    handelPublictoPrivate(event){
        this.setState(state => {
            state.createList.push(state.quizList[event.target.value]);
            state.quizList.splice(event.target.value,1)
            return state;
        });
    }


    render(){



        return(
            <div className="createQuizPage">
                <Row>
                    <Col>
                        <Link to='/'>
                            <Button className="backButton"
                                    size="lg"
                                    variant="outline-primary"
                            >Back</Button>
                        </Link>
                    </Col>
                    <Col>
                        <Link to='/editQuiz'>
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
                    <div>

                        {
                            this.state.quizList.map((quiz,index) =>
                                // <Link
                                //     to={{
                                //         pathname:"/communication",
                                //         state:{
                                //             quizId: parseInt(quiz.quiz_id)
                                //         }
                                //     }}>
                                    <Button className="QuizZone">
                                        {quiz.quiz_title}
                                        <div className="button-onfocus">
                                            <Button className = "transform-button"
                                                    value = {index}
                                                    onClick = {this.handelPublictoPrivate}>
                                                Make private
                                            </Button>
                                            <Button className = "edit-button" >
                                                Edit
                                            </Button>
                                            <Button className = "delete-quiz-button">
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
                    <div className="no_private" style={{display: this.state.createList.length==0? "block":"none"}}>
                        There are no private quizzes here yet!
                    </div>
                    <div>
                        <div className="quizName">
                            {
                                this.state.createList.map((quiz,index) =>

                                        <Button className="QuizZone">
                                            {quiz.quiz_title}
                                            <div className="button-onfocus">
                                                <Button className = "transform-button"
                                                        value = {index}
                                                        onClick = {this.handelPrivatetoPublic}>
                                                    Make public
                                                </Button>
                                                <Button className = "edit-button" >
                                                    Edit
                                                </Button>
                                                <Button className = "delete-quiz-button">
                                                    X
                                                </Button>
                                            </div>

                                        </Button>



                                )
                            }
                        </div>
                    </div>
                </Row>

            </div>
        );



    }
}



export default withRouter(CreateQuiz);