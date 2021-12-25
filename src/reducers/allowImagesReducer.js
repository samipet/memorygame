import { NEW_GAME, ALLOW_IMAGES, CLEAR_BOARD } from '../actions/types';

export default (allowImages = false, action) => {
    switch (action.type) {
        case NEW_GAME:
            return false;
        case CLEAR_BOARD:
            return false;
        case ALLOW_IMAGES:
            return true;
        default:
            return allowImages;
    }
}