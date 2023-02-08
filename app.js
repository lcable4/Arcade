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

//Functions

// forces you to enter name before game starts

function startGame(){
  let person = document.getElementById('userInput').value;
  if (!person) {
    alert("Please enter your name");
    return;
  }
  document.getElementById('oneTotal').innerHTML = person + "'s" + " Games Won: " ;

}

//Player move
/*playerMove checks which cell player clicked on and adds an X to that spot*/

function playerMove (element, row, col) {

  let person = document.getElementById('userInput').value;
  if (!person) {
    alert("Please enter your name");
    return;
  }
  
  if (win !== -1) {
    return;
  }

  if(turn === 1 && grid[row][col] === -1) {
    element.innerHTML = 'X';
    grid[row][col] = turn;
    document.getElementById('winningText').innerHTML = "Computer's turn";
    turn = 2;
  }
  checkWin();
  if(turn === 2) {
    computerMove();
  }
}


//Computer move

function computerMove() {

  if (win !== -1) {
    return;
  }
  
  setTimeout(function() {
    // Generate a random number between 0 and 8 to determine which cell the computer will place its O in
    let randomIndex = Math.floor(Math.random() * 9);

    // Check if the cell is empty
    if (grid[Math.floor(randomIndex/3)][randomIndex%3] === -1) {
      // Place the O in the cell
      grid[Math.floor(randomIndex/3)][randomIndex%3] = 2;

      // Update the display
      document.getElementById('cell' + randomIndex).innerHTML = 'O';
    } else {
      // If the cell is not empty, call the function again to try again
      computerMove();
    }
  }, 1500); // The number 1500 is the time in milliseconds to wait before making the computer's move
  document.getElementById('winningText').innerHTML = document.getElementById('userInput').value + "'s" + " turn";
  turn = 1;
  checkWin();
}

function checkWin(){
  
  //if total clicks is 9 board is filled and it is a draw
  totalClicks ++;
  isPointAdded = false;

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
  if(win != -1 && !isPointAdded) {
    isPointAdded = true;
    if(win == 1) {
      playerTotals.playerOne ++;
      document.getElementById('winningText').innerHTML = document.getElementById('userInput').value + " has won!";
      document.getElementById('oneTotal').innerHTML = document.getElementById('userInput').value + "'s " + ` Games Won: ${playerTotals.playerOne}`;
    }
    if(win == 2) {
      playerTotals.playerTwo ++;
      document.getElementById('winningText').innerHTML = "Computer has won!";
      document.getElementById('twoTotal').innerHTML = `Computer Games Won: ${playerTotals.playerTwo}`;
    }
    return;
  }

  // Draw condition
  if(totalClicks === 9 && win === -1) {
    document.getElementById('winningText').innerHTML = "It's a draw!";
  }
  return;
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
