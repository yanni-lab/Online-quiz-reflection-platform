import React from 'react';
import logo from '../images/Welcome.png';
import supervisor from '../images/supervisor.png';
import lec from '../images/Lex.png';
import {Row, Button, CardGroup, Card} from 'react-bootstrap';
import './Home.css';
import {Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import cookie from 'react-cookies'


class Home extends React.Component {
    constructor(props) {
        super(props);

    }

    handleSelectLEC() {
        cookie.save('identity', 1)
        cookie.save('login', false)
        cookie.save('userId', -1)
        cookie.save('username', "Anonymous")
    }


    render() {
        document.title = "LEx mirror"
        return (
            <div className="HomePage">

                <div id="background" style={headerStyle}>
                    <div className="container">
                        <div className="text">
                            <Row className="home-header">
                                <div>Welcome</div>
                            </Row>
                            <Row className="paragraph">
                                <p>
                                    Y-Change is a social and systemic change platform for young people aged 18 to 30
                                    with lived experiences of socioeconomic disadvantage. As Lived Experience
                                    Consultants, the team work to challenge the thinking and practices of social systems
                                    through advocacy and leadership.
                                </p>
                            </Row>
                            <Row className="roleContent">
                                <CardGroup>
                                    <Link to='/listQuiz'>
                                        <Card className="cardRole"
                                              style={{width: '18rem'}}
                                              onClick={this.handleSelectLEC}
                                        >
                                            <Card.Img className="lec-img" variant="top" src={lec}/>
                                            <Card.Body>
                                                <Card.Title>LEC</Card.Title>

                                            </Card.Body>
                                            <Card.Footer>
                                                <Card.Text>
                                                    I am a person with lived experience.
                                                </Card.Text>
                                            </Card.Footer>
                                            {/*<Card.Footer>*/}
                                            {/*    <Link to='/listQuiz'>*/}
                                            {/*        <Button className="homeButton"*/}
                                            {/*                size="lg"*/}
                                            {/*                variant="outline-primary"*/}
                                            {/*                onClick={this.handleSelectLEC}*/}

                                            {/*        >Click here</Button>*/}
                                            {/*    </Link>*/}
                                            {/*</Card.Footer>*/}
                                        </Card>
                                    </Link>
                                    <Link to='/login'>
                                        <Card className="cardRole" style={{width: '18rem'}}>
                                            <Card.Img className="supervisor-img" variant="top" src={supervisor}/>
                                            <Card.Body>
                                                <Card.Title>Supervisor</Card.Title>

                                            </Card.Body>
                                            <Card.Footer>
                                                {/*<Link to='/login'>*/}
                                                {/*    <Button className="homeButton"*/}
                                                {/*            size="lg"*/}
                                                {/*            variant="outline-primary"*/}
                                                {/*    >Click here</Button>*/}
                                                {/*</Link>*/}
                                                <Card.Text>
                                                    I am supervisor.
                                                </Card.Text>
                                            </Card.Footer>
                                        </Card>
                                    </Link>
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
    // marginRight:0,
    width: '100vw',
    height: '100vh'
}


export default withRouter(Home);