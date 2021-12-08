import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import Tile from './tile';
import boardStyle from './gamePage.module.css';
import gameBackground from '../assets/gameBackground.JPG';
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

    getData = async (url) => {
        let requests = [];
        let responses = [];
        let images = [];
        do {
            requests = [];
            do {
                requests.push(url);
            } while (requests.length !== (boardSizeX * boardSizeY * boardSizeZ)/2 - images.length);
            responses = await Promise.all(requests.map(request => {
                return axios.get(request).then(res => {
                    return res.data.file;
                });
            }))
            responses.forEach(res => {
                if (!images.includes(res)) {
                    images.push(res);
                }
            })
        } while (images.length !== (boardSizeX * boardSizeY * boardSizeZ)/2);
        return images;
    }

    componentDidMount() {
        if(this.props.imageProvider === 1) {
            axios.get(`https://cataas.com/api/cats?json=true&limit=` + (boardSizeX * boardSizeY * boardSizeZ)/2)
            .then(res => {
                let cats = res.data.map(cat => cat.id);
                let preloadUrls = [];
                preloadUrls = cats.map(cat => 'https://cataas.com/cat/' + cat);
                const images = this.preloadImages(preloadUrls);
                console.log("preloadImages: ", images);
                this.props.newGame(cats);
            })
        }
        if(this.props.imageProvider === 2) {
            this.getData(`https://aws.random.cat/meow`).then(images => {
                const preloadImages = this.preloadImages(images);
                console.log("preloadImages: ", preloadImages);
                this.props.newGame(images);
            });
        }
        if(this.props.imageProvider === 3) {
            let foxes = [];
            let i = 0;
            let j = "";
            do {
                i = Math.floor(Math.random() * 123) + 1;
                j = 'https://randomfox.ca/images/' + i + '.jpg';
                if (!foxes.includes(j)) {
                    foxes.push(j);
                }
            } while (foxes.length !== (boardSizeX * boardSizeY * boardSizeZ)/2)
            const images = this.preloadImages(foxes);
            console.log("preloadImages: ", images);
            this.props.newGame(foxes);
        }
        if(this.props.imageProvider === 4) {
            let ducks = [];
            let i = 0;
            let j = "";
            do {
                i = Math.floor(Math.random() * 119) + 1;
                j = 'https://random-d.uk/api/' + i + '.jpg';
                if (!ducks.includes(j)) {
                    ducks.push(j);
                }
            } while (ducks.length !== (boardSizeX * boardSizeY * boardSizeZ)/2)
            const images = this.preloadImages(ducks);
            console.log("preloadImages: ", images);
            this.props.newGame(ducks);
        }
        if(this.props.imageProvider === 5) {
            axios.get(`https://dog.ceo/api/breeds/image/random/` + (boardSizeX * boardSizeY * boardSizeZ)/2)
            .then(res => {
                let dogs = res.data.message;
                const images = this.preloadImages(dogs);
                console.log("preloadImages: ", images);
                this.props.newGame(dogs);
            })
        }
        if(this.props.imageProvider === 6) {
            let codes = [100,101,102,200,201,202,203,204,206,207,300,301,302,303,304,305,307,308,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,420,421,422,423,424,425,426,429,431,444,450,451,497,498,499,500,501,502,503,504,506,507,508,509,510,511,521,523,525,599];
            let cats = [];
            let i = 0;
            let j = "";
            do {
                i = Math.floor(Math.random() * codes.length);
                i = codes[i];
                j = 'https://http.cat/' + i;
                if (!cats.includes(j)) {
                    cats.push(j);
                }
            } while (cats.length !== (boardSizeX * boardSizeY * boardSizeZ)/2)
            const images = this.preloadImages(cats);
            console.log("preloadImages: ", images);
            this.props.newGame(cats);
        }
    }

    render() {
        return (
            <Row id={boardStyle.gamearea}>
                <img className={boardStyle.background} src={gameBackground} alt="background"/>
                <Col className={boardStyle.leftcolumn}>
                </Col>
                <Col className={boardStyle.middlecolumn}>
                    <div className={boardStyle.middlecolumntop}></div>
                    <div className={boardStyle.middlecolumnmiddle}>{this.renderBoard()}</div>
                    <div className={boardStyle.middlecolumnbottom}></div>
                </Col>
                <Col className={boardStyle.rightcolumn}>
                    <Button className={boardStyle.mainmenubutton} onClick={() => {this.props.history.push("/")}} color="success">Main Menu</Button>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        boardSize: state.boardSize,
        board: state.board,
        imageProvider: state.imageProvider
    }
}

export default withRouter(connect(mapStateToProps, { tileClick: tileClick, newGame: newGame })(GamePage));