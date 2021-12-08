import { TILE_CLICK, NEW_GAME } from '../actions/types';

export default (previousClick=[], action) => {
    switch (action.type) {
        case TILE_CLICK:
            //click goes to empty previousClick
            if (!action.payload.previousClick.length){
                const newPreviousClick = [action.payload.x, action.payload.y];
                return newPreviousClick;
            }
            //same tile click again clears previousClick
            else if (action.payload.previousClick[0] === action.payload.x && action.payload.previousClick[1] === action.payload.y){
                return [];
            }
            else {
                return [];
            }
        case NEW_GAME:
            return [];
        default:
            return previousClick;
    }
}