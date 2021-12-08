import { CHANGE_IMAGE_PROVIDER, IMAGE_PROVIDER} from '../actions/types';

export default (imageProvider=IMAGE_PROVIDER, action) => {
    switch (action.type) {
        case CHANGE_IMAGE_PROVIDER:
            return action.payload.imageProvider;
        default:
            return imageProvider;
    }
}