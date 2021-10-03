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


        fetch('http://localhost:8080/service/available_quiz',{
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



        this.publicList = this.state.quizList.map((quiz) =>
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
        console.log(this.publicList)

        this.privateList=
            this.state.createList.map((quiz) =>
                <Button className="QuizZone">
                    {quiz.quiz_title}

                        <Button className = "transform_button">
                            Make public
                        </Button>
                        <Button className = "edit_button">
                            Edit
                        </Button>
                        <Button className = "delete_button">
                            X
                        </Button>

                </Button>
            )
    };


    handleCreateClick(){
        this.setState({})
        this.state.createList.push({
            quiz_id:0,
            quiz_title:""
        })
    }

    handelPrivatetoPublic(){
        this.setState({})

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

                {/*Private Quiz List*/}
                <Row>
                    <div className="myQuiz">Private</div>
                </Row>

                <Row>
                    <div className="no_private" style={{display: this.state.createList.length==0? "block":"none"}}>
                        There are no private quizzes here yet!
                    </div>
                    <div className="box justify-content-center align-items-center">
                        <div className="quizName">
                            {
                                this.state.createList.map((quiz) =>

                                        <Button className="QuizZone">
                                            {quiz.quiz_title}
                                            <div className="button-onfocus">
                                                <Button className = "transform-button" onClick = {this.handelPrivatetoPublic}>
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