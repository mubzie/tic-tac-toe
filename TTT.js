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
        // console.log(_board)
    }

    const placeMarker = (index, marker) => {
        _board[index] = marker;
        console.log(_board)
    }

    resetBoard()


    const checkForWin = (board) => {
    
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

        const checWin = winConditions.find(
            condition => condition.every( 
                combo => combo === 'x'
            )
        );

        if(checWin) {
            console.log('win')
        } else {
            console.log('no win')
        }
        
        
    }
    
    return {
        getBoard,
        resetBoard,
        placeMarker,
        checkForWin
    }

})();

const gamePlay = (() => {

    const player1 = playerFactory('human', 'x');
    const player2 = playerFactory('human2', 'o');

    let currentPlayer = player1;

    const switchPlayer = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2
        } else {
            currentPlayer = player1
        }
    }

    gameBoardModule.placeMarker(0, currentPlayer.getMarker())
    gameBoardModule.getBoard()

    return {
        currentPlayer,
        switchPlayer
    }

})();