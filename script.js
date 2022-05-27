  // DOM selection
  const gameBoard = document.querySelector("#gameboard-container");
  const cells = document.querySelectorAll(".cell");

//player factory function
const Player = (name, marker) => {
    const getMark = () => marker;
    const getName = () => name;
    return{
        getMark,
        getName
    }
 };


//The game module 
const gameModule = (() => {
let _board = new Array(9).fill("");

const getBoard = () => {
    return [..._board];
}

const BoardDisplay = () => {
    let displayBoard = getBoard();
    for (let i = 0; i <= cells.length - 1; i++) {
        cells[i].textContent = displayBoard[i];
        
    }
}

const placeMarker = (index, marker) => {
    // if(_board !== "") {
    //     _board[index] = marker;
    // }
_board[index] = marker;
BoardDisplay();
// switchPlayerTurn();
}

const boardReset = () => {
    _board = new Array(9).fill("");
}

const checkWin = (marker) => {
    const winCondition = [[0,1,2],[3,4,5],
                         [6,7,8], [0,3,6],
                         [1,4,7],[2,5,8],
                         [0,4,8],[2,4,6]];

    winCondition.forEach(condition => {
        if(_board[condition[0]] === marker && _board[condition[1]] === marker && _board[condition[2]] === marker) {
            // return true;
            console.log('yur');
            return true;
        }
    })                  
};


return{
    getBoard,
    placeMarker,
    boardReset,
    BoardDisplay,
    checkWin
}
})();
// console.log(gameModule.getBoard())

//the module that handles the flow of the game
const game = (() => {
    //players
    const player1 = Player("you", "X");
    const player2 = Player("computer", "O");

    let currentPlayer = player1;

    const switchPlayerTurn = () => {
        if(currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    let turnsPlayed = 0;

    const gamePlay = (e) => {
    turnsPlayed++

    let index = Array.prototype.indexOf.call(gameBoard.children, e.target)
    gameModule.placeMarker(index, currentPlayer.getMark())

    switchPlayerTurn();
    }

    gameBoard.addEventListener('click', gamePlay)

   return{
       turnsPlayed,
    //    switchPlayerTurn,
       currentPlayer,
   }
})();

//    boards.forEach((board, index) => {
//        board.addEventListener('click', () => {
//         gameModule._board[index] = currentPlayer;
//        console.log(gameModule._board)
       
//         //    alert('bro')
//        })
//    });

// const gameBoardDisplay = () => {
//     boards.forEach( (index, board) => {
//         console.log(board)
//         board.textContent = _board[index]
//         console.log(board.id)
//         console.log(index)
//     })
// }
