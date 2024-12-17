const prompt = require('prompt-sync')();
let gameBoard = [' ',' ',' ',' ',' ',' ',' ',' ',' ']
let currentPlayer = '🦧'
let gameActive = true;


// printing the game board array as empty matrix
function printBoard(){
    console.log(   `
          ${gameBoard[0]} | ${gameBoard[1]} | ${gameBoard[2]}
          ${gameBoard[3]} | ${gameBoard[4]} | ${gameBoard[5]}
          ${gameBoard[6]} | ${gameBoard[7]} | ${gameBoard[8]}`
    )
}
function handleMove(position){
    if(gameBoard[position] === ' '){
        gameBoard[position] = currentPlayer
    }else{
        console.log('Position is already taken, Choose another one!')
        return(false);
    }

// Here we will be checking if a player has won, and if won then well stop the game with a message
if(checkWin()){
    printBoard();
    console.log(`Player ${currentPlayer} wins!`);
    gameActive = false
    return(true)
}
if(gameBoard.every(cell => cell !== ' ')){
    printBoard();
    console.log("It's A Draw.");
    gameActive = false;
    return(true)
}
// altering the players using ternary operator
currentPlayer = currentPlayer === '🦧' ? '🤖' : '🦧';
return(true);
}
// check win is an array with all the possible index patterns by which a player can win
function checkWin(){
    const conditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    return conditions.some(condition => {
        const [a, b, c] = condition;
        return gameBoard[a] === currentPlayer && gameBoard[b] === currentPlayer && gameBoard[c] === currentPlayer;
      });
}
//creating a loop so that the player can change the values in the array in real time using handle move
while (gameActive) {
    printBoard();
    const position = prompt(`Player ${currentPlayer}, enter your move (0-8): `);
  
    if (position >= 0 && position <= 8) {
      handleMove(parseInt(position));
    } else {
      console.log("Invalid position, enter a number between 0 and 8.");
    }
  }