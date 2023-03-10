//Variables

// 1 = player turn, 2 = computer turn
let turn = 1;

// 1 = VS Computer, 2 = split-screen
let mode = 2;

// -1 = default game is still in play, 1 = player wins, 2 = computer wins
let win = -1;

let grid = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1]
]

let totalClicks = 0

let playerTotals = {
  playerOne: 0,
  playerTwo: 0,
}

//Functions

function gameMode(element) {
  if (element.value === "vsCPU") {
    mode = 1;
    document.getElementById('twoTotal').innerHTML = "Computer's Games Won: ";
    document.getElementById('userInput2').style.display = 'none';
  } else if (element.value === "splitscreen") {
    mode = 2;
    document.getElementById('twoTotal').innerHTML = "Player 2 Games Won: ";
    document.getElementById('userInput2').style.display = 'flex';
  }
  startGame();
}

// forces you to enter name before game starts

function startGame(){
  let person = document.getElementById('userInput').value.toString();
  let person2 = document.getElementById('userInput2').value.toString();
  if (mode === 1) {
    if (!person) {
      alert("Please enter your name");
      return;
    }
    document.getElementById('oneTotal').innerHTML = person + " Games Won:"
    turnSelector();
    
  } else if(mode === 2) {
    if (!person || !person2) {
      alert("Please enter both names");
      return;
    }
    document.getElementById('oneTotal').innerHTML = person + " Games Won:";
    document.getElementById('twoTotal').innerHTML = person2 + " Games Won:";
    turnSelector();
  }
};
  
// Randomly selects who plays first

function turnSelector () {
    
  let person = document.getElementById('userInput').value;
  let person2 = document.getElementById('userInput2').value;

  turn = Math.floor(Math.random()* 3); 
  if (turn === 0) {
    turnSelector();
    return
  } else if (turn === 2 && mode === 1){
    document.getElementById('winningText').innerHTML = "Computer goes first"
    computerMove();
    return
  } else if (turn === 2 && mode === 2){
    document.getElementById('winningText').innerHTML = person2 + " goes first"
    playerMove();
    return
  } else if (turn === 1 && mode === 1) {
    document.getElementById('winningText').innerHTML = person + " goes first"
    playerMove();
    return
  } else if (turn === 1 && mode === 2) {
    document.getElementById('winningText').innerHTML = person + " goes first"
    playerMove();
    return
  }
}


//Player move
/*playerMove checks which cell player clicked on and adds an X to that spot*/

function playerMove (element, row, col) {
  
  
  let move = false;
  let person = document.getElementById('userInput').value;
  let person2 = document.getElementById('userInput2').value;
  
  if (!grid) {
    return;
  }

  if (!person) {
  alert("Please enter your name");
  return;
  } else if (mode === 2) {
  if (!person || !person2) {
    alert("Please enter both names");
    return;
    }
  }
  if (win !== -1) {
    return;
  }
  
  if (mode === 1) {
    if (turn === 1 && grid[row][col] === -1 && !move) {
      move = true;
      totalClicks ++;
      element.innerHTML = 'X';
      grid[row][col] = turn;
      turn = 2;
      document.getElementById('winningText').innerHTML = "Computer's turn"
      checkWin();
      setTimeout(function(){
        computerMove();
      }, 1000);
      return;
    }
  } else if (mode === 2) {
    switch (turn) {
      case 1:
        if (grid[row][col] === -1 && !move) {
          move = true;
          totalClicks ++;
          element.innerHTML = 'X';
          grid[row][col] = turn;
          turn = 2;
          document.getElementById('winningText').innerHTML = person2 + "'s turn";
        }
        break;
      case 2:
        if (grid[row][col] === -1 && !move) {
          move = true;
          totalClicks ++;
          element.innerHTML = 'O';
          grid[row][col] = turn;
          turn = 1;
          document.getElementById('winningText').innerHTML = person + "'s turn";
        }
        break;
      default:
        break;
    }
  }
  
  checkWin();
  move = false;
}


//Computer move makes move for computer

function computerMove() {
  
  if (mode === 2) {
    return
  }
  let move = false;

  if (win !== -1) {
    return;
  }
  
  setTimeout(function() {

    //Finds a random empty cell
      let row, col;
    do {
      row = Math.floor(Math.random() * 3);
      col = Math.floor(Math.random() * 3);
    } while (grid[row][col] !== -1 && !move);

    // Place the O in the cell
    grid[row][col] = 2;

    // Update the display
    document.getElementById('cell' + (row * 3 + col)).innerHTML = 'O';
    totalClicks ++;
    move = true
    document.getElementById('winningText').innerHTML = document.getElementById('userInput').value + "'s" + " turn";
    checkWin();

    if (win === -1) {
      turn = 1;
      playerMove();
    } else {
      // If the cell is not empty, call the function again to try again
      computerMove();
      return
    }
   
  }, 1000); // The number 1000 is the time in milliseconds to wait before making the computer's move
  move = false;
  return
}

// Checks if someone has won the game

function checkWin(){
  
  win = -1;

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
    
    // Draw condition
    //if total clicks is 9 board is filled and it is a draw
    if(totalClicks === 9) {
      win = 0;
    }

    if(win != -1) {
      addPoints();
    }
} 
  
  //If the game was won this changes the html text to add points
  
function addPoints () {
  if (win == 1) {
    if(mode === 1 || mode === 2) {
      playerTotals.playerOne ++;
      document.getElementById('winningText').innerHTML = document.getElementById('userInput').value + " has won!";
      document.getElementById('oneTotal').innerHTML = document.getElementById('userInput').value + "'s " + ` Games Won: ${playerTotals.playerOne}`;
    }
  } else if (win == 2) {
    if(mode === 1) {
      playerTotals.playerTwo ++;
      document.getElementById('winningText').innerHTML = "Computer has won!";
      document.getElementById('twoTotal').innerHTML = `Computer Games Won: ${playerTotals.playerTwo}`;
    } else if(mode === 2){
      playerTotals.playerTwo ++;
      document.getElementById('winningText').innerHTML = document.getElementById('userInput2').value + " has won!";
      document.getElementById('twoTotal').innerHTML = document.getElementById('userInput2').value + "'s " + ` Games Won: ${playerTotals.playerTwo}`;
    }
  } else if (win == 0) {
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

  turnSelector()
}
