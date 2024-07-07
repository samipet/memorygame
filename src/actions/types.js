export const CHANGE_IMAGE_PROVIDER = 'CHANGE_IMAGE_PROVIDER';
export const CHANGE_BOARD_SIZE = 'CHANGE_BOARD_SIZE';
export const CHANGE_BOARD = 'CHANGE_BOARD';
export const TILE_CLICK = 'TILE_CLICK';
export const NEW_GAME = 'NEW_GAME';
export const CRUSH_TILES = 'CRUSH_TILES';
export const IMAGE_LOADED = 'IMAGE_LOADED';
export const CHANGE_COVER = 'CHANGE_COVER';
export const CHANGE_HINT = 'CHANGE_HINT';
export const RESET_HINT = 'RESET_HINT';
export const SET_VICTORY = 'SET_VICTORY';
export const CLEAR_BOARD = 'CLEAR_BOARD';
export const ALLOW_IMAGES = 'ALLOW_IMAGES';
export const REJECT_IMAGE = 'REJECT_IMAGE';
export const ADD_IMAGES = 'ADD_IMAGES';
export const REMOVE_REJECTED_IMAGES = 'REMOVE_REJECTED_IMAGES';

export const IMAGES_AVAILABLE = [0, 1694, 1000, 123, 119, 18210, 67];
export const IMAGE_PROVIDER = 1;

//To prevent miscalculating loaded images there is reject time for already cached images. Later checking if these rejected images truly are top images and should be calculated.
export const IMAGE_REJECT_TIME = 100;
export const IMAGE_ADD_TIME = 3000;
export const IMAGE_ADD_TIME2 = 8000;

export const boardSizeX = 4; //4, 5, 6, 8 and 10 supported
export const boardSizeY = 3; //3, 4 and 5 supported
export const boardSizeZ = 2;

export const tileCrushDelay = 300;
