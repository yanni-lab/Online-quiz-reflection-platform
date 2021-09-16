import React,{ Component } from 'react';
import './Quiz.css';
import data from "../../quiz.json"
import {Row, Col, Button,Form,Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";




class Quiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quizId :props.location.state.quizId,
            currQuestion:0,
            //score:,
            options:[],
            question:'',
            displayFormer : 'none',
            displayNext: 'none',
            showFeedbackButton: 'none',
            leave:false,
            quizList:props.location.state.quizList,
            feedback:props.location.state.feedback
        };
        //获取题目详情
        /** = data.questions
        this.state.quizList.push(
            {
                "question":'Congrats! You have reached the end!',
                "choices": [
                ]
            }
        )**/
        //得分列表
        this.score = new Array(this.state.quizList.length-1).fill(0)

        //总得分
        this.sum = 0

        //feedback内容
        //this.feedback = JSON.parse(data.feedback)
        console.log(this.state.feedback)
        this.feedbackContent = ''




        this.handleChange = this.handleChange.bind(this);
        this.nextClick = this.nextClick.bind(this);
        this.formerClick = this.formerClick.bind(this);
        this.leaveQuiz = this.leaveQuiz.bind(this);
        this.cancelLeaveQuiz = this.cancelLeaveQuiz.bind(this);

    };



    handleChange(event) {
        const option_score =  parseInt(event.target.value)
        this.score[this.state.currQuestion] = option_score;

        console.log('该选项得分为'+option_score+";"+'当前总得分为'+this.score);


        this.setState({
            displayNext: 'block',

        })
    }


    nextClick(){
        this.state.currQuestion+=1


        //计算总得分并匹配feedback
        if(this.state.currQuestion== this.state.quizList.length-1){
            for(let i = 0; i<this.score.length;i++){
                this.sum+=this.score[i]
            }
            console.log("sum:"+this.sum)
            for(let interval in this.state.feedback){
                let l = parseInt(interval.split("-")[0])
                let r = parseInt(interval.split("-")[1])
                //console.log(Object.keys(this.state.feedback[interval])[0],l,r,this.sum)
                if(l<=this.sum && this.sum<=r){
                    this.feedbackContent = this.state.feedback[interval]
                    break;
                }
            }
        }




        this.setState({
            //currQuestion:this.state.currQuestion+1,
            displayFormer: this.state.currQuestion>0 ? 'block': 'none',
            displayNext: 'none',
            showFeedbackButton: this.state.currQuestion== this.state.quizList.length-1? 'block': 'none'

        })
        console.log(this.state)
        //console.log(this.state.quizList)


    }

    formerClick(){
        this.state.currQuestion-=1

        this.setState({

            displayFormer: this.state.currQuestion>0 ? 'block': 'none',
            showFeedbackButton: this.state.currQuestion== this.state.quizList.length-1? 'block': 'none'


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
                            {this.state.quizList[this.state.currQuestion].question}
                        </div>


                        <form>
                            {
                                this.state.quizList[this.state.currQuestion].choices.map((option) =>
                                    <div className="option">
                                        <Button className="optionButton" value={option.score} onClick={this.handleChange}>{option.choice}</Button>
                                    </div>)

                            }
                        </form>

                        <div style={{display: this.state.showFeedbackButton}}>
                            <Link
                                //onClick = {this.calculateFeedback}
                                to={{
                                pathname:'/feedback',
                                state:{
                                    feedback: this.feedbackContent
                                }
                            }}>
                                <Button className = "seeFeedback" >
                                    Click here to see feedback
                                </Button>
                            </Link>

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






export default withRouter(Quiz);