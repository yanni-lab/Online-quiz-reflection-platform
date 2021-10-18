import React from 'react';
import './listQuiz.css';
import {Row, Col, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import cookie from 'react-cookies'

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

            this.setState({quizList:data["quizList"]});
            console.log("back");

            //data from backend
        }).catch(function(error){
            console.log(error)
        })




    };


    render(){
        document.title = "LECs Dashboard"



        return(
            <div className="listQuizPage">
                <Row>
                    <Col>

                    </Col>
                    <Col style={{display:cookie.load('login')=="true"?"block":"none"}}>
                        <Link to='/MyLECs'>
                            <Button className="my-feedback-Button"
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

                    </div>


                </Row>


            </div>
        );



    }
}



export default ListQuiz;