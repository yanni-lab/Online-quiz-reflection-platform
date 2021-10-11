import React from 'react';
import { withRouter } from 'react-router-dom';
import './listQuiz.css';
import {Row, Col, Button,Navbar,Nav,Container} from 'react-bootstrap';
import {Link} from "react-router-dom";

class ListQuiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quizList:[
                {quiz_id:1, quiz_title:"Collaborative Learning"},
                {quiz_id:2, quiz_title:"Leadership"},
                {quiz_id:3, quiz_title:"Resilience"}
            ]
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


        //this.quizList = this.getQuizList();



    };


    render(){



        return(
            <div className="listQuizPage">
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
                        <Link to='/listQuiz'>
                            <Button className="feedbackButton"
                                    size="lg"
                                    variant="outline-primary"
                            >My feedback</Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <div className="myQuiz">My Quizzes</div>
                </Row>
                <Row className="quizName">
                    <div className="box justify-content-center align-items-center">

                        {
                            this.state.quizList.map((quiz) =>
                                <Link
                                    to={{
                                        pathname:"/communication",
                                        state:{
                                            quizId: parseInt(quiz.quiz_id)
                                        }
                                    }}>
                                    <Button className="QuizZone">
                                        {quiz.quiz_title}
                                    </Button>
                                </Link>


                            )

                        }
                        {/*<Button className="QuizZone" href = "/communication">*/}
                        {/*    Collaborative Learning*/}
                        {/*</Button>*/}
                        {/*<Button className="QuizZone" href = "/communication">*/}
                        {/*    Leadership*/}
                        {/*</Button>*/}
                        {/*<Button className="QuizZone" href = "/communication">*/}
                        {/*    Resilience*/}
                        {/*</Button>*/}
                    </div>


                </Row>


            </div>
        );



    }
}



export default ListQuiz;