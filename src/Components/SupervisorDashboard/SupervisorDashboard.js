import React from 'react';
import { withRouter } from 'react-router-dom';
import './SupervisorDashboard.css';
import {Row, Col, Button, CardGroup,Card} from 'react-bootstrap';
import {Link} from "react-router-dom";
import supervisor from "../images/supervisor.png";

class SupervisorDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username:props.username,
        };
    };


    render(){



        return(
            <div className="SupervisorDashboard">


                <div className="container">
                        <Row>
                            <Col>
                                <p className="header">{"Hi, "+this.state.username+"!"}</p>
                            </Col>
                        </Row>

                        <Row className="roleContent">
                            <CardGroup>
                                <Card className="cardRole">
                                    <Card.Img className="supervisor-img" variant="top" src={supervisor}/>
                                    <Card.Body>
                                        <Card.Title>My Quizzes</Card.Title>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Link to={{
                                            pathname:'/createQuiz',
                                            state:{
                                                username: this.state.username
                                            }
                                        }}>
                                            <Button
                                                    size="lg"
                                                    variant="outline-primary"
                                            >Click here</Button>
                                        </Link>
                                    </Card.Footer>
                                </Card>
                                <Card className="cardRole">
                                    <Card.Img className="supervisor-img" variant="top" src={supervisor} />
                                    <Card.Body>
                                        <Card.Title>My LECs</Card.Title>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Link to={{
                                            pathname:'/myLECs',
                                            state:{
                                                username: this.state.username
                                            }
                                        }}>
                                            <Button
                                                    size="lg"
                                                    variant="outline-primary"
                                            >Click here</Button>
                                        </Link>

                                    </Card.Footer>
                                </Card>
                                <Card className="cardRole">
                                    <Card.Img className="supervisor-img" variant="top" src={supervisor} />
                                    <Card.Body>
                                        <Card.Title>User Experience Comments</Card.Title>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Link to={{
                                            pathname:'/viewComments',
                                            state:{
                                                username: this.state.username
                                            }
                                        }}>
                                            <Button
                                                    size="lg"
                                                    variant="outline-primary"
                                            >Click here</Button>
                                        </Link>

                                    </Card.Footer>
                                </Card>
                            </CardGroup>
                        </Row>
                </div>

            </div>

        );



    }
}



export default withRouter(SupervisorDashboard);