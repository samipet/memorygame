import { CHANGE_BOARD_SIZE, boardSizeX, boardSizeY, boardSizeZ } from './types';
import { TILE_CLICK, NEW_GAME, CRUSH_TILES, CHANGE_IMAGE_PROVIDER } from './types';

export const getBoard = (boardSize) => {
    return {
        type: CHANGE_BOARD_SIZE,
        payload: boardSize
    }
}

const createBoard = (images) => {
    let board = new Array(boardSizeX).fill("empty").map(() => new Array(boardSizeY).fill("empty").map(() => new Array(1).fill("empty")));
    images.forEach(element => {
        let i, j = 0;
        let k, l = 0;
        let counter = 2;
        let swap = "";
        let item = [];
        let items = [];
        let swappable = [];
        do {
            i = Math.floor(Math.random() * boardSizeX);
            j = Math.floor(Math.random() * boardSizeY);
            if (board[i][j].length < boardSizeZ + 1) {
                //swap to prevent the last image pair ending on top of each other
                if (board[i][j][0] === element) {
                    for (k=0; k<boardSizeX; k++) {
                        for (l=0; l<boardSizeY; l++) {
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
                            k = Math.floor(Math.random() * boardSizeX);
                            l = Math.floor(Math.random() * boardSizeY);
                        } while (board[k][l][0] === element);
                        board[k][l].unshift(element);
                        counter--;
                    }
                    else {
                        do {
                            k = Math.floor(Math.random() * boardSizeX);
                            l = Math.floor(Math.random() * boardSizeY);
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

export const newGame = (images) => {
    const board = createBoard(images);
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
            board: props.board
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
