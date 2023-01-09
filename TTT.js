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
        setMarker,
        setName,
        getName,
        getMarker
    }
}

const player1 = playerFactory('human', 'x')
const player2 = playerFactory('comp', 'o')

const gameBoardModule = (() => {

    let _board = new Array(9).fill('');

    const getBoard = () => {
        return [..._board]
    }

    const resetBoard = () => {
        _board = new Array(9).fill('');
        console.log(_board)
    }

    const placeMarker = (index, marker) => {
        _board[index] = marker;
        console.log(_board)
    }

    resetBoard()

    placeMarker(0, player1.getMarker())
    placeMarker(4, player1.getMarker())
    placeMarker(8, player1.getMarker())

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

    checkForWin(_board)
    
    
    return {
        getBoard,
        resetBoard,
        placeMarker,
        checkForWin
    }

})();