import React from 'react';
import { Container, Row, Button } from 'reactstrap';
import startPageStyle from './startPage.module.css';
import startBackground from '../assets/startBackground.jpg';
 
const StartPage = () => {
    return (
        <div>
            <img className={startPageStyle.background} src={startBackground} alt="background"/>
            <Container>
                <Row className="justify-content-center">
                    <h1>Memory Game</h1>
                </Row>
                <Row className="justify-content-center">
                    <p>Find similar images.</p>
                </Row>
                <Row className="justify-content-center">
                    <Button href="/gamepage" color="success">Play</Button>
                </Row>
            </Container>
        </div>
    );
}
 
export default StartPage;