const makePlayer = (name, symbol) => {
  return { name, symbol };
};

const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  let squares = document.querySelector(".squares");
  board.forEach((item, index) => {
    const square = document.createElement("div");
    square.classList += "square";
    squares.appendChild(square);
  });

  Array.from(squares.children).forEach((square, index) => {
    square.addEventListener("click", () => {
      // display current player symbol
      square.classList.add(game.activePlayer.symbol);
      square.setAttribute("data", game.activePlayer.symbol);
      // update array to be the same as the current player
      board[index] = game.activePlayer.symbol;
      // remove the ability to click the square after it has been clicked
      square.style.pointerEvents = "none";
      // update the remaining number of squares able to be clicked
      game.remainingSquares -= 1;
      game.checkWinner();
      if (game.declaredWinner == false) {
        if (game.remainingSquares > 0) {
          game.alertNextPlayer();
          game.nextPlayer();
        } else if (game.remainingSquares == 0) {
          game.declareTie();
        }
      }
    });
  });
  return {
    board,
  };
})();

const game = (() => {
  const playerOne = makePlayer("Player 1", "xSymbol");
  const playerTwo = makePlayer("Player 2", "oSymbol");

  let activePlayer = playerOne;
  let declaredWinner = false;
  let remainingSquares = 9;

  let resultText = document.querySelector(".resultText");
  let currentPlayer = document.querySelector(".currentPlayer");

  // conditions needed to win
  const winningSets = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWinner() {
    winningSets.forEach((item, index) => {
      if (
        gameBoard.board[item[0]] === this.activePlayer.symbol &&
        gameBoard.board[item[1]] === this.activePlayer.symbol &&
        gameBoard.board[item[2]] === this.activePlayer.symbol
      ) {
        console.log("winner");
        resultText.innerHTML = `<b>${this.activePlayer.name} has won!</b>`;
        this.declaredWinner = true;
      }
    });
  }

  function alertNextPlayer() {
    this.activePlayer === playerOne
      ? (currentPlayer.textContent = "Player 2")
      : (currentPlayer.textContent = "Player 1");
  }

  function nextPlayer() {
    this.activePlayer === playerOne
      ? (this.activePlayer = playerTwo)
      : (this.activePlayer = playerOne);
    console.log("nextPlayer() function ran");
    console.log("active player: " + activePlayer.name);
  }

  function declareTie() {
    resultText.innerHTML = "<b>Tie Game!</b>";
  }

  return {
    activePlayer,
    remainingSquares,
    checkWinner,
    alertNextPlayer,
    nextPlayer,
    declareTie,
    declaredWinner,
  };
})();
