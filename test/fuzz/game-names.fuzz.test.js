var assert = require('node:assert/strict');
var test = require('node:test');
var GameCollection = require('../../server/games').GameCollection;

function describeValue(value) {
  if (typeof value === 'function') return 'function';
  if (typeof value === 'number' && isNaN(value)) return 'NaN';
  return String(value);
}

function randomString(seed) {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ./_-<>[]{}()=;:\'"';
  var value = '';
  var current = seed;

  for (var i = 0; i < 64; i += 1) {
    current = (current * 1103515245 + 12345) % 2147483648;
    value += chars.charAt(current % chars.length);
  }

  return value;
}

function fuzzValues() {
  var values = [
    undefined,
    null,
    true,
    false,
    0,
    -1,
    123.45,
    NaN,
    Infinity,
    '',
    ' ',
    '\n',
    '../arena',
    '<script>alert(1)</script>',
    'arena; DROP TABLE fight_events;',
    'a'.repeat(4096),
    {},
    { name: 'arena' },
    [],
    ['arena'],
    function noop() {}
  ];

  for (var i = 1; i <= 50; i += 1) {
    values.push(randomString(i));
  }

  return values;
}

test('game collection survives fuzzed game names', function () {
  fuzzValues().forEach(function (value) {
    var games = new GameCollection();

    assert.doesNotThrow(function () {
      var created = games.createGame(value);

      assert.equal(created, true);
      assert.ok(games.getGame(value));
      assert.equal(games.createGame(value), false);
      assert.equal(games.removeGame(value), true);
      assert.equal(games.removeGame(value), false);
    }, 'unexpected throw for value: ' + describeValue(value));
  });
});

test('game collection ignores removal of unknown fuzzed names', function () {
  var games = new GameCollection();

  fuzzValues().forEach(function (value) {
    assert.doesNotThrow(function () {
      assert.equal(games.removeGame(value), false);
    }, 'unexpected throw while removing value: ' + describeValue(value));
  });
});

