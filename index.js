const cells = document.querySelectorAll(".cell");
const restart_button = document.querySelector(".restart-button");
const status_text = document.querySelector(".status-text");
let whose_turn = "X";
let cells_state = [];
let win_conditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let x_win = false;
let o_win = false;
let possible_o = true;
let possible_x = true;

start_game();

function start_game() {
  cells.forEach((cell) => {
    cell.addEventListener("click", player_move);
  });
  restart_button.addEventListener("click", () => {
    x_win = false;
    o_win = false;
    cells_state = [];
    whose_turn = "X";
    status_text.innerHTML = `${whose_turn}'s turn`;
    cells.forEach((cell) => {
      cell.addEventListener("click", player_move);
      cell.innerHTML = "";
    });
  });
}

function player_move() {
  this.innerHTML = whose_turn;
  this.removeEventListener("click", player_move);
  whose_turn = whose_turn == "X" ? "O" : "X";
  status_text.innerHTML = `${whose_turn}'s turn`;
  validation();
}

function validation() {
  cells_state = [];
  cells.forEach((cell) => {
    cells_state.push(cell.textContent);
  });
  for (condition of win_conditions) {
    for (i of condition) {
      if (cells_state[i] != "X") {
        possible_x = false;
      }
      if (cells_state[i] != "O") {
        possible_o = false;
      }
    }
    if (possible_x == true) {
      x_win = true;
      end();
    } else if (possible_o == true) {
      o_win = true;
      end();
    } else if (cells_state.includes("") == false) {
      end();
    }
    possible_o = true;
    possible_x = true;
  }
}

function end() {
  if (x_win) {
    status_text.innerHTML = "X won!";
  } else if (o_win) {
    status_text.innerHTML = "O won!";
  } else {
    status_text.innerHTML = "Draw!";
  }
  cells.forEach((cell) => cell.removeEventListener("click", player_move));
}
