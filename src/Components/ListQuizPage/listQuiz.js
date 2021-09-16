import React from 'react';
import { withRouter } from 'react-router-dom';
import './listQuiz.css';
import {Row, Col, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";

class ListQuiz extends React.Component {
    constructor(props){
        super(props);
        fetch('http://localhost:8080/service/available_quiz',{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({"username": "111"})//this is just to send sth, meaningless
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            //this.quizList = JSON.parse(data["quizList"]);

            console.log(this.quizList);
            //data from backend
        }).catch(function(error){
            console.log(error)
        })
        //this.history = {this.props.history}
        // this.selectQuiz = function (selectQuizNum){
        //     //this.props.history.push({ pathname: "/communication", state: {param:selectQuizNum} });
        //     alert(selectQuizNum)
        // }

        //测试用数据
        this.quizList=[
            {quiz_id:1, quiz_title:"Collaborative Learning"},
            {quiz_id:2, quiz_title:"Leadership"},
            {quiz_id:3, quiz_title:"Resilience"}

        ]



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
                    <div className="myQuiz">My Quizes</div>
                </Row>
                <Row className="quizName">
                    <div className="box justify-content-center align-items-center" ref={this.myRef}>

                        {
                            this.quizList.map((quiz) =>
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