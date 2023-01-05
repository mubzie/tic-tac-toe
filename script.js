  // DOM selection
  const cells = document.querySelectorAll(".cell");
  const displayArea = document.querySelector(".display-area");
  const ResetBtn = document.querySelector("button");

//player factory function
const Player = (name, marker) => {
    const getMark = () => marker;
    const getName = () => name;
    return{
        getMark,
        getName
    }
 };


//The game module that holds the game functionality
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
    if(_board[index] == "") {
        _board[index] = marker;
        game.turnDisplay()
    }
    BoardDisplay();
}

const boardReset = () => {
    _board = new Array(9).fill("");
}

const checkForWin = () => {

    const winCondition = [[0,1,2],[3,4,5], [6,7,8], [0,3,6], [1,4,7],[2,5,8], [0,4,8],[2,4,6]];

    return winCondition.find( condition => {
        return (_board[condition[0]] && 
        (_board[condition[0]] === _board[condition[1]] && _board[condition[1]] === _board[condition[2]]))
    })
}

return{
    getBoard,
    placeMarker,
    boardReset,
    BoardDisplay,
    checkForWin,
}
})();


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

    const detachEvent = (cell) => {
        cell.removeEventListener('click', gamePlay)
    }

    const detachAllEvent = () => {
    cells.forEach( box => {
        box.removeEventListener('click', gamePlay)
    })
    }

    const winAlert = () => {
        displayArea.textContent = `player ${currentPlayer.getMark()} wins the game`
    }

    const drawAlert = () => {
       displayArea.textContent = "The game ended in a Draw"
    }

    const resetGame = () => {

        gameModule.boardReset();
        gameModule.BoardDisplay();

       turnsPlayed = 0;

       currentPlayer = player1;

       displayArea.textContent = "Start the game by clicking on any of the cells";

       cells.forEach(cell => {
        cell.addEventListener('click', gamePlay);
       })

    }

    displayArea.textContent = "Start the game by clicking on any of the cells";

    let turnsPlayed = 0;

    const turnDisplay = () => {
        if (currentPlayer === player1) {
            displayArea.textContent = `it is player ${player2.getMark()}'s turn`
        } else if (currentPlayer === player2) {
            displayArea.textContent = `it is player ${player1.getMark()}'s turn`
        }
    }

    const gamePlay = (e) => {
       turnsPlayed++
    
       let box = e.target;

       let index = Array.prototype.indexOf.call(cells, box)
       gameModule.placeMarker(index, currentPlayer.getMark())

       if(turnsPlayed > 4 && gameModule.checkForWin()) {
           winAlert();
           detachAllEvent();
        } else if ( turnsPlayed === 9) {
           drawAlert();
       }
    
    detachEvent(box);
    switchPlayerTurn();

    }

    //EventListener that plays the game 
    cells.forEach(cell => {
        cell.addEventListener('click', gamePlay)
    })

    //EventListener that reset the game 
    ResetBtn.addEventListener('click', resetGame)

   return{
       turnsPlayed,
       currentPlayer,
       gamePlay,
       turnDisplay
   }
})();
