const express = require('express');
const Game = require('./game');
const app = express();
const READY = "READY";
const INPROGRESS = "InProgress";
const ENDED = "ENDED";
const VALID = "Valid";
const INVALID = "InValid";
let games = [];
let gamesMap = new Map();

// Configuring body parser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  let message = "Welcome To The Game Connect 4 API developed by Animesh Bote!!";
  res.send(message);
});

app.get('/start', (req, res) => {
  const game = createNewGame();
  let token = game.getGameToken();
  gamesMap.set(token, game);
  // games.push(game);
  var result = {
    gameToken: token,
    gameStatus: READY,
    firstPlayer: Game.YELLOW_PLAYER
  }
  res.send(result);
});

app.post('/:move', (req, res) => {
    // Reading isbn from the URL
    const move = req.params.move;
    const gameToken = req.body.gameToken;
    let game = gamesMap.get(gameToken);
    let moveRes = game.makeMove(move);
    console.log("move has been made!!");
    let response;
    if(moveRes) {
      if(game.hasGameEnded()) {
        response = {
          gameToken: game.getGameToken(),
          moveStatus: VALID,
          gameStatus: ENDED,
          winner: game.getWinner(),
          nextTurn: null
        };
      } else {
        response = {
          gameToken: game.getGameToken(),
          moveStatus: VALID,
          gameStatus: INPROGRESS,
          winner: null,
          nextTurn: game.getNextTurn()
        };
      } 
    } else {
      response = {
        gameToken: game.getGameToken(),
        moveStatus: INVALID,
        gameStatus: INPROGRESS,
        winner: null,
        nextTurn: game.getNextTurn()
      };
    }
    res.send(response);
});

app.listen(3000, () => {
  console.log('server started');
});

function createNewGame() {
  console.log("Game created!!");
  const game = new Game();
  return game;
}