import React, { Component } from 'react';
import { connect } from 'react-redux';
import { crushTiles } from '../actions';
import tileStyle from './tile.module.css';
import { tileCrushDelay } from '../actions/types';

import img_empty from '../assets/empty_tile.png';
import img_crush from '../assets/crushcat.gif';

class Tile extends Component {

    componentDidUpdate(prevProps) {
        if (this.props.crush && (prevProps.image !== this.props.image)) {
            setTimeout(() => {
                this.props.crushTiles(this.props);
            }, tileCrushDelay); 
        }
    }

    render() {
        if (!this.props.image || !this.props.boardSize) {
            return <div>Loading...</div>
        }
        else if (this.props.image === "empty") {
            return (
                <div className={((this.props.boardSize[0] === 4) ? tileStyle.four : tileStyle.eight)} key={this.props.x + " " + this.props.y}>
                    <img className={tileStyle.image} src={img_empty} alt="tile"/>
                </div>
            );            
        }
        else if (this.props.image === "crush") {
            return (
                <div className={((this.props.boardSize[0] === 4) ? tileStyle.four : tileStyle.eight)} key={this.props.x + " " + this.props.y}>
                    <img className={tileStyle.image} src={img_crush} alt="tile"/>
                </div>
            );            
        }  
        return (
            <div className={((this.props.boardSize[0] === 4) ? tileStyle.four : tileStyle.eight)} key={this.props.x + " " + this.props.y} onClick={() => {if(!this.props.fall) {this.props.tileClick(this.props)}}}>
                <img className={tileStyle.image} src={'https://cataas.com/cat/' + this.props.image} alt="tile"/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        boardSize: state.boardSize,
        board: state.board,
        previousClick: state.previousClick,
        crush: state.crush
    }
}
 
export default connect(mapStateToProps, { crushTiles: crushTiles })(Tile);