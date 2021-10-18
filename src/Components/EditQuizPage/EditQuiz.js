import React from 'react';
import { withRouter } from 'react-router-dom';
import './EditQuiz.css';
import {Row, Col, Button,Form,Modal} from 'react-bootstrap';
import quiz from "../../data/quiz_content.json"
import cookie from 'react-cookies'

class EditQuiz extends React.Component {
    constructor(props){
        super(props);


        this.state = {
            action:this.props.location.state.action,
            userId:cookie.load("userId"),
            cancel:false,
            saveFlag:false,
            flag:1,
            title: "",
            overview:"",
            questions:[
                {
                    "question": "",
                    "choices":[
                        {
                            "score": "",
                            "choice": ""
                        }
                    ]
                }
            ],
            feedbacks:[
                {
                    "lowerBound":"",
                    "upperBound":"",
                    "feedbackContent":""
                }
            ]
        };



        // this.props.location.state.action=="edit"?this.state={
        //     cancel:false,
        //     flag:1,
        //     title:quiz.quizTitle,
        //     overview:quiz.quizBackground,
        //     questions:quiz.questions,
        //     feedbacks:quiz.feedback
        // }:this.state = {
        //     cancel:false,
        //     flag:1,
        //     title: "",
        //     overview:"",
        //     questions:[
        //         {
        //             "question": "",
        //             "choices":[
        //                 {
        //                     "score": "",
        //                     "choice": ""
        //                 }
        //             ]
        //         }
        //     ],
        //     feedbacks:[
        //         {
        //             "lowerBound":"",
        //             "upperBound":"",
        //             "feedbackContent":""
        //         }
        //     ]
        // };

        if (this.props.location.state.action=="Edit"){
            fetch('http://localhost:8080/quiz/quiz_content',{
                method:'post',
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({"quizId": this.props.location.state.quiz_id})//get corresponding quiz with quiz_id
            }).then((response)=>{
                return response.json()
            }).then((data)=>{
                this.quizData = data;
                console.log(this.quizData);
                this.setState({
                    title:this.quizData["quizTitle"],
                    overview:this.quizData["quizBackground"].replace("\\n","\n"),
                    questions:this.quizData["questions"],
                    feedbacks:this.quizData["feedback"]
                });
                console.log(this.state.content);
                //data from backend
            }).catch(function(error){
                console.log(error)
            })
        }







        this.handleCancel = this.handleCancel.bind(this);
        this.cancelLeave = this.cancelLeave.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleOverviewChange = this.handleOverviewChange.bind(this);

        this.handleAddQuestion = this.handleAddQuestion.bind(this);
        this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);

        this.handleAddOption = this.handleAddOption.bind(this);

        this.handleAddFeedback = this.handleAddFeedback.bind(this);
        this.handleDeleteFeedback = this.handleDeleteFeedback.bind(this);

