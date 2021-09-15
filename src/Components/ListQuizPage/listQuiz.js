import React from 'react';
import { withRouter } from 'react-router-dom';
import './listQuiz.css';
import {Row, Col, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";

class ListQuiz extends React.Component {
    constructor(props){
        super(props);
        //this.history = {this.props.history}
        // this.selectQuiz = function (selectQuizNum){
        //     //this.props.history.push({ pathname: "/communication", state: {param:selectQuizNum} });
        //     alert(selectQuizNum)
        // }

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
                    <div className="box justify-content-center align-items-center">
                        <Button className="QuizZone" href = "/communication">
                            Collaborative Learning
                        </Button>
                        <Button className="QuizZone" href = "/communication">
                            Leadership
                        </Button>
                        <Button className="QuizZone" href = "/communication">
                            Resilience
                        </Button>
                    </div>


                </Row>

            </div>
        );



    }
}



export default ListQuiz;