import React from 'react';
import { withRouter } from 'react-router-dom';
import './EditQuiz.css';
import {Row, Col, Button,Form,Modal} from 'react-bootstrap';
import {Link} from "react-router-dom";

class EditQuiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cancel:false,
            flag:1,
            title:"",
            overview:"",
            questions:[
                    {
                        "question_id":1,
                        "question_name": "",
                        "options":[
                            {
                                "option_id":1,
                                "option":"",
                                "score":""
                            }
                        ]
                    }
            ],
            feedbacks:[
                {
                    "feedback_id":1,
                    "from":"",
                    "to":"",
                    "feedback_content":""
                }
            ]
        };





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
                "question_id": this.state.questions.length+1,
                "question_name": "",
                "options":[
                    {
                        "option_id":1,
                        "option":"",
                        "score":""
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
            state.questions[index].question_name = event.target.value;
            return state;
        });
    }

    handleAddOption(event){
        this.setState({})
        this.state.questions[event.target.value].options.push(
            {
                "option_id":this.state.questions[event.target.value].options.length+1,
                "option":"",
                "score":""
            })
    }

    handleDeleteOption(option_index,question_index) {
        this.setState(state => {
            state.questions[question_index].options.splice(option_index,1);
            return state;
        });
    }

    handleOptionChange(option_index,question_index,event) {
        this.setState(state => {
            state.questions[question_index].options[option_index].option = event.target.value;
            return state;
        });
    };

    handleScoreChange(option_index,question_index,event) {
        this.setState(state => {
            state.questions[question_index].options[option_index].score = event.target.value;
            return state;
        });
    };

    handleAddFeedback(){
        this.setState({})
        this.state.feedbacks.push(
            {
                "feedback_id":this.state.feedbacks.length+1,
                "from":"",
                "to":"",
                "feedback_content":""
            })
    }

    handleFromChange = (index,event) => {
        this.setState(state => {
            state.feedbacks[index].from = event.target.value;
            return state;
        });
    }

    handleToChange = (index,event) => {
        this.setState(state => {
            state.feedbacks[index].to = event.target.value;
            return state;
        });
    }

    handleFeedbackChange = (index,event) => {
        this.setState(state => {
            state.feedbacks[index].feedback_content = event.target.value;
            return state;
        });
    }

    handleDeleteFeedback(event){
        this.setState(state => {
            state.feedbacks.splice(event.target.value,1);
            return state;
        });
    }

    handleSubmit(event) {
        console.log(1)
        console.log(this.state.title);
        var dataSent = JSON.stringify({
            "quizTitle": this.state.title,
            "quizBackground":this.state.overview,
            "choices":this.state.questions,
            "feedback":this.state.feedbacks
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

        //const token = "111"

    }


    render(){
        return(
            <div className="editQuizPage">
                <div className = "heading">
                    Create Quiz
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
                                    //type="submit"
                                    onClick = {this.handleCancel}
                            >
                                Cancel
                            </Button>
                        </Col>

                        <Col className = "button-col">
                            <Button className="loginButton"
                                    size="lg"
                                    //type="submit"
                                // disabled={this.validateForm()}
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
                                                  value={question.question_name}
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
                                    question.options.map((option,option_index) =>
                                        <Row className = "quiz-row">
                                            <Form.Control
                                                className = "option-input"
                                                autoFocus
                                                type="text"
                                                placeholder = {"Option"+(option_index+1)}
                                                value={option.option}
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
                                                value = {feedback.from}
                                                onChange= {this.handleFromChange.bind(this, feedback_index)}
                                            />
                                        </Col>
                                        <Col xs = {1}>
                                            <Form.Control
                                                type="text"
                                                placeholder ="To"
                                                value = {feedback.to}
                                                onChange= {this.handleToChange.bind(this, feedback_index)}
                                            />
                                        </Col>
                                        <Col xs = {9}>
                                            <Form.Control as="textarea"
                                                          placeholder ="Feedback"
                                                          value = {feedback.feedback_content}
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
                            {/*<Link to = {{*/}
                            {/*    pathname:'/createQuiz',*/}
                            {/*    state:{*/}
                            {/*        newQuiz: this.state.title*/}
                            {/*    }*/}
                            {/*}}>*/}
                                <Button className="loginButton"
                                        size="lg"
                                        onClick = {this.handleSubmit}
                                >
                                    Save
                                </Button>
                            {/*</Link>*/}
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

            </div>
        );



    }
}



export default EditQuiz;