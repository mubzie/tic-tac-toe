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

    const checkForWin = () => {

    }

    return {
        getBoard,
        resetBoard,
        placeMarker
    }

})();