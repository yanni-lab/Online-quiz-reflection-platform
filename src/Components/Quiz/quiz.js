import React,{ Component } from 'react';
import './Quiz.css';

import {Row, Col, Button,Form} from 'react-bootstrap';
import {Link} from "react-router-dom";


class Quiz extends React.Component {
    constructor(props){
        super(props);

        //获取题目详情
        this.quizList =  {
            'quiz':[
                {
                    "quizNum":1,
                    "quizQuestion":'你掉的是这个金斧子还是银斧子？',
                    "quizOptions":[
                        {'option':'金斧子'},
                        {'option':'银斧子'},
                        {'option':'我没掉斧子'}
                        ]


                },
                {
                    "quizNum":2,
                    "quizQuestion":'When the group needs suggestions, I...',
                    "quizOptions":[
                        {'option':'Do not make suggestions'},
                        {'option':'Tell the group what to do'},
                        {'option':'Discuss my suggestions with the group'},
                        {'option':"Make sure everyone's suggestions are heard" }
                        ]
                },
                {
                    "quizNum":3,
                    "quizQuestion":'123',
                    "quizOptions":[
                        {'option':'abc'},
                        {'option':'def'},
                        {'option':'ghi'},
                        {'option':"lmn" }
                    ]
                },
                {
                    "quizNum":4,
                    "quizQuestion":'',
                    "quizOptions":[

                    ]
                }
            ]
        }




        this.state = {
            currQuestion:0,
            value:'',
            options:[],
            question:'',
            displayFormer : 'none',
            displayNext: 'none',
            showFeedbackButton: 'none'
        };

        this.handleChange = this.handleChange.bind(this);
        this.nextClick = this.nextClick.bind(this);
        this.formerClick = this.formerClick.bind(this);


    };

    handleChange(event) {
        this.state.value = event.target.value;
        console.log('选择了'+this.state.value);
        this.setState({
            displayNext: 'block',
            //displayFormer: this.state.currQuestion>0 ? 'none': 'block',

        })
    }


    nextClick(){
        //this.state.currQuestion+=1
        this.setState({
            currQuestion:this.state.currQuestion+1,
            displayFormer: this.state.currQuestion>0 ? 'block': 'none',
            displayNext: 'none',
            showFeedbackButton: this.state.currQuestion==2 ? 'block': 'none'



        })
        console.log(this.state)
        //console.log(this.state)
        // if(this.state.currQuestion>0){
        //     this.setState({displayFormer:true})
        // }
    }

    formerClick(){
        //this.state.currQuestion-=1
        this.setState({
            currQuestion:this.state.currQuestion-1,
            displayFormer: this.state.currQuestion>0 ? 'block': 'none',
            //displayNext: 'none'

        })
    }







    render(){
        const quizList =  {
            'quiz':[
                {
                    "quizNum":1,
                    "quizQuestion":'你掉的是这个金斧子还是银斧子？',
                    "quizOptions":[
                        {'option':'金斧子'},
                        {'option':'银斧子'},
                        {'option':'我没掉斧子'}
                    ]


                },
                {
                    "quizNum":2,
                    "quizQuestion":'When the group needs suggestions, I...',
                    "quizOptions":[
                        {'option':'Do not make suggestions'},
                        {'option':'Tell the group what to do'},
                        {'option':'Discuss my suggestions with the group'},
                        {'option':"Make sure everyone's suggestions are heard" }
                    ]
                },
                {
                    "quizNum":3,
                    "quizQuestion":'123',
                    "quizOptions":[
                        {'option':'abc'},
                        {'option':'def'},
                        {'option':'ghi'},
                        {'option':"lmn" }
                    ]
                },
                {
                    "quizNum":4,
                    "quizQuestion":'Congrats! You have reached the end!',
                    "quizOptions":[

                    ]
                }
            ]
        }





        return (
            <div className="quizPage">
                <Row>
                    <Col>
                        <Link to='/listQuiz'>
                            <Button className="backButton"
                                    size="lg"
                                    variant="outline-primary"

                            >Exit Quiz</Button>
                        </Link>
                    </Col>
                </Row>

                <div className="box justify-content-center align-items-center">
                    <Form className="quizForm">
                        <div className = "question">
                            {quizList.quiz[this.state.currQuestion].quizQuestion}
                        </div>


                        <form>
                            {
                                quizList.quiz[this.state.currQuestion].quizOptions.map((option) =>
                                    <div className="option">
                                        <Button className="optionButton" value={option.option} onClick={this.handleChange}>{option.option}</Button>
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


                <Row className = "formerNextButtonRow">
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

        );
    }
}






export default Quiz;