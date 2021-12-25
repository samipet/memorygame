import { NEW_GAME, REJECT_IMAGE } from '../actions/types';

export default (rejectedImages=[], action) => {
    switch (action.type) {
        case NEW_GAME:
            return [];
        case REJECT_IMAGE:
            let images = [...rejectedImages];
            images.push(action.payload.image);
            return images;
        default:
            return rejectedImages;
    }
}