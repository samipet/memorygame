import { NEW_GAME, SET_VICTORY } from '../actions/types';

export default (victory = false, action) => {
    switch (action.type) {
        case NEW_GAME:
            return false;
        case SET_VICTORY:
            return true;
        default:
            return victory;
    }
}