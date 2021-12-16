import React, { Component } from 'react';
import { connect } from 'react-redux';
import { crushTiles, imageLoaded } from '../actions';
import tileStyle from './tile.module.css';
import { tileCrushDelay } from '../actions/types';

import img_empty from '../assets/empty_tile.png';
import img_crush from '../assets/crushcat.gif';
import img_cover from '../assets/cover.png';

class Tile extends Component {

    componentDidUpdate(prevProps) {
        if (this.props.crush && (prevProps.image !== this.props.image)) {
            setTimeout(() => {
                this.props.crushTiles(this.props);
            }, tileCrushDelay);
        }
    }

    getTileStyle(style) {
        switch (style) {
            case 4:
                return tileStyle.four;
            case 5:
                return tileStyle.five;
            case 6:
                return tileStyle.six;
            case 8:
                return tileStyle.eight;
            case 10:
                return tileStyle.ten;
            default:
                return tileStyle.four;
        }
    }

    render() {
        if (!this.props.image || !this.props.boardSize || this.props.imageLoaded < this.props.boardSize[0] * this.props.boardSize[1]) {
            return <div>Loading...</div>
        }
        else if (this.props.image === "empty") {
            return (
                <div className={this.getTileStyle(this.props.boardSize[0])} key={this.props.x + " " + this.props.y}>
                    <img className={tileStyle.image} src={img_empty} alt="tile"/>
                </div>
            );
        }
        else if (this.props.image === "crush") {
            return (
                <div className={this.getTileStyle(this.props.boardSize[0])} key={this.props.x + " " + this.props.y}>
                    <img className={tileStyle.image} src={img_crush} alt="tile"/>
                </div>
            );
        }
        if (this.props.coverBoard[this.props.x][this.props.y] === 1 && this.props.imagesLoaded >= this.props.boardSize[0] * this.props.boardSize[1] && this.props.cover) {
            return (
                <div className={this.getTileStyle(this.props.boardSize[0])} key={this.props.x + " " + this.props.y} onClick={() => {if(!this.props.fall) {this.props.tileClick(this.props)}}}>
                    <img className={tileStyle.image} src={img_cover} alt="tile"/>
                </div>
            );           
        }
        else if (this.props.imageProvider === 1 ) {
            return (
                <div className={this.getTileStyle(this.props.boardSize[0])} key={this.props.x + " " + this.props.y} onClick={() => {if(!this.props.fall) {this.props.tileClick(this.props)}}}>
                    <img className={tileStyle.image} src={'https://cataas.com/cat/' + this.props.image} alt="tile" onLoad={() => this.props.imageLoaded(this.props)}/>
                </div>
            );
        }
        else if (this.props.imageProvider === 2 || this.props.imageProvider === 3 || this.props.imageProvider === 4 || this.props.imageProvider === 5 || this.props.imageProvider === 6) {
            return (
                <div className={this.getTileStyle(this.props.boardSize[0])} key={this.props.x + " " + this.props.y} onClick={() => {if(!this.props.fall) {this.props.tileClick(this.props)}}}>
                    <img className={tileStyle.image} src={this.props.image} alt="tile" onLoad={() => this.props.imageLoaded(this.props)}/>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        boardSize: state.boardSize,
        board: state.board,
        previousClick: state.previousClick,
        crush: state.crush,
        imageProvider: state.imageProvider,
        imagesLoaded: state.imagesLoaded,
        cover: state.cover,
        coverBoard: state.coverBoard
    }
}

export default connect(mapStateToProps, { crushTiles: crushTiles, imageLoaded: imageLoaded })(Tile);