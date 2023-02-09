//Variables

// 1 = player turn, 2 = computer turn
let turn = 1;


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
  playerTwo: 0
}

//Functions

// forces you to enter name before game starts

function startGame(){
  let person = document.getElementById('userInput').value.toString();
  
  if (!person) {
    alert("Please enter your name");
    return;
  }
  
  document.getElementById('oneTotal').innerHTML = person + "'s" + " Games Won: " ;
  turnSelector();
};
  
// Randomly selects who plays first

function turnSelector () {
    
  turn = Math.floor(Math.random()* 3); 
  if (turn === 0) {
    turnSelector();
    return
  } else if (turn === 2){
    computerMove();
    return
  } else if (turn === 1){
    playerMove();
    return
  }
}


//Player move
/*playerMove checks which cell player clicked on and adds an X to that spot*/

function playerMove (element, row, col) {

  let move = false;
  let person = document.getElementById('userInput').value;
  
  if (!person) {
    alert("Please enter your name");
    return;
  }
  
  if (win !== -1) {
    return;
  }
  
  
  if(turn === 1 && grid[row][col] === -1 && !move) {
    move = true;
    totalClicks ++;
    element.innerHTML = 'X';
    grid[row][col] = turn;
    turn = 2;
  }
  checkWin();
  if(turn === 2) {
    setTimeout(function() {
      computerMove();
    }, 500);
    document.getElementById('winningText').innerHTML = "Computer's turn";
    return
  }
  move = false;
  document.getElementById('winningText').innerHTML = person + "'s" + " turn";
}



//Computer move makes move for computer

function computerMove() {

  let move = false;

  if (win !== -1) {
    return;
  }
  
  setTimeout(function() {
    // Generate a random number between 0 and 8 to determine which cell the computer will place its O in
    let randomIndex = Math.floor(Math.random() * 9);

    // Check if the cell is empty
    if (grid[Math.floor(randomIndex/3)][randomIndex%3] === -1 && !move) {
      // Place the O in the cell
      grid[Math.floor(randomIndex/3)][randomIndex%3] = 2;

      // Update the display
      document.getElementById('cell' + randomIndex).innerHTML = 'O';
      totalClicks ++;
      move = true
      checkWin();
      if (win === -1) {
        turn = 1;
      }
    } else {
      // If the cell is not empty, call the function again to try again
      computerMove();
      return
    }
    document.getElementById('winningText').innerHTML = document.getElementById('userInput').value + "'s" + " turn";
  }, 1000); // The number 1000 is the time in milliseconds to wait before making the computer's move
  move = false;
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
  setTimeout(function(){
    if(win == 1) {
    playerTotals.playerOne ++;
    document.getElementById('winningText').innerHTML = document.getElementById('userInput').value + " has won!";
    document.getElementById('oneTotal').innerHTML = document.getElementById('userInput').value + "'s " + ` Games Won: ${playerTotals.playerOne}`;
    }else if(win == 2) {
      playerTotals.playerTwo ++;
      document.getElementById('winningText').innerHTML = "Computer has won!";
      document.getElementById('twoTotal').innerHTML = `Computer Games Won: ${playerTotals.playerTwo}`;
    } else {
      if (win == 0) {
        document.getElementById('winningText').innerHTML = "It's a draw!";
      }
    }
  },0);
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
