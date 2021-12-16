import { CHANGE_BOARD_SIZE, boardSizeX, boardSizeY, boardSizeZ } from '../actions/types';

export default (boardSize=[boardSizeX, boardSizeY, boardSizeZ], action) => {
    switch (action.type) {
        case CHANGE_BOARD_SIZE:
            return action.payload.boardSize;
        default:
            return boardSize;
    }
}