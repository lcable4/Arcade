//Variables

let turn = 1;

let win = -1;

let grid = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1]
]

let totalClicks = 0

let playerTotals = {
  playerOne: 0,
  playerTwo: 0
}

let person = prompt("Please enter your name", "Name");

//Functions
/*playerMove checks whose turn it is, calculates the win condition
  on every move played, checks for a draw, and adds points to players accordingly
*/

function startGame(){
  if (person != null) {
    document.getElementById('oneTotal').innerHTML = person + "'s" + " Games Won:"
  }
}

function playerMove (element, row, col) {

  if (element.innerHTML != "") return;
  if (win != -1) return;

  //if total clicks is 9 board is filled and it is a draw
  totalClicks ++;

  grid[row][col] = turn;

  if(turn === 1) {
    element.innerHTML = 'X';
    document.getElementById('winningText').innerHTML = "O's turn";
    turn = 2;
  } else if (turn === 2) {
    element.innerHTML = 'O';
    document.getElementById('winningText').innerHTML = "X's turn";
    turn = 1;
  }

  //Checking win conditions
  for (let i = 0; i < 3; i++) {
      
    //rows
      if(grid[i][0] == grid[i][1] && grid[i][1] == grid[i][2] && grid[i][0] != -1) {
        win = grid[i][0];
        break;
      }
  
      //cols
      if(grid[0][i] == grid[1][i] && grid[1][i] == grid[2][i] && grid[0][i] != -1) {
        win = grid[0][i];
        break;
      }
    
    };
    //diagonals
    if(grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2] && grid[0][0] != -1) {
      win = grid[1][1];
    };
    if(grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0] && grid[0][2] != -1) {
      win = grid[1][1];
    };

    //If the game was won this changes the html text to add points
  if(win != -1) {
    if(win == 1) {
      playerTotals.playerOne ++;
      document.getElementById('winningText').innerHTML = person + " has won!";
      document.getElementById('oneTotal').innerHTML = person + "'s " + ` Games Won: ${playerTotals.playerOne}`;
    }
    if(win == 2) {
      playerTotals.playerTwo ++;
      document.getElementById('winningText').innerHTML = "Computer has won!";
      document.getElementById('twoTotal').innerHTML = `Computer Games Won: ${playerTotals.playerTwo}`;
    }
  }
  // Draw condition
  if(totalClicks === 9 && win === -1) {
    document.getElementById('winningText').innerHTML = "It's a draw!";
  }
}

//If restart button gets clicked this function is ran and resets the board
function restart () {
  turn = 1;
  win = -1;
  totalClicks = 0;

  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      grid[i][j] = -1;
    }
  }

  let cells = document.getElementsByClassName('cell');
  for(let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = '';
  }

  document.getElementById('winningText').innerHTML = "X's turn";
}

