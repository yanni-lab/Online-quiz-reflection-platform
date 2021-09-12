import React from 'react';
import './ListQuiz.css';
import {Row, Col, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";

const ListQuiz = () =>{
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

                <Col className="QuizZone">
                    Collaborative Learning
                </Col>
                <Col className="QuizZone">
                    Leadership
                </Col>
                <Col className="QuizZone">
                    Resilience
                </Col>
            </Row>

        </div>
    );
};

export default ListQuiz;