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
        setName,
        setMarker,
        getName,
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
        console.log(displayBoard)
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
        checkForWin
    }

})();

const gamePlay = (() => {

    const displayScreen = document.querySelector('.display-area');

    const player1 = playerFactory('player1', 'x');
    const player2 = playerFactory('player2', 'o');

    let currentPlayer = player1;

    const switchPlayer = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    };

    let playerTurn = 0;

    if(playerTurn === 0) {
        displayScreen.textContent = 'click on the gameboard to begin'
    } 

    // const turnDisplay = () => {
    //     if (currentPlayer === player1) {
    //         displayScreen.textContent = `it is player ${player1.getMarker()}'s turn`
    //     } else if (currentPlayer === player2) {
    //         displayScreen.textContent = `it is player ${player2.getMarker()}'s turn`
    //     }
    // }
    
    const play = (e) => {

        playerTurn++
        
        gameBoardModule.placeMarker(e.target.id, currentPlayer.getMarker())
        
        console.log(playerTurn)
        
        if(playerTurn > 4 && gameBoardModule.checkForWin(gameBoardModule.getBoard())) {
            console.log(`${currentPlayer.getMarker()} wins`)
            displayScreen.textContent = `${currentPlayer.getName()} wins`
            detachAllEvent()
        } 
        
        if (playerTurn === 9) {
            console.log('game ended in draw')
            displayScreen.textContent = 'game ended in a draw'
        }
        
        detachEvent(e.target)
        switchPlayer()
    }
    
    const detachAllEvent = () => {
        cells.forEach(cell => {
            cell.removeEventListener('click', play)
        })
    }
    
    const detachEvent = (cell) => {
        cell.removeEventListener('click', play);
    }
    
    cells.forEach( cell => {
        cell.addEventListener('click', play)
    })

    return {
        currentPlayer,
        switchPlayer
    }

})();