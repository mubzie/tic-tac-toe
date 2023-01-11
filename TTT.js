const cells = document.querySelectorAll('.cell');

const playerFactory = (name, marker) =>  {

    const setName = (newName) => {
        name = newName;
    }

    const setMarker = (newMarker) => {
        marker = newMarker;
    }

    const getName = () => { return name }
    const getMarker = () => { return marker }

    return {
        getMarker
    }
}


const gameBoardModule = (() => {

    let _board = new Array(9).fill('');

    const getBoard = () => {
        return [..._board]
    }

    const resetBoard = () => {
        _board = new Array(9).fill('');
    }

    const boardDisplay = () => {
        let displayBoard = getBoard();
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = displayBoard[i];
        }
    }

    const placeMarker = (index, marker) => {
       if (_board[index] === '') {
        _board[index] = marker;
       }
       boardDisplay()
    }

    const checkForWin = (board) => {

        let winner;

        const winConditions = [
        [ board[0], board[1], board[2] ], 
        [ board[3], board[4], board[5] ],
        [ board[6], board[7], board[8] ],
        [ board[0], board[3], board[6] ],
        [ board[1], board[4], board[7] ],
        [ board[2], board[5], board[8] ],
        [ board[0], board[4], board[8] ],
        [ board[2], board[4], board[6] ]
        ];
        
        const checWinX = winConditions.find(
            condition => condition.every( 
                combo => combo === 'x'
            )
        );
        
        const checWinO = winConditions.find(
            condition => condition.every( 
                combo => combo === 'o'
            )
        );

        if(checWinX || checWinO) {
            winner = true
        } else {
            winner = false
        }

        return winner
        
    }
    
    return {
        getBoard,
        resetBoard,
        placeMarker,
        checkForWin,
        boardDisplay
    }

})();

const gamePlay = (() => {

    // targeting the DOM 
    const displayScreen = document.querySelector('.display-area');
    const resetBtn = document.querySelector('.reset-btn');
    
    displayScreen.textContent = 'click on the gameboard to start the game';
    
    // instantiating the playerFactory function 
    const player1 = playerFactory('player1', 'x');
    const player2 = playerFactory('player2', 'o');
    
    let currentPlayer = player1;
    
    // the function track the current player status during the game play
    const switchPlayer = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    };
    
    // setting turns played by players to 0 to track the game play
    let turnsPlayed = 0;


    const turnDisplay = () => {
        if (currentPlayer === player1) {
            displayScreen.textContent = `it is player ${player2.getMarker()}'s turn`
        } else if (currentPlayer === player2) {
            displayScreen.textContent = `it is player ${player1.getMarker()}'s turn`
        }
    }
    
    const play = (e) => {

        turnsPlayed++
        turnDisplay()
        
        gameBoardModule.placeMarker(e.target.id, currentPlayer.getMarker())
        
        if(turnsPlayed > 4 && gameBoardModule.checkForWin(gameBoardModule.getBoard())) {
            winAlert()
            detachAllEvent()
        } else if (turnsPlayed === 9) {
            drawAlert()
        }
        
        detachEvent(e.target)
        switchPlayer()
    }
    
    // game start by clicking on the cells
    cells.forEach( cell => {
        cell.addEventListener('click', play)
    })

    const detachAllEvent = () => {
        cells.forEach(cell => {
            cell.removeEventListener('click', play)
        })
    }

    const winAlert = () =>  {
        displayScreen.textContent = `player ${currentPlayer.getMarker()} wins the game`;
    }

    const drawAlert = () => {
        displayScreen.textContent = 'game ended in a draw';
    }
    
    const detachEvent = (cell) => {
        cell.removeEventListener('click', play);
    }
    

    const  resetGame = () => {

        currentPlayer = player1;
        
        turnsPlayed = 0;

        gameBoardModule.resetBoard();
        gameBoardModule.boardDisplay();

        displayScreen.textContent = 'click on the gameboard to begin';

        cells.forEach( cell => {
            cell.addEventListener('click', play)
        })

    }

    resetBtn.addEventListener('click', resetGame);

})();