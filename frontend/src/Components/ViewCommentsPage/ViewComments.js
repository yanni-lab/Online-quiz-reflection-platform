import React from 'react';
import { withRouter } from 'react-router-dom';
import './ViewComments.css';
import {Row, Col, Button, Form, Pagination} from 'react-bootstrap';
import {Link} from "react-router-dom";
import view_comment from "../../data/view_comment.json"


class ViewComments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            active:0,
            comments:view_comment.commentList,
            list:[0,0,0,0],
            pages:[
                [
                    {
                        "comment_time": [
                            2021,
                            9,
                            12,
                            1,
                            53,
                            56
                        ],
                        "comment": "4. This is a test user comment.\n4. This is a test user comment.\n4. This is a test user comment."
                    },
                    {
                        "comment_time": [
                            2021,
                            9,
                            11,
                            1,
                            53,
                            56
                        ],
                        "comment": "3. This is a test user comment.\n3. This is a test user comment.\n3. This is a test user comment."
                    },
                    ,
                    {
                        "comment_time": [
                            2021,
                            9,
                            10,
                            1,
                            53,
                            56
                        ],
                        "comment": "2. This is a test user comment."
                    },
                    {
                        "comment_time": [
                            2021,
                            9,
                            9,
                            1,
                            53,
                            56
                        ],
                        "comment": "1. This is a test user comment."
                    }
                ],
                [{
                    "comment_time": [
                        2021,
                        9,
                        10,
                        1,
                        53,
                        56
                    ],
                    "comment": "2. This is a test user comment."
                },
                    {
                        "comment_time": [
                            2021,
                            9,
                            9,
                            1,
                            53,
                            56
                        ],
                        "comment": "1. This is a test user comment."
                    }
                    ]
            ]
        };

        fetch('http://localhost:8080/result/view_comment',{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({"username": 123})
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            this.setState({
                comments:data["commentList"],
            })
            this.comments=data["commentList"]
            this.pages=[]
            while(this.comments.length!=0){
                this.pages.push(this.comments.splice(0,4))
            }
            this.setState({
                pages:this.pages
            })
            //data from backend
        }).catch(function(error){
            console.log(error)
        })

        this.seeMore=this.seeMore.bind(this)


    };

    seeMore(event){
        this.setState(state => {
            state.list[event.target.value] = 1-state.list[event.target.value];
            return state;
        });
    }


    handlePage= (index) => {
        if(this.state.active!=index){
            this.setState({
                active:index,
                list:[0,0,0,0]
            })
        }

    }

    handlePreviousPage(){
        if(this.state.active!=0){
            this.setState(
            {
                active:this.state.active==0?0:this.state.active-1,
                list:[0,0,0,0]
            }
        )}
    }

    handleNextPage(){
        if(this.state.active!=this.state.pages.length-1){
            this.setState(
                {
                    active:this.state.active+1,
                    list:[0,0,0,0]
                }
            )
        }
    }


    render(){
        document.title = "User Experience Comments"
        return(
            <div className="ViewComments">
                <div className="container">
                    <div className="title">
                        UX Comments
                    </div>
                    <Form>
                        {
                            this.state.pages[this.state.active].map((comment,index)=>(
                                    <Form.Group>
                                        <Row className="comment-row">
                                            <Col xs={10}>

                                                    <Form.Control  as="textarea"
                                                                   value={comment.comment_time.slice(0,3).join("-") + " " + comment.comment_time.slice(3,6).join(":")
                                                                   +"\n"+
                                                                       comment.comment
                                                                   }
                                                                   label="123"
                                                                   readOnly={true}
                                                                   style={{height:this.state.list[index]==1?"200px":"60px"}}

                                                    />

                                            </Col>
                                            <Col xs={2}>
                                                <Button value={index}
                                                        onClick={this.seeMore}
                                                        className="see-more-button"
                                                >
                                                    {this.state.list[index]==1?"See less":"See more"}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                )
                            )
                        }
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

                    <div className="box justify-content-center align-items-center">
                        <Link to={{pathname:"./supervisor"}}>
                            <Button >Back</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}



export default withRouter(ViewComments);