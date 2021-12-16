import { NEW_GAME, TILE_CLICK, CRUSH_TILES, CHANGE_BOARD_SIZE } from '../actions/types';
import { boardSizeX, boardSizeY } from '../actions/types';

export default (board = new Array(boardSizeX).fill("empty").map(() => new Array(boardSizeY).fill("empty").map(() => new Array(1).fill("empty"))), action) => {
    switch (action.type) {
        case TILE_CLICK:
            let newBoard = board.map(item => { return [...item]}); //spreading multidimensinal array
            if (action.payload.previousClick.length && !(action.payload.previousClick[0] === action.payload.x && action.payload.previousClick[1] === action.payload.y)) {
                if (newBoard[action.payload.x][action.payload.y][0] === newBoard[action.payload.previousClick[0]][action.payload.previousClick[1]][0]) {
                    newBoard[action.payload.x][action.payload.y][0] = "crush";
                    newBoard[action.payload.previousClick[0]][action.payload.previousClick[1]][0] = "crush";
                    return newBoard;
                }
            }
            return newBoard;
        case CRUSH_TILES:
            let newBoard2 = board.map(item => { return [...item]}); //spreading multidimensinal array
            newBoard2[action.payload.x][action.payload.y].shift();
            return newBoard2;
        case CHANGE_BOARD_SIZE:
            return new Array(action.payload.boardSize[0]).fill("empty").map(() => new Array(action.payload.boardSize[1]).fill("empty").map(() => new Array(1).fill("empty")));
        case NEW_GAME:
            return [...action.payload.board];
        default:
            return board;
    }
}