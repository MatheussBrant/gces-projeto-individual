var assert = require('node:assert/strict');
var test = require('node:test');
var GameCollection = require('../server/games').GameCollection;

function createSocket() {
  return {
    disconnected: false,
    emitted: [],
    handlers: {},
    disconnect: function () {
      this.disconnected = true;
    },
    emit: function (event, payload) {
      this.emitted.push({
        event: event,
        payload: payload
      });
    },
    on: function (event, handler) {
      this.handlers[event] = handler;
    }
  };
}

test('does not create duplicate games', function () {
  var games = new GameCollection();

  assert.equal(games.createGame('ranked'), true);
  assert.equal(games.createGame('ranked'), false);
});

test('notifies both players when the game is ready', function () {
  var games = new GameCollection();
  var playerOne = createSocket();
  var playerTwo = createSocket();

  games.createGame('arena');
  var game = games.getGame('arena');

  assert.equal(game.addPlayer(playerOne), true);
  assert.equal(game.addPlayer(playerTwo), true);

  assert.deepEqual(playerOne.emitted, [
    {
      event: 'player-connected',
      payload: 0
    }
  ]);
  assert.deepEqual(playerTwo.emitted, [
    {
      event: 'player-connected',
      payload: 1
    }
  ]);
});

