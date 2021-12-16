import { IMAGE_LOADED, NEW_GAME } from '../actions/types';

export default (imagesLoaded=0, action) => {
    switch (action.type) {
        case NEW_GAME:
            return 0;
        case IMAGE_LOADED:
            return imagesLoaded + 1;
        default:
            return imagesLoaded;
    }
}