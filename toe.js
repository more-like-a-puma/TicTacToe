// 0. Load page elements first
$(document).ready(function () {

  // 1. gameboard arrays
  var gameboard = [["","",""],["","",""],["","",""]];
  // gameboard[0][2]

  // 2. initialise players with 0 scores and update score boards
  var playerX = parseInt(localStorage.playerXWins) || 0;
  var playerO = parseInt(localStorage.playerOWins) || 0;
  var updateScore = function() {
    $("#scoreX").text("Player X: " + playerX);
    $("#scoreO").text("Player O: " + playerO);
  };
  updateScore();
  // 3. set first player to be "X"
  var playerPiece = "X";

  // 4. function for displaying the player pieces on the board, logging the data and alerting if game is won
  $('.square').click(function() {
      var $currentSquare = $( this );
      var row = parseInt($currentSquare.data('row'));
      var column = parseInt($currentSquare.data('column'));
      if (gameboard[row][column]) {
        return;
      }
      // set gameboard square as the player piece
      gameboard[row][column] = playerPiece;
      $currentSquare.text( playerPiece );
      // call checkWinner function passing in the current data
      var won = checkWinner(row, column) ;
      // adding sweet alerts for the end of each round
      if (won) {
        swal({title: "Well done!", text: "You won!", type: "success"}, reset);
          // depending on the winning player, add one count to the local storage
          if (playerPiece === "X") {
            playerX += 1;
            localStorage.playerXWins = playerX;
          }
          else if (playerPiece === "O") {
            playerO += 1;
            localStorage.playerOWins = playerO;
          }
        updateScore();
      } else if (checkTie()) {
        swal({title: "Oh wow!", text: "It's a tie!"}, reset);
      } else {
        // player piece switcher
        if (playerPiece === "X") {
          playerPiece = "O";
        } else {
          playerPiece = "X"
        };
      }

  });

  // 5. Truthy or Falsey functions to see if the game has been won
  var checkRow = function(row) {
    var count = 0;
    // for loop to check the each row of the gameboard
    for (var i = 0; i < gameboard.length; i++) {
      // if the squares in one row are occupied add one to the count
      if (gameboard[row][i] === playerPiece)
        count++;
    }
    return count === gameboard.length;
  }

  var checkColumn = function(column) {
    var count = 0;
    for (var i = 0; i < gameboard.length; i++) {
      // check each column to see if the player has taken over a column and add one to the count if true
      if (gameboard[i][column] === playerPiece)
        count++;
    }
    return count === gameboard.length;
  }

  var checkDiagonal = function() {
    var count = 0;
    for (var i = 0; i < gameboard.length; i++) {
      // check if the integer of the row and array are the same (for a 'backslash' diagonal) truth check
      if (gameboard[i][i] === playerPiece)
        count++;
    }
    return count === gameboard.length;
  }

  var checkReverseDiagonal = function() {
    var count = 0;
    for (var i = 0; i < gameboard.length; i++) {
      if (gameboard[i][gameboard.length-i-1] === playerPiece)
        count++;
    }
    return count === gameboard.length;
  }

  // 6. Final checks for winner or tie setting true (or false) booleans for the check functions
  var checkWinner = function(r, c) {
    if(checkRow(r))
      return true;
    if(checkColumn(c))
      return true;
    if(r === c && checkDiagonal())
      return true;
    if(r === (gameboard.length - c - 1) && checkReverseDiagonal())
      return true;
  }

  var checkTie = function () {
    for (var i = 0; i < gameboard.length; i++) {
      for (var j = 0; j < gameboard[i].length; j++) {
        if (gameboard[i][j] === "")
          return false;
      }
    }
    return true;
  }

  // 7. reset function that empties the gameboard again and resets the first player as "X"
  var reset = function () {
    gameboard = [["","",""],["","",""],["","",""]];
    $(".square").text("");
    playerPiece = "X";
  };

  $("#clearBoard").click(reset);
  // 8. reset function for clearing the local storage of the scores
  $("#clearScore").click(function() {
    localStorage.clear();
    playerX = 0;
    playerO = 0;
    updateScore();
  });

});
