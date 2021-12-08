import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import startPageStyle from './startPage.module.css';
import startBackground from '../assets/startBackground.jpg';
import { changeImageProvider } from '../actions';
 
class StartPage extends Component {

    render () {
        return (
            <div>
                <img className={startPageStyle.background} src={startBackground} alt="background"/>
                <Container>
                    <Row className="justify-content-center">
                        <h1>Memory Game</h1>
                    </Row>
                    <Row className="justify-content-center">
                        <p>Find image pairs.</p>
                    </Row>
                    <Row className="justify-content-center">
                        <Button onClick={() => {this.props.history.push("/gamepage")}} color="success">Play</Button>
                    </Row>
                    <Col>
                        <Row>
                            Image Provider:
                        </Row>
                        <Row>
                            <label><input type="radio" value="1" checked={this.props.imageProvider === 1} onChange={() => {this.props.changeImageProvider(1)}} name="imageProvider"/> cataas.com </label>
                        </Row>
                        <Row>
                            <label><input type="radio" value="2" checked={this.props.imageProvider === 2} onChange={() => {this.props.changeImageProvider(2)}} name="imageProvider"/> aws.random.cat </label>
                        </Row>
                        <Row>
                            <label><input type="radio" value="3" checked={this.props.imageProvider === 3} onChange={() => {this.props.changeImageProvider(3)}} name="imageProvider"/> randomfox.ca </label>
                        </Row>
                        <Row>
                            <label><input type="radio" value="4" checked={this.props.imageProvider === 4} onChange={() => {this.props.changeImageProvider(4)}} name="imageProvider"/> random-d.uk </label>
                        </Row>
                        <Row>
                            <label><input type="radio" value="5" checked={this.props.imageProvider === 5} onChange={() => {this.props.changeImageProvider(5)}} name="imageProvider"/> dog.ceo </label>
                        </Row>
                        <Row>
                            <label><input type="radio" value="6" checked={this.props.imageProvider === 6} onChange={() => {this.props.changeImageProvider(6)}} name="imageProvider"/> http.cat </label>
                        </Row>
                    </Col>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        imageProvider: state.imageProvider
    }
}

export default withRouter(connect(mapStateToProps, { changeImageProvider: changeImageProvider })(StartPage));