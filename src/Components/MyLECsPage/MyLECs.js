import React from 'react';
import { withRouter } from 'react-router-dom';
import './MyLECs.css';
import {Row, Col, Button,Form, Pagination} from 'react-bootstrap';
import {Link} from "react-router-dom";
import result from "../../data/get_supervisor_result.json"


class MyLECs extends React.Component {
    constructor(props){
        super(props);



        this.state = {
            username:props.username,
            // results:result.supervisorResult,
            pages:[

            ],
            active:0,
        };



        while(result.supervisorResult.length!=0){
            this.state.pages.push(result.supervisorResult.splice(0,4))
        }

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
                                                        quiz_title:result.quiz_title
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

        );



    }
}



export default withRouter(MyLECs);