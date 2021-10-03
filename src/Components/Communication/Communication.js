import React from 'react';
import './Communication.css';
import {Row, Col, Button,FormText} from 'react-bootstrap';
import {Link} from "react-router-dom";
import { withRouter } from "react-router-dom";
import data from "../../quiz.json"



class Communication extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quizId:props.location.state.quizId,
            // title:"",
            // content:"",
            title: data.quizTitle,
            content: data.quizBackground
        };

        this.quizList = data.questions;
        this.quesNum = this.quizList.length;
        this.quizList.push(
            {
                "question":'Congrats! You have reached the end!',
                "choices": [
                ]
            }
        );
        this.feedback = data.feedback


        fetch('http://localhost:8080/service/quiz_content',{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({"quizId": this.state.quizId})//这个要从listQuiz页面传过来
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            this.quizData = data;
            console.log(this.quizData);
            this.feedback = JSON.parse(this.quizData["feedback"]);
            this.quizList = this.quizData["questions"];
            this.quesNum = this.quizList.length;
            console.log(this.quesNum);
            this.quizList.push(
                {
                    "question":'Congrats! You have reached the end!',
                    "choices": [
                    ]
                }
            );

            this.setState({
                title:this.quizData["quizTitle"]
            });
            this.setState({content:this.quizData["quizBackground"].replace("\\n","\n")});
            console.log(this.state.content);
            //data from backend
        }).catch(function(error){
            console.log(error)
        })

        console.log(this.state.quizId)



    };



    render() {

        //const title="Collaborative Learning"
        //const content="Collaborative Learning is the educational approach of using groups to enhance" +
        //    "learning through working together. Groups of two or more learners work together to solve problems" +
        //    ", complete tasks, or learn new concepts." +
        //    "\n " +
        //    "\n Take this quiz now to find out how well you do in collaborative Learning!"

        // const title=this.quizData.quizTitle
        // const content=this.quizData.quizBackground +
        //     "\n " +
        //     "\n Take this quiz now to find out how well you do in "+this.quizData.quizTitle+"!"


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
                        <div className="text-container"><span className="title">{this.state.title}</span></div>
                        <div className="text-container"><span className="sub-title">Overview</span></div>
                        <div className="text-container"><span style={{"white-space": "pre-line"}} className="content">{this.state.content}</span></div>
                    </div>

                    <div className="box">
                        <Link to={{pathname: "/quiz",
                            state:{
                                quizId:this.state.quizId,
                                quizList:this.quizList,
                                feedback: this.feedback
                            }
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