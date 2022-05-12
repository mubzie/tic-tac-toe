//target html gameboard DOM
const boards = document.querySelectorAll(".cell");

const gameModule = (() => {

const boardgame = new Array(9).fill("x")

const gameBoardDisplay = () => {
    boards.forEach((board) => {
        console.log(board)
        board.textContent = boardgame[board.id]
        console.log(board.id)
    })
}
return{
    gameBoardDisplay
}
})();

console.log(gameModule.gameBoardDisplay())
// console.log(gameModule)
