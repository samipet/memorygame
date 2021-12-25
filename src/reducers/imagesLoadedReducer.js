import { IMAGE_LOADED, NEW_GAME, CLEAR_BOARD, ADD_IMAGES } from '../actions/types';

export default (imagesLoaded=0, action) => {
    switch (action.type) {
        case NEW_GAME:
            return 0;
        case IMAGE_LOADED:
            return imagesLoaded + 1;
        case ADD_IMAGES:
            return imagesLoaded + action.payload.count;
        case CLEAR_BOARD:
            return 0;
        default:
            return imagesLoaded;
    }
}