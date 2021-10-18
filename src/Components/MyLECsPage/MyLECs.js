import React from 'react';
import { withRouter } from 'react-router-dom';
import './MyLECs.css';
import {Row, Col, Button,Form, Pagination} from 'react-bootstrap';
import {Link} from "react-router-dom";
import result from "../../data/get_supervisor_result.json"
import cookie from 'react-cookies'


class MyLECs extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username:cookie.load("username"),
            userId:cookie.load("userId"),
            results:result.supervisorResult,
            pages:[
                [
                        {
                            "reflection_available": false,
                            "quiz_id": 1,
                            "reflection_time": [
                                2021,
                                10,
                                8,
                                12,
                                56,
                                56
                            ],
                            "user_id": 1,
                            "attempt_id": 3,
                            "quiz_title": "Collaborative Learning",
                            "username": "EmmaW"
                        },
                        {
                            "quiz_id": 1,
                            "reflection_time": [
                                2021,
                                10,
                                8,
                                12,
                                15,
                                3
                            ],
                            "user_id": 1,
                            "attempt_id": 2,
                            "quiz_title": "Collaborative Learning",
                            "username": "EmmaW"
                        },
                        {
                            "quiz_id": 1,
                            "reflection_time": [
                                2021,
                                10,
                                8,
                                12,
                                14,
                                58
                            ],
                            "user_id": 1,
                            "attempt_id": 1,
                            "quiz_title": "Collaborative Learning",
                            "username": "EmmaW"
                        },
                        {
                            "reflection_available": false,
                            "quiz_id": 1,
                            "reflection_time": [
                                2021,
                                10,
                                8,
                                12,
                                56,
                                56
                            ],
                            "user_id": 1,
                            "attempt_id": 3,
                            "quiz_title": "Collaborative Learning",
                            "username": "EmmaW"
                        }
                ],
                [
                    {
                        "reflection_available": false,
                        "quiz_id": 1,
                        "reflection_time": [
                            2021,
                            10,
                            8,
                            12,
                            56,
                            56
                        ],
                        "user_id": 1,
                        "attempt_id": 3,
                        "quiz_title": "Collaborative Learning",
                        "username": "EmmaW"
                    },
                    {
                        "quiz_id": 1,
                        "reflection_time": [
                            2021,
                            10,
                            8,
                            12,
                            15,
                            3
                        ],
                        "user_id": 1,
                        "attempt_id": 2,
                        "quiz_title": "Collaborative Learning",
                        "username": "EmmaW"
                    },
                    {
                        "quiz_id": 1,
                        "reflection_time": [
                            2021,
                            10,
                            8,
                            12,
                            14,
                            58
                        ],
                        "user_id": 1,
                        "attempt_id": 1,
                        "quiz_title": "Collaborative Learning",
                        "username": "EmmaW"
                    }
                ]
            ],
            active:0,
        };

        fetch('http://localhost:8080/result/get_supervisor_result',{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({"userId": this.state.quizId})
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            this.results=data["supervisorResult"]
            this.pages=[]
            while(this.results.length!=0){
                this.pages.push(this.results.splice(0,4))
            }
            this.setState({
                pages:this.pages
            })
            //data from backend
        }).catch(function(error){
            console.log(error)
        })


        console.log(this.state.pages[this.state.active])
    };





    handlePage= (index) => {
        this.setState({
            active:index
        })
    }

    handlePreviousPage(){
        this.setState(
            {
                active:this.state.active==0?0:this.state.active-1
            }
        )
    }

    handleNextPage(){
        this.setState(
            {
                active:this.state.active==this.state.pages.length-1?this.state.pages.length-1:this.state.active+1
            }
        )
    }






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
                        <Col>
                            <div className="header">
                                My LECs
                            </div>
                        </Col>
                        <Col></Col>
                    </Row>

                    <Form className="LEC-form">
                        <Form.Label>
                            My LECs Feedbacks
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
                        <Form.Group>
                            {
                                this.state.pages[this.state.active].map((result)=>
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
                                                        quiz_title:result.quiz_title,
                                                        attemptId:result.attempt_id

                                                    }
                                                }}>
                                                    <Button>
                                                        View
                                                    </Button>
                                                </Link>
                                            </Col>
                                        </Row>
                                )
                            }
                        </Form.Group>


                    </Form>


                    <div className="Pagination-row">
                        <Pagination>
                            <Pagination.Item
                                onClick={this.handlePreviousPage.bind(this)}
                            >
                                &lt;
                            </Pagination.Item>
                            {
                                this.state.pages.map((page,index)=>
                                    <Pagination.Item
                                        key={index}
                                        activeLabel=""
                                        active={index == this.state.active}
                                        onClick={this.handlePage.bind(this,index)}
                                    >
                                        {index+1}
                                    </Pagination.Item>
                                )
                            }
                            <Pagination.Item
                                onClick={this.handleNextPage.bind(this)}
                            >
                                &gt;
                            </Pagination.Item>
                        </Pagination>
                    </div>




                </div>
            </div>

        );



    }
}



export default withRouter(MyLECs);