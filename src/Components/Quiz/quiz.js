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
            score:new Array(props.location.state.quizList.length-1).fill(0),
            options:new Array(props.location.state.quizList.length-1).fill(0),
        };


        //得分列表
        this.score = new Array(this.state.quizList.length).fill(0)

        //总得分
        this.sum = 0

        console.log(this.state.feedback)
        this.feedbackContent = ''




        this.handleChange = this.handleChange.bind(this);
        this.nextClick = this.nextClick.bind(this);
        this.formerClick = this.formerClick.bind(this);
        this.leaveQuiz = this.leaveQuiz.bind(this);
        this.cancelLeaveQuiz = this.cancelLeaveQuiz.bind(this);



    };



    handleChange(event) {
        if(this.state.currQuestion>=this.state.finishedQuestion){
            this.setState(
                {
                    finishedQuestion : this.state.currQuestion+1
                }
            )

        }



        const optionId =  parseInt(event.target.value)

        this.setState({

        })

        this.state.options[this.state.currQuestion] = optionId

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
            for(let i = 0; i<this.state.options.length;i++){
                this.sum+=this.state.quizList[i].choices[this.state.options[i]-1].score
            }

            console.log("sum:"+this.sum)
            for(let interval in this.state.feedback){
                let l = parseInt(Object.keys(this.state.feedback[interval])[0].split("-")[0])
                let r = parseInt(Object.keys(this.state.feedback[interval])[0].split("-")[1])
                //console.log(Object.keys(this.state.feedback[interval])[0],l,r,this.sum)
                if(l<=this.sum && this.sum<=r){
                    this.feedbackContent = Object.values(this.state.feedback[interval])[0]
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

                <div className="box justify-content-center align-items-center">
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
                                                onClick={this.handleChange}
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
                        <Button href = "./listQuiz" className = "ensureExit">Yes</Button>
                        <Button onClick = {this.cancelLeaveQuiz} className = "cancelExit">No</Button>
                    </Modal.Footer>


                </Modal>











            </div>

        );
    }
}






export default withRouter(Quiz);