        this.handleSave = this.handleSave.bind(this);

    };

    handleCancel(){
        this.setState({
            cancel: true,

        })
    }

    cancelLeave(){
        this.setState({
            cancel: false,

        })
    }

    handleContinue(){
        this.setState({
            flag: this.state.flag+1,
        })
        console.log(this.state.questions)
    }

    handleTitleChange(evt) {
        this.setState({
            title: evt.target.value,
        });
    };

    handleOverviewChange(evt) {
        this.setState({
            overview: evt.target.value,
        });
    }

    handleAddQuestion(){
        this.setState({})
        this.state.questions.push(
            {
                "question": "",
                "choices":[
                    {
                        "score": "",
                        "choice": "",
                    }
                ]
            })
    }

    handleDeleteQuestion(event){
        this.setState(state => {
            state.questions.splice(event.target.value,1);
            return state;
        });
    }

    handleQuestionChange = (index,event) => {
        this.setState(state => {
            state.questions[index].question = event.target.value;
            return state;
        });
    }

    handleAddOption(event){
        this.setState({})
        this.state.questions[event.target.value].choices.push(
            {
                "score": "",
                "choice": ""
            })
    }

    handleDeleteOption(option_index,question_index) {
        this.setState(state => {
            state.questions[question_index].choices.splice(option_index,1);
            return state;
        });
    }

    handleOptionChange(option_index,question_index,event) {
        this.setState(state => {
            state.questions[question_index].choices[option_index].choice = event.target.value;
            return state;
        });
    };

    handleScoreChange(option_index,question_index,event) {
        this.setState(state => {
            state.questions[question_index].choices[option_index].score = event.target.value;
            return state;
        });
    };

    handleAddFeedback(){
        this.setState({})
        this.state.feedbacks.push(
            {
                "lowerBound":"",
                "upperBound":"",
                "feedbackContent":""
            })
    }

    handleFromChange = (index,event) => {
        this.setState(state => {
            state.feedbacks[index].lowerBound = event.target.value;
            return state;
        });
    }

    handleToChange = (index,event) => {
        this.setState(state => {
            state.feedbacks[index].upperBound = event.target.value;
            return state;
        });
    }

    handleFeedbackChange = (index,event) => {
        this.setState(state => {
            state.feedbacks[index].feedbackContent = event.target.value;
            return state;
        });
    }

    handleDeleteFeedback(event){
        this.setState(state => {
            state.feedbacks.splice(event.target.value,1);
            return state;
        });
    }

    handleSave(event) {
        console.log(1)
        console.log(this.state);
        var dataSent = JSON.stringify({
            "quizTitle": this.state.title,
            "quizBackground":this.state.overview,
            "questions":this.state.questions,
            "feedback":this.state.feedbacks,
            "supervisorId":this.state.userId
        });
        this.token = "";
        event.preventDefault();
        fetch('http://localhost:8080/quiz/set_quiz',{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body:dataSent
        }).then((response)=>{
            return response.json()
        }).catch(function(error){
            console.log(error)
        })

        this.setState({
            saveFlag:true
        })
    }


    render(){
        document.title = "Create Quizzes"
        return(
            <div className="editQuizPage">
                <div className = "heading">
                    {this.state.action+" Quiz"}
                </div>


                {/*Create/Edit Quiz List*/}
                <Form className="create-quiz-form"
                      onSubmit={this.handleSubmit}
                      style = {{display: this.state.flag == 1? 'block':'none'}}>

                    <Form.Group size="lg" controlId="username">
                        <Form.Label className = "label">Title</Form.Label>
                        <Form.Control className = "input"
                                      autoFocus
                                      type="input"
                                      placeholder = "Title"
                                      value={this.state.title}
                                      onChange={this.handleTitleChange}
                        />

                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label className = "label">Quiz Overview</Form.Label>
                        <Form.Control  as="textarea"
                                       className = "overview"
                                      placeholder = "overview"
                                      value={this.state.overview}
                                      onChange={this.handleOverviewChange}
                        />
                    </Form.Group>

                    <Row>
                        <Col className = "button-col">
                            <Button className="loginButton"
                                    size="lg"
                                    onClick = {this.handleCancel}
                            >
                                Cancel
                            </Button>
                        </Col>

                        <Col className = "button-col">
                            <Button className="loginButton"
                                    size="lg"
                                    onClick = {this.handleContinue}
                            >
                                Continue
                            </Button>
                        </Col>


                    </Row>
                </Form>


                {/*Create/Edit Option List*/}
                <Form  className="create-quiz-form"
                      onSubmit={this.handleSubmit}
                      style = {{display: this.state.flag == 2? 'block':'none'}}

                >

                    <Form.Label className = "label">
                        {this.state.title}
                    </Form.Label>
                    {
                        this.state.questions.map((question,question_index) =>
                            <Form.Group size="lg" className="form-group-custom">
                                <Row className = "quiz-row">
                                    <Form.Control className = "question-input"
                                                  autoFocus
                                                  type="text"
                                                  placeholder ={"Question"+(question_index+1)}
                                                  value={question.question}
                                                  onChange= {this.handleQuestionChange.bind(this, question_index)}
                                    />
                                    <Button
                                        className = "question-cancel-button"
                                        value = {question_index}
                                        onClick = {this.handleDeleteQuestion}
                                    >
                                        X
                                    </Button>
                                </Row>
                                {
                                    question.choices.map((option,option_index) =>
                                        <Row className = "quiz-row">
                                            <Form.Control
                                                className = "option-input"
                                                type="text"
                                                placeholder = {"Option"+(option_index+1)}
                                                value={option.choice}
                                                onChange={this.handleOptionChange.bind(this, option_index,question_index)}
                                            />
                                            <Form.Control
                                                className = "option-score"
                                                type="text"
                                                placeholder = "points"
                                                value={option.score}
                                                onChange={this.handleScoreChange.bind(this, option_index,question_index)}
                                            />
                                            
                                            <Button
                                                className = "option-cancel-button"
                                                onClick={this.handleDeleteOption.bind(this, option_index,question_index)}
                                            >
                                                X
                                            </Button>
                                        </Row>
                                    )
                                }
                                <Button
                                    value = {question_index}
                                    onClick = {this.handleAddOption}>
                                    Add Option
                                </Button>
                            </Form.Group>
                        )
                    }

                    <Button onClick = {this.handleAddQuestion}>
                        Add question
                    </Button>

                    <Row>
                        <Col className = "button-col">
                            <Button className="loginButton"
                                    size="lg"
                                    onClick = {this.handleCancel}>
                                Cancel
                            </Button>
                        </Col>

                        <Col className = "button-col">
                            <Button className="loginButton"
                                    size="lg"
                                    onClick = {this.handleContinue}>
                                Continue
                            </Button>
                        </Col>
                    </Row>
                </Form>


                {/*Create/Edit Feedback List*/}
                <Form  className="create-quiz-form"
                      onSubmit={this.handleSubmit}
                      style = {{display: this.state.flag == 3? 'block':'none'}}>

                    <Form.Group size="lg" controlId="username">
                        <Form.Label className = "label">Feedback</Form.Label>
                    </Form.Group>
                    {
                        this.state.feedbacks.map((feedback,feedback_index) =>
                                <Form.Group size="lg"  className="form-group-custom">
                                    <Row className = "quiz-row">
                                        <Col xs = {1}>
                                            <Form.Control
                                                autoFocus
                                                type="text"
                                                placeholder ="From"
                                                value = {feedback.lowerBound}
                                                onChange= {this.handleFromChange.bind(this, feedback_index)}
                                            />
                                        </Col>
                                        <Col xs = {1}>
                                            <Form.Control
                                                type="text"
                                                placeholder ="To"
                                                value = {feedback.upperBound}
                                                onChange= {this.handleToChange.bind(this, feedback_index)}
                                            />
                                        </Col>
                                        <Col xs = {9}>
                                            <Form.Control as="textarea"
                                                          rows={4}
                                                          placeholder ="Feedback"
                                                          value = {feedback.feedbackContent}
                                                          onChange= {this.handleFeedbackChange.bind(this, feedback_index)}
                                            />
                                        </Col>
                                        <Col xs = {1}>
                                            <Button
                                                value = {feedback_index}
                                                onClick = {this.handleDeleteFeedback}
                                                className = "delete-button"
                                            >
                                                X
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form.Group>

                        )
                    }



                    <Button onClick = {this.handleAddFeedback}>
                        Add Feedback
                    </Button>




                    <Row>
                        <Col className = "button-col">
                            <Button className="loginButton"
                                    size="lg"
                                //type="submit"
                                    onClick = {this.handleCancel}
                            >
                                Cancel
                            </Button>
                        </Col>

                        <Col className = "button-col">
                                <Button className="loginButton"
                                        size="lg"
                                        onClick = {this.handleSave}
                                >
                                    Save
                                </Button>

                        </Col>


                    </Row>
                </Form>




                <Modal  show = {this.state.cancel}>

                    <Modal.Body>
                        Are you sure you want to cancel?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button href = "./createQuiz" className = "ensureExit">Yes</Button>
                        <Button onClick = {this.cancelLeave} className = "cancelExit">No</Button>
                    </Modal.Footer>


                </Modal>

                <Modal  show = {this.state.saveFlag}>
                    <Modal.Body>
                        This quiz has been saved successfully. You will be redirected to the "My Quiz" page.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button href = "./createQuiz" className = "ensureExit">Yes</Button>
                    </Modal.Footer>


                </Modal>

            </div>
        );



    }
}



export default withRouter(EditQuiz);