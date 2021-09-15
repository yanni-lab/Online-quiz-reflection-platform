import React,{ Component } from 'react';
import './Quiz.css';
import data from "../../quiz.json"
import {Row, Col, Button,Form,Modal} from 'react-bootstrap';



class Quiz extends React.Component {
    constructor(props){
        super(props);
        //获取题目详情
        this.quizList = data.questions
        this.quizList.push(
            {
                "question":'Congrats! You have reached the end!',
                "choices": [
                ]
            }
        )

        this.state = {
            currQuestion:0,
            value:0,
            options:[],
            question:'',
            displayFormer : 'none',
            displayNext: 'none',
            showFeedbackButton: 'none',
            leave:false
        };

        this.handleChange = this.handleChange.bind(this);
        this.nextClick = this.nextClick.bind(this);
        this.formerClick = this.formerClick.bind(this);
        this.leaveQuiz = this.leaveQuiz.bind(this);
        this.cancelLeaveQuiz = this.cancelLeaveQuiz.bind(this);


    };


    handleChange(event) {
        this.state.value = event.target.value;
        console.log('该选项得分为'+this.state.value);
        this.setState({
            displayNext: 'block',

        })
    }


    nextClick(){
        this.state.currQuestion+=1


        this.setState({
            //currQuestion:this.state.currQuestion+1,
            displayFormer: this.state.currQuestion>0 ? 'block': 'none',
            displayNext: 'none',
            showFeedbackButton: this.state.currQuestion== this.quizList.length-1? 'block': 'none'

        })
        console.log(this.state)
        console.log(this.quizList)

    }

    formerClick(){
        this.state.currQuestion-=1

        this.setState({

            displayFormer: this.state.currQuestion>0 ? 'block': 'none',
            showFeedbackButton: this.state.currQuestion== this.quizList.length-1? 'block': 'none'


        })
        console.log(this.state)

    }

    leaveQuiz(){
        this.setState({
            leave: true,

        })

    }

    cancelLeaveQuiz(){
        this.setState({
            leave: false
        })

    }





    render(){
        // const quizList =  {
        //     'quiz':[
        //         {
        //             "quizNum":1,
        //             "quizQuestion":'你掉的是这个金斧子还是银斧子？',
        //             "quizOptions":[
        //                 {'option':'金斧子'},
        //                 {'option':'银斧子'},
        //                 {'option':'我没掉斧子'}
        //             ]
        //
        //
        //         },
        //         {
        //             "quizNum":2,
        //             "quizQuestion":'When the group needs suggestions, I...',
        //             "quizOptions":[
        //                 {'option':'Do not make suggestions'},
        //                 {'option':'Tell the group what to do'},
        //                 {'option':'Discuss my suggestions with the group'},
        //                 {'option':"Make sure everyone's suggestions are heard" }
        //             ]
        //         },
        //         {
        //             "quizNum":3,
        //             "quizQuestion":'123',
        //             "quizOptions":[
        //                 {'option':'abc'},
        //                 {'option':'def'},
        //                 {'option':'ghi'},
        //                 {'option':"lmn" }
        //             ]
        //         },
        //         {
        //             "quizNum":4,
        //             "quizQuestion":'Congrats! You have reached the end!',
        //             "quizOptions":[
        //
        //             ]
        //         }
        //     ]
        // }





        return (
            <div className="quizPage">
                <Row>
                    <Col>

                            <Button className="backButton"
                                    size="lg"
                                    variant="outline-primary"
                                    onClick = {this.leaveQuiz}

                            >Exit Quiz</Button>

                    </Col>
                </Row>

                <div className="box justify-content-center align-items-center">
                    <Form className="quizForm">
                        <div className = "question">
                            {this.quizList[this.state.currQuestion].question}
                        </div>


                        <form>
                            {
                                this.quizList[this.state.currQuestion].choices.map((option) =>
                                    <div className="option">
                                        <Button className="optionButton" value={option.score} onClick={this.handleChange}>{option.choice}</Button>
                                    </div>)

                            }
                        </form>

                        <div style={{display: this.state.showFeedbackButton}}>
                            <Button className = "seeFeedback">
                                Click here to see feedback
                            </Button>
                        </div>






                    </Form>
                </div>


                <div  className = "formerNextButtonRow">
                    <Row>
                        <Col>
                            <div style={{display: this.state.displayFormer}}>
                                <Button className="formerButton"
                                        size="lg"
                                        variant="outline-primary"
                                        onClick = {this.formerClick}
                                >
                                    &lt; </Button>
                            </div>
                        </Col>

                        <Col>
                            <div style={{display: this.state.displayNext}}>
                                <Button className="nextButton"
                                        size="lg"
                                        variant="outline-primary"
                                        onClick = {this.nextClick}
                                >  &gt; </Button>
                            </div>
                        </Col>
                    </Row>
                </div>


                <Modal  show = {this.state.leave}
                        onClick =  {this.cancelLeaveQuiz}
                >

                    <Modal.Body>
                        Are you sure you want to exit the quiz? (Have you saved / shared ?)
                    </Modal.Body>
                    <Modal.Footer>
                        <Button href = "./listQuiz" className = "ensureExit">Yes</Button>
                        <Button onClick = {this.cancelLeaveQuiz} className = "cancelExit">No</Button>
                    </Modal.Footer>


                </Modal>











            </div>

        );
    }
}






export default Quiz;