import React from 'react';
import { withRouter } from 'react-router-dom';
import './ViewComments.css';
import {Row, Col, Button,Form} from 'react-bootstrap';
import {Link} from "react-router-dom";
import view_comment from "../../data/view_comment.json"


class ViewComments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            comments:view_comment.commentList,
            list:new Array(view_comment.commentList.length).fill(0)
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
                list:new Array(this.state.comments.length).fill(0)
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
                            this.state.comments.map((comment,index)=>(
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
                                                                   // rows={this.state.list[index]==1?"":2}
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

                    <div className="box justify-content-center align-items-center">
                        <Link to={{pathname:"./supervisor"}}>
                            <Button className="backButton">Back</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}



export default withRouter(ViewComments);