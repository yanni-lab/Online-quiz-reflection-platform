import React from 'react';
import './Communication.css';
import {Row, Col, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import { withRouter } from "react-router-dom";
import data from "../../data/quiz_content.json"


class Communication extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quizId:props.location.state.quizId,
            title: data.quizTitle,
            content: data.quizBackground,
            quizList: data.questions,
            supervisorId: 0,
            quesNum: data.questions.length,
            feedback: data.feedback
        };




        fetch('http://localhost:8080/quiz/quiz_content',{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({"quizId": this.state.quizId})
        }).then((response)=>{
            return response.json()
        }).then((data)=>{


            this.setState({
                title:data["quizTitle"],
                content:data["quizBackground"].replace("\\n","\n"),
                feedback:data["feedback"],
                quizList:data["questions"],
                quesNum:data["questions"].length,
                supervisorId:data["supervisorId"]

            });

            //data from backend
        }).catch(function(error){
            console.log(error)
        })



    };



    render() {
        document.title = "Communication"
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

                <form className="communication-form">
                    <div>
                        <div className="text-container"><span className="title">{this.state.title}</span></div>
                        <div className="text-container"><span className="sub-title">Overview</span></div>
                        <div className="text-container"><span style={{"white-space": "pre-line"}} className="content">{this.state.content}</span></div>
                    </div>

                    <div className="start-box">
                        <Link to={{pathname: "/quiz",
                            state:{
                                quizId:this.state.quizId,
                                quizList:this.state.quizList.concat([{
                                    "question":'Congrats! You have reached the end!',
                                    "choices": [
                                    ]
                                }]),

                                feedback: this.state.feedback,
                                quesNum:this.state.quesNum,
                                supervisorId:this.state.supervisorId}
                            }}>
                            <Button className = "start-btn">Start this quiz !</Button>
                        </Link>
                    </div>
                </form>







            </div>
        );
    }
}


export default withRouter(Communication);