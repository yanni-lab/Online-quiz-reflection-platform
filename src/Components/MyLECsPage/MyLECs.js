import React from 'react';
import { withRouter } from 'react-router-dom';
import './MyLECs.css';
import {Row, Col, Button,Form} from 'react-bootstrap';
import {Link} from "react-router-dom";
import result from "../../data/get_supervisor_result.json"


class MyLECs extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username:props.username,
            results:result.supervisorResult,
            LECs:[
                {
                    username:"Ben",
                    questionName:"Collaborative Learning",
                    Date:(new Date()).toDateString()
                },
                {
                    username:"Anonymous",
                    questionName:"Leadership",
                    Date:(new Date()).toDateString()
                },
                {
                    username:"Anonymous",
                    questionName:"Leadership",
                    Date:(new Date()).toDateString()
                }
            ]
        };
        console.log(this.state.results)
    };


    render(){
        document.title = "My LECs"
        return(
            <div className="MyLECs">
                <div className="container">
                    <Row>
                        <Col>
                            <Link to={{
                                pathname:'./supervisor',
                                state:{
                                    username: this.state.username
                                }
                            }}>
                                <Button className="backButton"
                                        size="lg"
                                        variant="outline-primary"
                                >Back</Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="header">
                                My LECs
                            </div>
                        </Col>
                    </Row>
                    <Form className="LEC-form">
                        <Form.Label>
                            All LECs Feedbacks
                        </Form.Label>
                        <Form.Group>
                            <Row className="LEC-row">
                                <Col>
                                    LEC Name
                                </Col>
                                <Col>
                                    Quiz Topic
                                </Col>
                                <Col>
                                    Date
                                </Col>
                                <Col xs={1}>

                                </Col>
                            </Row>
                        </Form.Group>
                        {
                            this.state.results.map((result)=>
                                <Form.Group>
                                    <Row className="LEC-row">
                                        <Col>
                                            {result.username}
                                        </Col>
                                        <Col>
                                            {result.quiz_title}
                                        </Col>
                                        <Col>
                                            {result.reflection_time.slice(0,3).join("-") + " " + result.reflection_time.slice(3,6).join(":")}
                                        </Col>
                                        <Col xs={1}>
                                            <Link to={{
                                                pathname:"./ViewLECs",
                                                state:{
                                                    username:result.username,
                                                    quiz_title:result.quiz_title
                                                }
                                            }}>
                                                <Button>
                                                    View
                                                </Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            )
                        }

                    </Form>
                </div>
            </div>

        );



    }
}



export default withRouter(MyLECs);