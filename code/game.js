var uuid = require('uuid');
class Game {
  static YELLOW_WINS = "Yellow Wins!!";
  static RED_WINS = "Red Wins!!";
  static YELLOW_PLAYER = "Yellow Player's Turn";
  static RED_PLAYER = "Red Player's Turn";
  constructor() {
    //initialize game board
    this.gameBoard = [];
    for(var i = 0; i < 6; i++) {
        this.gameBoard[i] = [];
        for(var j = 0; j< 7; j++) {
            this.gameBoard[i][j] = -1;
        }
    }
    //initialize the filed index in each column
    this.columnFilledStatus = [];
    for(var i = 0; i<7; i++) {
      this.columnFilledStatus[i] = 5;
    }
    this.end = false;
    // 0 -> yellow
    this.turn = 0;
    this.gameToken = uuid.v1();
    this.currentMoveStatus = "Valid";
  }

  hasGameEnded() {
    return this.end;
  }

  getWinner() {
    if(this.turn === 0)
      return Game.YELLOW_WINS;
    else
      return Game.RED_WINS;
  }

  getNextTurn() {
    console.log("Under next turn : ",this.turn);
    if(this.turn === 0) {
      return Game.YELLOW_PLAYER;
    } else{
      return Game.RED_PLAYER;
    }
  }

  getGameToken() {
    return this.gameToken;
  }

  getMoveStatus() {
    return this.currentMoveStatus;
  }

  resetGame() {
    this.end = true;
    return new Game();
  }

  makeMove(move) {
    if(move<0 || move>6) {
      this.currentMoveStatus = "InValid";
      return false;
    } else {

      let row = this.columnFilledStatus[move];
      if(row >= 0) {
        this.gameBoard[row][move] = this.turn;
        console.log("going inside checkEndCase!!");
        if(!this.checkEndCase(move)) {
          this.turn = 1-this.turn;
        }
        this.columnFilledStatus[move]--;
        this.currentMoveStatus = "Valid";
        return true;

      } else {
        this.currentMoveStatus = "InValid";
        return false;
      }

    }

  }

  checkEndCase(move) {
    console.log("inside checkEnd: ",move);
    let row = this.columnFilledStatus[move];
    let column = move;
    let horizontal = this.checkHorizontally(row,column);
    console.log("horizontally checked!!!",horizontal);
    if(horizontal) {
      this.end = true;
      return true;
    }
    let vertical = this.checkVertically(row,column);
    console.log("vertically checked!!!",vertical);
    if(vertical) {
      this.end = true;
      return true;
    }
    let diagonallyRight = this.checkDiagonallyRight(row,column);
    console.log("diagonallyRight checked!!!",diagonallyRight);
    if(diagonallyRight) {
      this.end = true;
      return true;
    }
    let diagonallyLeft = this.checkDiagonallyLeft(row,column);
    console.log("diagonallyLeft checked!!!",diagonallyLeft);
    if(diagonallyLeft) {
      this.end = true;
      return true;
    }
    
    return false;
  }

  rowColumnInRange(row,column) {
    if(row<0 || row>5) {
      return false;
    }
    if(column<0 || column>6) {
      return false;
    }
    return true;
  }

  checkHorizontally(row,column) {
    let backSimilar=0;
    let frontSimilar=0;
    let tempColumn = column.valueOf();
    let tempRow = row.valueOf();
    //counting backSimilar
    tempColumn--;
    while(this.rowColumnInRange(tempRow,tempColumn)) {
      if(this.gameBoard[tempRow][tempColumn] === this.turn) {
        backSimilar++;
      } else {
        break;
      }
      tempColumn--;
    }
    tempColumn = column.valueOf();
    tempColumn++;
    while(this.rowColumnInRange(tempRow,tempColumn)) {
      if(this.gameBoard[tempRow][tempColumn] === this.turn) {
        frontSimilar++;
      } else {
        break;
      }
      tempColumn++;
    }
    if(backSimilar+frontSimilar+1 >=4) {
      return true;
    } else {
      return false;
    }
  }

  checkVertically(row,column) {
    let upSimilar=0;
    let downSimilar=0;
    let tempColumn = column.valueOf();
    let tempRow = row.valueOf();
    //counting upSimilar
    tempRow--;
    while(this.rowColumnInRange(tempRow,tempColumn)) {
      if(this.gameBoard[tempRow][tempColumn] === this.turn) {
        upSimilar++;
      } else {
        break;
      }
      tempRow--;
    }
    tempRow = row.valueOf();
    tempRow++;
    while(this.rowColumnInRange(tempRow,tempColumn)) {
      if(this.gameBoard[tempRow][tempColumn] === this.turn) {
        downSimilar++;
      } else {
        break;
      }
      tempRow++;
    }
    if(upSimilar+downSimilar+1 >=4) {
      return true;
    } else {
      return false;
    }
  }

  checkDiagonallyRight(row,column) {
    let upSimilar=0;
    let downSimilar=0;
    let tempColumn = column.valueOf();
    let tempRow = row.valueOf();
    //counting upSimilar right diagonally
    tempRow--;
    tempColumn++;
    while(this.rowColumnInRange(tempRow,tempColumn)) {
      if(this.gameBoard[tempRow][tempColumn] === this.turn) {
        upSimilar++;
      } else {
        break;
      }
      tempRow--;
      tempColumn++;
    }
    tempRow = row.valueOf();
    tempColumn = column.valueOf();
    tempRow++;
    tempColumn--;
    while(this.rowColumnInRange(tempRow,tempColumn)) {
      if(this.gameBoard[tempRow][tempColumn] === this.turn) {
        downSimilar++;
      } else {
        break;
      }
      tempRow++;
      tempColumn--;
    }
    if(upSimilar+downSimilar+1 >=4) {
      return true;
    } else {
      return false;
    }
  }
  //row 2 col 1
  checkDiagonallyLeft(row,column) {
    let upSimilar=0;
    let downSimilar=0;
    let tempColumn = column.valueOf();
    let tempRow = row.valueOf();
    //counting upSimilar right diagonally
    tempRow--;
    tempColumn--;
    while(this.rowColumnInRange(tempRow,tempColumn)) {
      if(this.gameBoard[tempRow][tempColumn] === this.turn) {
        upSimilar++;
      } else {
        break;
      }
      tempRow--;
      tempColumn--;
    }
    tempRow = row.valueOf();
    tempColumn = column.valueOf();
    tempRow++;
    tempColumn++;
    while(this.rowColumnInRange(tempRow,tempColumn)) {
      if(this.gameBoard[tempRow][tempColumn] === this.turn) {
        downSimilar++;
      } else {
        break;
      }
      tempRow++;
      tempColumn++;
    }
    if(upSimilar+downSimilar+1 >=4) {
      return true;
    } else {
      return false;
    }
  }

  getCurrentArrayStatus() {
    return this.gameBoard;
  }


};
module.exports = Game;
