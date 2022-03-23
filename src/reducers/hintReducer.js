import { CHANGE_HINT, RESET_HINT } from '../actions/types';

export default (hint=null, action) => {
    switch (action.type) {
        case CHANGE_HINT:
            let topImages = new Array(action.payload.boardSize[0]).fill("empty").map(() => new Array(action.payload.boardSize[1]).fill("empty"));
            let image = "";
            let images = [];
            let doubleImages = [];
            let hints = [[]];
            hints.pop();
            for (let i=0; i<action.payload.boardSize[0]; i++) {
                for (let j=0; j<action.payload.boardSize[1]; j++) {
                    topImages[i][j] = action.payload.board[i][j][0];
                    if (action.payload.board[i][j][0] !== "empty") {
                        images.push(action.payload.board[i][j][0]);
                    }
                }
            }
            while(images.length) {
                image = images.pop();
                if (images.includes(image)) {
                    doubleImages.push(image);
                }
            }
            for (let i=0; i<action.payload.boardSize[0]; i++) {
                for (let j=0; j<action.payload.boardSize[1]; j++) {
                    if(doubleImages.includes(topImages[i][j])){
                        hints.push([i,j]);
                    }
                }
            }
            if (hints.length) {
                let hint = hints[Math.floor(hints.length*Math.random())];
                return hint;
            }
            return null;
        case RESET_HINT:
            return null;
        default:
            return hint;
    }
}