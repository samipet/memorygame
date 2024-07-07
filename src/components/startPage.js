import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import startPageStyle from './startPage.module.css';
import startBackground from '../assets/startBackground.jpg';
import { changeBoardSize, changeCover, changeImageProvider } from '../actions';
import { IMAGES_AVAILABLE } from '../actions/types';
 
class StartPage extends Component {

    warningMessage () {
        return <div className={startPageStyle.warningmessage}> Not enough images! </div>
    }
    warningMessage2 () {
        return <div className={startPageStyle.warningmessage}> At least one of the board dimensions has to be even! </div>
    }

    newBoardSizeX (value) {
        let newBoardSize = [...this.props.boardSize];
        newBoardSize[0] = value;
        return newBoardSize;
    }

    newBoardSizeY (value) {
        let newBoardSize = [...this.props.boardSize];
        newBoardSize[1] = value;
        return newBoardSize;
    }

    newBoardSizeZ (value) {
        let newBoardSize = [...this.props.boardSize];
        newBoardSize[2] = value;
        return newBoardSize;
    }

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
                        <Button disabled={(this.props.boardSize[0]*this.props.boardSize[1]*this.props.boardSize[2]) % 2 || IMAGES_AVAILABLE[this.props.imageProvider] < this.props.boardSize[0]*this.props.boardSize[1]*this.props.boardSize[2]/2} onClick={() => {this.props.history.push("/gamepage")}} color="success">Play</Button>
                    </Row>
                    <Row className="justify-content-center">
                        {(this.props.boardSize[0]*this.props.boardSize[1]*this.props.boardSize[2] % 2) ? this.warningMessage2() : <div className={startPageStyle.hidden}>empty row</div>}
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <h2> Image Provider:</h2>
                            </Row>
                            <Row>
                                <label><input type="radio" value="1" checked={this.props.imageProvider === 1} disabled={(this.props.boardSize[0]*this.props.boardSize[1]*this.props.boardSize[2]/2 > IMAGES_AVAILABLE[1]) ? true : false} onChange={() => {this.props.changeImageProvider(1)}} name="imageProvider"/> cataas.com {(this.props.boardSize[0]*this.props.boardSize[1]*this.props.boardSize[2]/2 > 740) ? this.warningMessage() : ""} </label>
                            </Row>
                            <Row>
                                <label><input type="radio" value="2" checked={this.props.imageProvider === 2} disabled={(this.props.boardSize[0]*this.props.boardSize[1]*this.props.boardSize[2]/2 > IMAGES_AVAILABLE[2]) ? true : false} onChange={() => {this.props.changeImageProvider(2)}} name="imageProvider"/> random.dog {(this.props.boardSize[0]*this.props.boardSize[1]*this.props.boardSize[2]/2 > 1677) ? this.warningMessage() : ""} </label>
                            </Row>
                            <Row>
                                <label><input type="radio" value="3" checked={this.props.imageProvider === 3} disabled={(this.props.boardSize[0]*this.props.boardSize[1]*this.props.boardSize[2]/2 > IMAGES_AVAILABLE[3]) ? true : false} onChange={() => {this.props.changeImageProvider(3)}} name="imageProvider"/> randomfox.ca {(this.props.boardSize[0]*this.props.boardSize[1]*this.props.boardSize[2]/2 > 123) ? this.warningMessage() : ""} </label>
                            </Row>
                            <Row>
                                <label><input type="radio" value="4" checked={this.props.imageProvider === 4} disabled={(this.props.boardSize[0]*this.props.boardSize[1]*this.props.boardSize[2]/2 > IMAGES_AVAILABLE[4]) ? true : false} onChange={() => {this.props.changeImageProvider(4)}} name="imageProvider"/> random-d.uk {(this.props.boardSize[0]*this.props.boardSize[1]*this.props.boardSize[2]/2 > 119) ? this.warningMessage() : ""} </label>
                            </Row>
                            <Row>
                                <label><input type="radio" value="5" checked={this.props.imageProvider === 5} disabled={(this.props.boardSize[0]*this.props.boardSize[1]*this.props.boardSize[2]/2 > IMAGES_AVAILABLE[5]) ? true : false} onChange={() => {this.props.changeImageProvider(5)}} name="imageProvider"/> dog.ceo {(this.props.boardSize[0]*this.props.boardSize[1]*this.props.boardSize[2]/2 > 20634) ? this.warningMessage() : ""} </label>
                            </Row>
                            <Row>
                                <label><input type="radio" value="6" checked={this.props.imageProvider === 6} disabled={(this.props.boardSize[0]*this.props.boardSize[1]*this.props.boardSize[2]/2 > IMAGES_AVAILABLE[6]) ? true : false} onChange={() => {this.props.changeImageProvider(6)}} name="imageProvider"/> http.cat {(this.props.boardSize[0]*this.props.boardSize[1]*this.props.boardSize[2]/2 > 67) ? this.warningMessage() : ""} </label>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <h2> Cover:</h2>
                            </Row>
                            <Row>
                                <label><input type="radio" value={true} checked={this.props.cover === true} onChange={() => {this.props.changeCover(true)}} name="cover"/> True </label>
                            </Row>
                            <Row>
                                <label><input type="radio" value={false} checked={this.props.cover === false} onChange={() => {this.props.changeCover(false)}} name="cover"/> False </label>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <h2> Board Size:</h2>
                            </Row>
                            <Row>
                                <h4> Width:</h4>
                            </Row>
                            <Row>
                                <label className="radio-inline"> <input type="radio" value="4" checked={this.props.boardSize[0] === 4} onChange={() => {this.props.changeBoardSize(this.newBoardSizeX(4))}} name="boardsizex"/>4</label>
                                <label className="radio-inline"> <input type="radio" value="5" checked={this.props.boardSize[0] === 5} onChange={() => {this.props.changeBoardSize(this.newBoardSizeX(5))}} name="boardsizex"/>5</label>
                                <label className="radio-inline"> <input type="radio" value="6" checked={this.props.boardSize[0] === 6} onChange={() => {this.props.changeBoardSize(this.newBoardSizeX(6))}} name="boardsizex"/>6</label>
                                <label className="radio-inline"> <input type="radio" value="8" checked={this.props.boardSize[0] === 8} onChange={() => {this.props.changeBoardSize(this.newBoardSizeX(8))}} name="boardsizex"/>8</label>
                                <label className="radio-inline"> <input type="radio" value="10" checked={this.props.boardSize[0] === 10} onChange={() => {this.props.changeBoardSize(this.newBoardSizeX(10))}} name="boardsizex"/>10</label>
                            </Row>
                            <Row>
                                <h4> Height:</h4>
                            </Row>                            
                            <Row>
                                <label className="radio-inline"> <input type="radio" value="3" checked={this.props.boardSize[1] === 3} onChange={() => {this.props.changeBoardSize(this.newBoardSizeY(3))}} name="boardsizey"/>3</label>
                                <label className="radio-inline"> <input type="radio" value="4" checked={this.props.boardSize[1] === 4} onChange={() => {this.props.changeBoardSize(this.newBoardSizeY(4))}} name="boardsizey"/>4</label>
                                <label className="radio-inline"> <input type="radio" value="5" checked={this.props.boardSize[1] === 5} onChange={() => {this.props.changeBoardSize(this.newBoardSizeY(5))}} name="boardsizey"/>5</label>
                            </Row>
                            <Row>
                                <h4> Depth:</h4>
                            </Row>
                            <Row>
                                <label className="radio-inline"> <input type="radio" value="1" checked={this.props.boardSize[2] === 1} onChange={() => {this.props.changeBoardSize(this.newBoardSizeZ(1))}} name="boardsizez"/>1</label>
                                <label className="radio-inline"> <input type="radio" value="2" checked={this.props.boardSize[2] === 2} onChange={() => {this.props.changeBoardSize(this.newBoardSizeZ(2))}} name="boardsizez"/>2</label>
                                <label className="radio-inline"> <input type="radio" value="3" checked={this.props.boardSize[2] === 3} onChange={() => {this.props.changeBoardSize(this.newBoardSizeZ(3))}} name="boardsizez"/>3</label>
                                <label className="radio-inline"> <input type="radio" value="4" checked={this.props.boardSize[2] === 4} onChange={() => {this.props.changeBoardSize(this.newBoardSizeZ(4))}} name="boardsizez"/>4</label>
                                <label className="radio-inline"> <input type="radio" value="5" checked={this.props.boardSize[2] === 5} onChange={() => {this.props.changeBoardSize(this.newBoardSizeZ(5))}} name="boardsizez"/>5</label>
                                <label className="radio-inline"> <input type="radio" value="6" checked={this.props.boardSize[2] === 6} onChange={() => {this.props.changeBoardSize(this.newBoardSizeZ(6))}} name="boardsizez"/>6</label>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        imageProvider: state.imageProvider,
        cover: state.cover,
        boardSize: state.boardSize
    }
}

export default withRouter(connect(mapStateToProps, { changeImageProvider: changeImageProvider, changeCover: changeCover, changeBoardSize: changeBoardSize })(StartPage));