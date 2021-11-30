import { TILE_CLICK, NEW_GAME } from '../actions/types';

export default (click=[], action) => {
    switch (action.type) {       
        case TILE_CLICK:
            if (action.payload.previousClick.length) {
                if (action.payload.previousClick[0] === action.payload.x && action.payload.previousClick[1] === action.payload.y){
                    return [];
                }
                else {
                    return [action.payload.x, action.payload.y];
                }
            }
            else {
                return [];
            }
        case NEW_GAME:
            return [];
        default:
            return click;
    }
}