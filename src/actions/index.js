import { TILE_CLICK, NEW_GAME, CRUSH_TILES, CHANGE_IMAGE_PROVIDER, IMAGE_LOADED, CHANGE_COVER, CHANGE_BOARD_SIZE, SET_VICTORY } from './types';

const createBoard = (images, boardSize) => {
    let board = new Array(boardSize[0]).fill("empty").map(() => new Array(boardSize[1]).fill("empty").map(() => new Array(1).fill("empty")));
    images.forEach(element => {
        let i, j = 0;
        let k, l = 0;
        let counter = 2;
        let swap = "";
        let item = [];
        let items = [];
        let swappable = [];
        do {
            i = Math.floor(Math.random() * boardSize[0]);
            j = Math.floor(Math.random() * boardSize[1]);
            if (board[i][j].length < boardSize[2] + 1) {
                //swap to prevent the last image pair ending on top of each other
                if (board[i][j][0] === element) {
                    for (k=0; k<boardSize[0]; k++) {
                        for (l=0; l<boardSize[1]; l++) {
                            items.push(board[k][l][0]);
                        }
                    }
                    //only non-unique top images swappable to avoid entanglement
                    do {
                        item = items.shift();
                        if (items.includes(item) && !swappable.includes(item)) {
                            swappable.push(item);
                        }
                    } while (items.length);
                    //in rare case when risk of entanglement of image pairs, depth limit is allowed to exceed vs repopulating board
                    if (!swappable.length) {
                        do {
                            k = Math.floor(Math.random() * boardSize[0]);
                            l = Math.floor(Math.random() * boardSize[1]);
                        } while (board[k][l][0] === element);
                        board[k][l].unshift(element);
                        counter--;
                    }
                    else {
                        do {
                            k = Math.floor(Math.random() * boardSize[0]);
                            l = Math.floor(Math.random() * boardSize[1]);
                            swap = board[k][l][0];
                        } while(!swappable.includes(swap) && swap !== "empty");
                        if (swap === "empty") {
                            board[k][l].unshift(element);
                            counter--;
                        }
                    else {
                        board[i][j].unshift(swap);
                        board[k][l][0] = element;
                        counter--;
                        }
                    }
                }
                else {
                    board[i][j].unshift(element);
                    counter--;
                }
            }
        } while(counter);
    });
    return board;
}

export const newGame = (images, boardSize) => {
    const board = createBoard(images, boardSize);
    return {
        type: NEW_GAME,
        payload: {
            board: board
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
