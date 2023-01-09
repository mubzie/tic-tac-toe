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

    let board = new Array(9).fill('');

    const getBoard = () => {
        return [...board]
    }

    const resetBoard = () => {
        board = new Array(9).fill('');
        console.log(board)
    }

    const placeMarker = (index, marker) => {
        board[index] = marker;
        console.log(board)
    }

    resetBoard()

    placeMarker(0, player1.getMarker())
    placeMarker(1, player1.getMarker())
    placeMarker(2, player1.getMarker())

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
        
        console.log(winConditions[7])

        


    }


    return {
        getBoard,
        resetBoard,
        placeMarker,
        checkForWin
    }

})();