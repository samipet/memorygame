import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button, Progress } from 'reactstrap';
import Tile from './tile';
import boardStyle from './gamePage.module.css';
import gameBackground from '../assets/gameBackground.JPG';
import loadingImages from '../assets/loading_images.jpg';
import loadingCats from '../assets/loading_cats.jpg';
import loadingFoxes from '../assets/loading_foxes.jpg';
import fireworks from '../assets/victory.gif';
import { tileClick, newGame, setVictory, clearBoard, allowImages, addRejectedImages, removeRejectedImages, hint, resetHint } from '../actions';
import { IMAGE_REJECT_TIME, IMAGE_ADD_TIME, IMAGE_ADD_TIME2 } from '../actions/types';

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
            } while (requests.length !== (this.props.boardSize[0] * this.props.boardSize[1] * this.props.boardSize[2])/2 - images.length);
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
        } while (images.length !== (this.props.boardSize[0] * this.props.boardSize[1] * this.props.boardSize[2])/2);
        return images;
    }

    getDogs = async () => {
        let dogs = [];
        let responses = [];
        do {
            responses = await axios.get(`https://dog.ceo/api/breeds/image/random/` + ((this.props.boardSize[0] * this.props.boardSize[1] * this.props.boardSize[2])/2 - dogs.length)).then(res => {
                return res.data.message;
            })
            dogs.push(...responses.filter(image => !dogs.includes(image)));
        } while (dogs.length !== (this.props.boardSize[0] * this.props.boardSize[1] * this.props.boardSize[2])/2);
        const images = this.preloadImages(dogs);
        console.log("preloadImages: ", images);
        this.props.newGame(dogs, this.props.boardSize);
        setTimeout (() => {
            this.props.allowImages();
        }, IMAGE_REJECT_TIME);
    }

    getDogs2 = async () => {
        let dogs = [];
        let response = "";
        do {
            response = await axios.get(`https://random.dog/woof.json`).then(res => {
                return res.data.url;
            })
            if (response.toLowerCase().endsWith(".jpg") && !dogs.includes(response)) {
                dogs.push(response);
            }
        } while (dogs.length !== (this.props.boardSize[0] * this.props.boardSize[1] * this.props.boardSize[2])/2);
        const images = this.preloadImages(dogs);
        console.log("preloadImages: ", images);
        this.props.newGame(dogs, this.props.boardSize);
        setTimeout (() => {
            this.props.allowImages();
        }, IMAGE_REJECT_TIME);
    }

    componentDidMount() {
        //1694 images available
        if(this.props.imageProvider === 1) {
            axios.get(`https://cataas.com/api/cats?json=true&limit=` + (this.props.boardSize[0] * this.props.boardSize[1] * this.props.boardSize[2])/2)
            .then(res => {
                let cats = res.data.map(cat => cat._id);
                let preloadUrls = [];
                preloadUrls = cats.map(cat => 'https://cataas.com/cat/' + cat);
                const images = this.preloadImages(preloadUrls);
                console.log("preloadImages: ", images);
                this.props.newGame(cats, this.props.boardSize);
                setTimeout (() => {
                    this.props.allowImages();
                }, IMAGE_REJECT_TIME);
            })
        }
        //1000 images available
        if(this.props.imageProvider === 2) {
            this.getDogs2();
        }
        //123 images available
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
            } while (foxes.length !== (this.props.boardSize[0] * this.props.boardSize[1] * this.props.boardSize[2])/2)
            const images = this.preloadImages(foxes);
            console.log("preloadImages: ", images);
            this.props.newGame(foxes, this.props.boardSize);
            setTimeout (() => {
                this.props.allowImages();
            }, IMAGE_REJECT_TIME);
        }
        //119 images available
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
            } while (ducks.length !== (this.props.boardSize[0] * this.props.boardSize[1] * this.props.boardSize[2])/2)
            const images = this.preloadImages(ducks);
            console.log("preloadImages: ", images);
            this.props.newGame(ducks, this.props.boardSize);
            setTimeout (() => {
                this.props.allowImages();
            }, IMAGE_REJECT_TIME);
        }
        //18210 images available
        if(this.props.imageProvider === 5) {
            this.getDogs();
        }
        //67 images available
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
            } while (cats.length !== (this.props.boardSize[0] * this.props.boardSize[1] * this.props.boardSize[2])/2)
            const images = this.preloadImages(cats);
            console.log("preloadImages: ", images);
            this.props.newGame(cats, this.props.boardSize);
            setTimeout (() => {
                this.props.allowImages();
            }, IMAGE_REJECT_TIME);
        }
        //adding rejected images
        setTimeout(() => {
            let count = 0;
            let image = "";
            let topImages = [];
            let foundImages = [];
            let rejected = (this.props.rejectedImages) ? [...this.props.rejectedImages] : [];
            for (let i=0; i<this.props.boardSize[0]; i++) {
                for (let j=0; j<this.props.boardSize[1]; j++) {
                    topImages.push(this.props.board[i][j][0]);
                }
            }
            while (topImages.length) {
                image = topImages.pop();
                if (rejected.includes(image)) {
                    foundImages.push(image);
                    count++;
                }
            }
            this.props.addRejectedImages(count);
            this.props.removeRejectedImages(foundImages);
        }, IMAGE_ADD_TIME);
        setTimeout(() => {
            let count = 0;
            let image = "";
            let topImages = [];
            let foundImages = [];
            let rejected = (this.props.rejectedImages) ? [...this.props.rejectedImages] : [];
            for (let i=0; i<this.props.boardSize[0]; i++) {
                for (let j=0; j<this.props.boardSize[1]; j++) {
                    topImages.push(this.props.board[i][j][0]);
                }
            }
            while (topImages.length) {
                image = topImages.pop();
                if (rejected.includes(image)) {
                    foundImages.push(image);
                    count++;
                }
            }
            this.props.addRejectedImages(count);
            this.props.removeRejectedImages(foundImages);
        }, IMAGE_ADD_TIME2);
    }

    toMainMenu () {
        this.props.clearBoard(this.props);
        this.props.resetHint();
        this.props.history.push("/");      
    }

    hintButtonPress () {
        this.props.hint(this.props);
    }

    componentDidUpdate(prevProps) {
        let victory = !this.props.board.flat(2).some(element => element !== "empty");
        if (victory) {
            this.props.setVictory();
        }
    }

    loadingTexts() {
        switch (this.props.imageProvider) {
            case 1: case 6:
                if (this.props.imagesLoaded < this.props.boardSize[0] * this.props.boardSize[1] / 4) {
                    return "Cats are ignoring You.";
                }
                else if (this.props.imagesLoaded < this.props.boardSize[0] * this.props.boardSize[1] / 2) {
                    return "Cats deciding whether to be inside or outside.";
                }
                else if (this.props.imagesLoaded < this.props.boardSize[0] * this.props.boardSize[1] * 3 / 4) {
                    return "Nap attacks happening.";
                }
                else if (this.props.imagesLoaded >= this.props.boardSize[0] * this.props.boardSize[1] * 3 / 4){
                    return "Opening tuna cans.";
                }
            default:
                return "Loading Images";
        }
    }

    loadingImages() {
        switch (this.props.imageProvider) {
            case 1: case 6:
                return loadingCats;
            case 3:
                return loadingFoxes;
            default:
                return loadingImages;
        }
    }

    getMiddleColumnMiddleStyle(style) {
        switch (style) {
            case 3:
                return boardStyle.middlecolumnmiddle3;
            case 4:
                return boardStyle.middlecolumnmiddle4;
            case 5:
                return boardStyle.middlecolumnmiddle5;
            default:
                return boardStyle.middlecolumnmiddle3;
        }
    }

    render() {
        
        return (
            <Row id={boardStyle.gamearea}>
                <img className={boardStyle.background} src={gameBackground} alt="background"/>
                <Col className={boardStyle.leftcolumn}>
                    <Button disabled={this.props.imagesLoaded < this.props.boardSize[0] * this.props.boardSize[1]} className={boardStyle.hintbutton} onClick={() => this.hintButtonPress()} color="warning" >Hint</Button>
                </Col>
                <Col className={boardStyle.middlecolumn}>
                    <div className={boardStyle.middlecolumntop}></div>                    
                    <div className={this.getMiddleColumnMiddleStyle(this.props.boardSize[1])}>
                        <a className={((this.props.imagesLoaded < this.props.boardSize[0] * this.props.boardSize[1]) ? boardStyle.loadingimages : boardStyle.loadingdone)}>                        
                            <div className={((this.props.imagesLoaded < this.props.boardSize[0] * this.props.boardSize[1]) ? boardStyle.progress : boardStyle.progressdone)}>
                                <h2 className="text-center">{this.loadingTexts()}</h2>
                                <Progress value={Math.floor(this.props.imagesLoaded / (this.props.boardSize[0] * this.props.boardSize[1]) * 100)}></Progress>
                            </div>
                            <img className={((this.props.imagesLoaded < this.props.boardSize[0] * this.props.boardSize[1]) ? boardStyle.loadingimages : boardStyle.loadingdone)} src={this.loadingImages()} alt="loadingImages"/>
                        </a>
                        <a className={((this.props.victory) ? boardStyle.victory : boardStyle.notvictory)}>                        
                            <img className={((this.props.victory && this.props.imagesLoaded >= this.props.boardSize[0] * this.props.boardSize[1]) ? boardStyle.victory : boardStyle.notvictory)} src={fireworks} alt="fireworks"/>
                            <h2 className="text-center">Victory!</h2>
                        </a>
                        {this.renderBoard()}
                    </div>                    
                    <div className={boardStyle.middlecolumnbottom}></div>
                </Col>
                <Col className={boardStyle.rightcolumn}>
                    <Button className={boardStyle.mainmenubutton} onClick={() => this.toMainMenu()} color="success">Main Menu</Button>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        boardSize: state.boardSize,
        board: state.board,
        imageProvider: state.imageProvider,
        imagesLoaded: state.imagesLoaded,
        victory: state.victory,
        rejectedImages: state.rejectedImages
    }
}

export default withRouter(connect(mapStateToProps, { tileClick: tileClick, newGame: newGame, setVictory: setVictory, clearBoard: clearBoard, allowImages: allowImages, addRejectedImages: addRejectedImages, removeRejectedImages: removeRejectedImages, hint: hint, resetHint: resetHint })(GamePage));