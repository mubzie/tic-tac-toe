// const gameBoardDisplay = document.querySelectorAll('cell');
const gameboard = ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x',]


// const gameboard = ['', '', '', '', '', '', '', '', '',]

const cells = document.querySelectorAll(".cell");

const gameBoardDisplay = () => {

    // const gameboard = ['x', 'o', 'x', 'x', 'o', 'x', 'o', 'o', 'x',]
 
    // const cells = document.querySelectorAll(".cell");
    
    cells.forEach((cell) => {
        cell.textContent = gameboard[cell.id]
        // cell.addEventListener('click', () =>{
        //     console.log(cell)
        //     cell.textContent = gameboard[cell.d]
        //     // cell.textContent = gameboard.push(cell.id)
        //     console.log(gameboard)
        // })
    })

}

gameBoardDisplay();


const player = () => {
const marker = x;

}

// const gameBoardModule = (function() {

//     const gameBoardObject = {
//         gameboard: ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x',]
//     }

//     gameBoardDisplay.textContent = gameboard.forEach(board => {
//         console.log(board)
//     });

// })();

// console.log(gameBoard.gameBoardObject) 

// const displayController = (function() {
//     const displayControllerObject = () => {

//     }
// })();

// const Player = (name, marker) => {

// }

// const  playerOne = ('playerOne', 'X');
// const playerTwo = ('playerTwo', 'O');