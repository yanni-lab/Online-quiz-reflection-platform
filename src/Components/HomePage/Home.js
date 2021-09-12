import React from 'react';
import logo from '../images/Welcome.png';
import supervisor from '../images/supervisor.png';
// import lex from '../images/Lex.png';
import {Row,  Button,CardGroup,Card} from 'react-bootstrap';
import './Home.css';
import Login from '../LoginPage/Login';
import {Link} from 'react-router-dom'


const Home = () => {
    return(
        <div className="HomePage">

            <div id="background" style={headerStyle}>
                <div className="container">
                    <div className="text" >
                        <h2 className="header">Welcome</h2>
                        <Row className="paragraph">
                            <p >
                                Y-Change is a social and systemic change platform for young people aged 18 to 30 with lived experiences of socioeconomic disadvantage. As Lived Experience Consultants, the team work to challenge the thinking and practices of social systems through advocacy and leadership.
                            </p>
                        </Row>
                        <Row>
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
                                        <Button className="homeButton" size="lg" variant="outline-primary">Click here</Button>
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
};

const headerStyle ={
    backgroundImage: `url(${logo})`,
    position: 'absolute',
    width: '100vw',
    height: '100vh'
}

const LoginPage = () => (
    <Login />
);

export default Home;