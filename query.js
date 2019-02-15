const { config } = require('./config/config');
const connectionString = config.connectionString;

const { Pool, Client } = require('pg');

const pool = new Pool({
    connectionString: connectionString,
});

async function allGameNames () {
    return pool.query('select id, name from game;')
}

async function getGameInfo (name) {
    return pool.query('select * from game where name = $1;', [name])
}


module.exports = {
    allGameNames,
    getGameInfo
}
