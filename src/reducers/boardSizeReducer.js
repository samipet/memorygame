import { CHANGE_BOARD_SIZE, boardSizeX, boardSizeY } from '../actions/types';

export default (boardSize=[boardSizeX, boardSizeY], action) => {
    switch (action.type) {
        case CHANGE_BOARD_SIZE:
            //not used
            return boardSize;
        default:
            return boardSize;
    }
}