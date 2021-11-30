import { combineReducers } from 'redux';
import boardSizeReducer from './boardSizeReducer';
import boardReducer from './boardReducer';
import clickReducer from './clickReducer';
import previousClickReducer from './previousClickReducer';
import crushReducer from './crushReducer';

export default combineReducers({
    boardSize: boardSizeReducer,
    board: boardReducer,
    click: clickReducer,
    previousClick: previousClickReducer,
    crush: crushReducer
});