import React from 'react';
import NavBar from '../NavBar/NavBar';
import logo from '../images/Welcome.png';
import {Row, Col }from 'react-bootstrap';
import './Home.css';

const Home = () => {
    return(
        <div className="HomePage">
            <NavBar />
            <div id="background" style={headerStyle}>
                <div className="container">
                    <div className="text">
                        <h2 className="header">Welcome</h2>
                        <Row>
                            <p className="paragraph">
                                Y-Change is a social and systemic change platform for young people aged 18 to 30 with lived experiences of socioeconomic disadvantage. As Lived Experience Consultants, the team work to challenge the thinking and practices of social systems through advocacy and leadership.
                            </p>
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

export default Home;