import { boardSizeX, boardSizeY, CHANGE_BOARD_SIZE, TILE_CLICK, CRUSH_TILES, NEW_GAME } from '../actions/types';

export default (coverBoard = new Array(boardSizeX).fill(1).map(() => new Array(boardSizeY).fill(1)), action) => {
    switch (action.type) {
        case CHANGE_BOARD_SIZE:
            return new Array(action.payload.boardSize[0]).fill(1).map(() => new Array(action.payload.boardSize[1]).fill(1));
        case TILE_CLICK:
            if (action.payload.previousClick.length) {
                if (action.payload.previousClick[0] === action.payload.x && action.payload.previousClick[1] === action.payload.y){
                    return new Array(action.payload.boardSize[0]).fill(1).map(() => new Array(action.payload.boardSize[1]).fill(1));
                }
                else {
                    let coverArray = new Array(action.payload.boardSize[0]).fill(1).map(() => new Array(action.payload.boardSize[1]).fill(1));
                    coverArray[action.payload.x][action.payload.y] = 0;
                    coverArray[action.payload.previousClick[0]][action.payload.previousClick[1]] = 0;
                    return coverArray;
                }
            }
            else {
                let coverArray2 = new Array(action.payload.boardSize[0]).fill(1).map(() => new Array(action.payload.boardSize[1]).fill(1));
                coverArray2[action.payload.x][action.payload.y] = 0;
                return coverArray2;
            }
        case NEW_GAME:
            return new Array(action.payload.boardSize[0]).fill(1).map(() => new Array(action.payload.boardSize[1]).fill(1));
        case CRUSH_TILES:
            return new Array(action.payload.boardSize[0]).fill(1).map(() => new Array(action.payload.boardSize[1]).fill(1));
        default:
            return coverBoard;
    }
}