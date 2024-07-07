import { TILE_CLICK, NEW_GAME, CRUSH_TILES, CHANGE_IMAGE_PROVIDER, IMAGE_LOADED, CHANGE_COVER, CHANGE_BOARD_SIZE, SET_VICTORY, CLEAR_BOARD, ALLOW_IMAGES, REJECT_IMAGE, ADD_IMAGES, REMOVE_REJECTED_IMAGES, CHANGE_HINT, RESET_HINT, boardSizeZ } from './types';

const createBoard = (images, boardSize) => {
    let board = new Array(boardSize[0]).fill("empty").map(() => new Array(boardSize[1]).fill("empty").map(() => new Array(1).fill("empty")));
    images.forEach((element, imageindex) => {
        let i, j = 0;
        let counter = 2; //images to be added
        let deepestHole = 0; //largest number of missing images for a tile on the board
        for (let m = 0;m<boardSize[0];m++) {
            for (let n = 0;n<boardSize[1];n++) {
                if (boardSize[2] - (board[m][n].length - 1) > deepestHole) {
                    deepestHole = boardSize[2] - (board[m][n].length - 1);

                }
            }
        }
        //add 1. image of the pair
        do {
            i = Math.floor(Math.random() * boardSize[0]);
            j = Math.floor(Math.random() * boardSize[1]);
            //with the last image pairs the tile missing most images will be filled to prevent image entanglement
            if (boardSize[0]*boardSize[1]*boardSize[2]/2 - imageindex === deepestHole && boardSize[2] - (board[i][j].length - 1) < deepestHole) {
                //was not the deepest hole
            }
            //check there is space in z-direction
            else if (board[i][j].length < boardSize[2] + 1) {
                    board[i][j].unshift(element);
                    counter--;
            }
        } while(counter === 2);
        //add 2. image of the pair
        do {
            i = Math.floor(Math.random() * boardSize[0]);
            j = Math.floor(Math.random() * boardSize[1]);
            //check there is space in z-direction and 2. image won't go on top of 1. image
            if (board[i][j].length < boardSize[2] + 1 && board[i][j][0] !== element) {
                    board[i][j].unshift(element);
                    counter--;
            }
        } while(counter === 1);
    });
    return board;
}

export const newGame = (images, boardSize) => {
    const board = createBoard(images, boardSize);
    return {
        type: NEW_GAME,
        payload: {
            board: board,
            boardSize: boardSize
        }
    }
}

export const crushTiles = (props) => {
    return {
        type: CRUSH_TILES,
        payload: {
            x: props.x,
            y: props.y,
            board: props.board,
            boardSize: props.boardSize
        }
    }
}

export const imageLoaded = (props) => {
    return {
        type: IMAGE_LOADED,
        payload: {
            x: props.x,
            y: props.y,
        }
    }
}

export const addRejectedImages = (count) => {
    return {
        type: ADD_IMAGES,
        payload: {
            count: count
        }
    }
}

export const removeRejectedImages = (images) => {
    return {
        type: REMOVE_REJECTED_IMAGES,
        payload: {
            images: images
        }
    }
}

export const clearBoard = (props) => {
    return {
        type: CLEAR_BOARD,
        payload: {
            boardSize: props.boardSize
        }
    }    
}

export const allowImages = () => {
    return {
        type: ALLOW_IMAGES,
        payload: {
        }
    }    
}

export const rejectImage = (image) => {
    return {
        type: REJECT_IMAGE,
        payload: {
            image: image
        }
    }    
}

export const tileClick = (props) => {
    return {
        type: TILE_CLICK,
        payload: {
            x: props.x,
            y: props.y,
            board: props.board,
            boardSize: props.boardSize,
            previousClick: props.previousClick
        }
    }
}

export const changeImageProvider = (value) => {
    return {
        type: CHANGE_IMAGE_PROVIDER,
        payload: {
            imageProvider: value
        }
    }
}

export const changeCover = (value) => {
    return {
        type: CHANGE_COVER,
        payload: {
            cover: value
        }
    }
}

export const changeBoardSize = (value) => {
    return {
        type: CHANGE_BOARD_SIZE,
        payload: {
            boardSize: value
        }
    }
}

export const setVictory = () => {
    return {
        type: SET_VICTORY,
        payload: {
        }
    }
}

export const hint = (props) => {
    return {
        type: CHANGE_HINT,
        payload: {
            boardSize: props.boardSize,
            board: props.board
        }
    }
}

export const resetHint = () => {
    return {
        type: RESET_HINT,
        payload: {
        }
    }
}
