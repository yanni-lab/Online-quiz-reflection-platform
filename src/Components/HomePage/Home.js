import React from 'react';
import logo from '../images/Welcome.png';
import supervisor from '../images/supervisor.png';
// import lex from '../images/Lex.png';
import {Row,  Button,CardGroup,Card} from 'react-bootstrap';
import './Home.css';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";


class Home extends React.Component {
    constructor(props) {
        super(props);

    }


    render(){
        return(
            <div className="HomePage">

                <div id="background" style={headerStyle}>
                    <div className="container">
                        <div className="text" >
                            <Row className="header">
                                <div >Welcome</div>
                                {/*<div>{this.props.test}</div>*/}
                            </Row>
                            <Row className="paragraph">
                                <p >
                                    Y-Change is a social and systemic change platform for young people aged 18 to 30 with lived experiences of socioeconomic disadvantage. As Lived Experience Consultants, the team work to challenge the thinking and practices of social systems through advocacy and leadership.
                                </p>
                            </Row>
                            <Row className="roleContent">
                                <CardGroup>
                                    <Card className="cardRole" style={{ width: '18rem'}}>
                                        <Card.Img className="cardimg" variant="top" src={supervisor}/>
                                        <Card.Body>
                                            <Card.Title>LEC</Card.Title>
                                            <Card.Text>
                                                I am a person with lived experience.
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Link to='/listQuiz'>
                                                <Button className="homeButton"
                                                        size="lg"
                                                        variant="outline-primary"
                                                        onClick={this.props.setPare}

                                                >Click here</Button>
                                            </Link>
                                        </Card.Footer>
                                    </Card>
                                    <Card className="cardRole" style={{ width: '18rem'}}>
                                        <Card.Img className="cardimg" variant="top" src={supervisor} />
                                        <Card.Body>
                                            <Card.Title>Supervisor</Card.Title>
                                            <Card.Text>
                                                I am supervisor.
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Link to='/login'>
                                                <Button className="homeButton"
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
                </div>
            </div>
        );
    }

};

const headerStyle ={
    backgroundImage: `url(${logo})`,
    position: 'absolute',
    width: '100vw',
    height: '100vh'
}


export default withRouter(Home);