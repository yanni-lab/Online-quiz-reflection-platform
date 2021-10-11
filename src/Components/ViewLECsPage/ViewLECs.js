import React from 'react';
import { withRouter } from 'react-router-dom';
import './ViewLECs.css';
import {Row, Col, Button,Form} from 'react-bootstrap';
import {Link} from "react-router-dom";
import result_content from "../../data/get_result_content.json"

class ViewLECs extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username:props.location.state.username,
            quiz_title:props.location.state.quiz_title,
            result_content:result_content,
            reflection:result_content.reflectionAvailable==true?result_content.reflection:"------Reflection diary not available — LEC chose not to share reflection diary------"
        };


    };


    render(){
        document.title = "LECs Result"
        return(
            <div className="ViewLECs">
                <div className="container">
                    <div className="title">
                        {this.state.username+"'s "+this.state.quiz_title +" Feedback"}
                    </div>
                    <Form>
                        {
                            this.state.result_content.choices.map((choice)=>(
                                <Form.Group>
                                    <div className = "question">
                                        {choice.question}
                                    </div>
                                    <div className="option">
                                        <Button className="optionButton">
                                            {choice.choice}
                                        </Button>
                                    </div>
                                </Form.Group>
                                )
                            )
                        }
                    </Form>
                    <div>
                        <div className="title">
                            Feedback
                        </div>
                        <div>
                            {
                                this.state.result_content.feedback
                            }
                        </div>
                    </div>

                    <div>
                        <div className="title">
                            Reflection Diary
                        </div>
                        <div className={this.state.result_content.reflectionAvailable==true?"reflection":"default-reflection"}>
                            {this.state.reflection}
                        </div>
                    </div>

                    <div className="box justify-content-center align-items-center">
                        <Link to={{pathname:"./MyLECs", state:{username:this.state.username}}}>
                            <Button className="backButton">Back</Button>
                        </Link>
                    </div>
                </div>

            </div>
        );
    }
}



export default withRouter(ViewLECs);