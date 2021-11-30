import { NEW_GAME, TILE_CLICK, CRUSH_TILES } from '../actions/types';

export default (crush=false, action) => {
    switch (action.type) {
        case NEW_GAME:
            return false;
        case TILE_CLICK:
            let newBoard = action.payload.board.flat(2);
            if (newBoard.some((element) => element === "crush")) {
                return true;
            }
            else {
                return false;
            }
        case CRUSH_TILES:
            return false;
        default:
            return crush;
    }
}