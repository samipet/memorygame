import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import Tile from './tile';
import boardStyle from './gamePage.module.css';
import { tileClick, newGame } from '../actions';
import { boardSizeX, boardSizeY, boardSizeZ } from '../actions/types';

 
class GamePage extends Component {

    preloadImage(url){
        const img = new Image();
        img.src = url;
        return img
    }
      
    preloadImages(urls) {
        const images = [];
        for (let i = 0; i < urls.length; i++) {
            images[i] = this.preloadImage(urls[i]);
        }
        return images
    }

    renderBoard() {
        const tileArray = [];

        for (let j=0;j<this.props.boardSize[1];j++) {
            for (let i=0;i<this.props.boardSize[0];i++) {
                tileArray.push({x: i, y: j, image: this.props.board[i][j][0]});  
            }
        }

        return tileArray.map((tile) => {
            return <Tile key={tile.x + " " + tile.y} image={tile.image} x={tile.x} y={tile.y} tileClick={this.props.tileClick}>{tile.x + " " + tile.y}</Tile>
        })
    }

    componentDidMount() {
        axios.get(`https://cataas.com/api/cats?json=true&limit=` + (boardSizeX * boardSizeY * boardSizeZ)/2)
        .then(res => {
            let cats = res.data.map(cat => cat.id);
            let preloadUrls = [];
            preloadUrls = cats.map(cat => 'https://cataas.com/cat/' + cat);
            const images = this.preloadImages(preloadUrls);
            console.log(images);
            this.props.newGame(cats);
        })        
    }

    render() {

        return (
            <Row id={boardStyle.gamearea}>              
                <Col className={boardStyle.leftcolumn}>
                </Col>
                <Col className={boardStyle.middlecolumn}>
                    <div className={boardStyle.middlecolumntop}></div>
                    <div className={boardStyle.middlecolumnmiddle}>{this.renderBoard()}</div>
                    <div className={boardStyle.middlecolumnbottom}></div>
                </Col>
                <Col className={boardStyle.rightcolumn}>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        boardSize: state.boardSize,
        board: state.board
    }
}
 
export default withRouter(connect(mapStateToProps, { tileClick: tileClick, newGame: newGame })(GamePage));