import { CHANGE_COVER } from '../actions/types';

export default (cover = true, action) => {
    switch (action.type) {
        case CHANGE_COVER:
            return action.payload.cover;
        default:
            return cover;
    }
}