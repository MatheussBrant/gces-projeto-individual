var Pool = require('pg').Pool;

var connectionString = process.env.DATABASE_URL;
var pool = connectionString ? new Pool({ connectionString: connectionString }) : null;

function init(callback) {
  if (!pool) {
    console.log('DATABASE_URL not set. Persistence is disabled.');
    return callback();
  }

  pool.query(
    'CREATE TABLE IF NOT EXISTS fight_events (' +
      'id SERIAL PRIMARY KEY, ' +
      'game_name TEXT NOT NULL, ' +
      'event_type TEXT NOT NULL, ' +
      'metadata JSONB NOT NULL DEFAULT \'{}\'::jsonb, ' +
      'created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()' +
    ')',
    callback
  );
}

function saveFightEvent(gameName, eventType, metadata) {
  if (!pool) return;

  pool.query(
    'INSERT INTO fight_events (game_name, event_type, metadata) VALUES ($1, $2, $3)',
    [String(gameName || ''), eventType, metadata || {}],
    function (err) {
      if (err) {
        console.error('Could not save fight event:', err.message);
      }
    }
  );
}

exports.init = init;
exports.saveFightEvent = saveFightEvent;

