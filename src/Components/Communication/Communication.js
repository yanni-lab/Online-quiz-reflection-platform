import React from 'react';
import './Communication.css';
import {Row, Col, Button,FormText} from 'react-bootstrap';
import {Link} from "react-router-dom";
import { withRouter } from "react-router-dom";


class Communication extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //quizId :


        };

    };



    render() {

        console.log(this.props.location.state)
        const title="Collaborative Learning"
        const content="Collaborative Learning is the educational approach of using groups to enhance" +
            "learning through working together. Groups of two or more learners work together to solve problems" +
            ", complete tasks, or learn new concepts." +
            "\n " +
            "\n Take this quiz now to find out how well you do in collaborative Learning!"


        return(
            <div className="communicationPage">
                <Row>
                    <Col>
                        <Link to='/listQuiz'>
                            <Button className="backButton"
                                    size="lg"
                                    variant="outline-primary"
                            >Back</Button>
                        </Link>
                    </Col>

                </Row>

                <form>
                    <div>
                        <div className="text-container"><span className="title">{title}</span></div>
                        <div className="text-container"><span className="sub-title">Overview</span></div>
                        <div className="text-container"><span className="content">{content}</span></div>
                    </div>

                    <div className="box">
                        <Button className = "start-btn" href = "/quiz">Start this quiz !</Button>
                    </div>
                </form>







            </div>
        );
    }
}

//
// const Communication = () =>{
//
//
//
//
//
// };

export default withRouter(Communication);