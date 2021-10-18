import React from 'react';
import './Quiz.css';
import {Row, Col, Button,Form,Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";




class Quiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currQuestion:0,
            finishedQuestion:0,
            leave:false,
            quizList:props.location.state.quizList,
            // feedback:JSON.parse(props.location.state.feedback),
            feedback:props.location.state.feedback,
            quizId:props.location.state.quizId,
            score:new Array(props.location.state.quesNum).fill(0),
            options:new Array(props.location.state.quesNum).fill(0),
        };






        //得分列表
        this.score = new Array(this.state.quizList.length).fill(0)

        //总得分
        this.sum = 0
        this.feedbackContent = ''





        this.nextClick = this.nextClick.bind(this);
        this.formerClick = this.formerClick.bind(this);
        this.leaveQuiz = this.leaveQuiz.bind(this);
        this.cancelLeaveQuiz = this.cancelLeaveQuiz.bind(this);



    };



    handleChange = (choiceId,score,event) => {
        if(this.state.currQuestion>=this.state.finishedQuestion){
            this.setState(
                {
                    finishedQuestion : this.state.currQuestion+1
                }
            )

        }

        const current = this.state.currQuestion
        const choice_id =  parseInt(choiceId)
        const choice_score =  parseInt(score)

        this.setState(state => {
            this.state.options[current] = choice_id
            this.state.score[current] = choice_score
            return state;
        })



        console.log(this.state)
    }


    nextClick(){
        this.setState(
            {
                currQuestion:this.state.currQuestion+=1
            }
        )


        //计算总得分并匹配feedback
        if(this.state.currQuestion== this.state.quizList.length-1){
            console.log(this.state.score)
            for(let i in this.state.score){
                this.sum+=this.state.score[i]
            }

            console.log("sum:"+this.sum)
            for(let interval in this.state.feedback){
                let l = parseInt(this.state.feedback[interval].lowerBound)
                let r = parseInt(this.state.feedback[interval].upperBound)
                if(l<=this.sum && this.sum<=r){
                    this.feedbackContent = this.state.feedback[interval].feedbackContent
                    console.log(this.feedbackContent)
                    break;
                }
            }
        }




    }

    formerClick(){
        this.setState(
            {
                currQuestion:this.state.currQuestion-=1
            }
        )
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


                    <Form className="quizForm">
                        <div className = "question">
                            {this.state.quizList[this.state.currQuestion].question}
                        </div>


                        <form>
                            {


                                this.state.quizList[this.state.currQuestion].choices.map((option) =>

                                    <div className="option">
                                        <Button className="optionButton"
                                                value={option.choiceId}
                                                onClick={this.handleChange.bind(this, option.choiceId,option.score)}
                                                style={{backgroundColor: this.state.options[this.state.currQuestion]==option.choiceId? '#0d6efd':'white',
                                                    color: this.state.options[this.state.currQuestion]==option.choiceId? 'white':'#0d6efd'
                                                }}

                                        >{option.choice}</Button>
                                    </div>

                                )

                            }
                        </form>

                        <div style={{display: this.state.currQuestion== this.state.quizList.length-1? 'block': 'none'}}>
                            <Link
                                to={{
                                pathname:'/feedback',
                                state:{
                                    feedback: this.feedbackContent,
                                    quizId:this.state.quizId,
                                    options:this.state.options,
                                    score:this.sum

                                }
                            }}>
                                <Button className = "seeFeedback" >
                                    Click here to see feedback
                                </Button>
                            </Link>

                        </div>

                    </Form>



                <div  className = "formerNextButtonRow">
                    <Row>
                        <Col>
                            <div style={{display: this.state.currQuestion>0? 'block':'none'}}>
                                <Button className="formerButton"
                                        size="lg"
                                        variant="outline-primary"
                                        onClick = {this.formerClick}
                                >
                                    &lt; </Button>
                            </div>
                        </Col>

                        <Col>
                            <div style={{display: this.state.finishedQuestion>this.state.currQuestion? 'block':'none'}}>
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
                        <Link to="./listQuiz">
                            <Button className = "ensureExit">Yes</Button>
                        </Link>

                        <Button onClick = {this.cancelLeaveQuiz} className = "cancelExit">No</Button>
                    </Modal.Footer>


                </Modal>











            </div>

        );
    }
}






export default withRouter(Quiz);