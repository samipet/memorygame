import { combineReducers } from 'redux';
import boardSizeReducer from './boardSizeReducer';
import boardReducer from './boardReducer';
import clickReducer from './clickReducer';
import previousClickReducer from './previousClickReducer';
import crushReducer from './crushReducer';
import imageProviderReducer from './imageProviderReducer';
import imagesLoadedReducer from './imagesLoadedReducer';
import coverReducer from './coverReducer';
import coverBoardReducer from './coverBoardReducer';
import victoryReducer from './victoryReducer';
import allowImagesReducer from './allowImagesReducer';
import rejectedImagesReducer from './rejectedImagesReducer';

export default combineReducers({
    imageProvider: imageProviderReducer,
    boardSize: boardSizeReducer,
    board: boardReducer,
    click: clickReducer,
    previousClick: previousClickReducer,
    crush: crushReducer,
    imagesLoaded: imagesLoadedReducer,
    cover: coverReducer,
    coverBoard: coverBoardReducer,
    victory: victoryReducer,
    allowImages: allowImagesReducer,
    rejectedImages: rejectedImagesReducer
});