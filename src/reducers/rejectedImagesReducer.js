import { NEW_GAME, REJECT_IMAGE, REMOVE_REJECTED_IMAGES } from '../actions/types';

export default (rejectedImages=[], action) => {
    switch (action.type) {
        case NEW_GAME:
            return [];
        case REJECT_IMAGE:
            let images = [...rejectedImages];
            images.push(action.payload.image);
            return images;
        case REMOVE_REJECTED_IMAGES:
            let images2 = [...rejectedImages];
            images2 = images2.filter(image => !action.payload.images.includes(image));
            return images2;
        default:
            return rejectedImages;
    }
}