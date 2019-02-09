const { config } = require('./config/config');
const connectionString = config.connectionString;

const { Pool, Client } = require('pg');

const pool = new Pool({
    connectionString: connectionString,
});

// const client = new Client({
//   connectionString: connectionString,
// });
// client.connect();
//
// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   client.end()
// });

/*
res를 넘겨주어 이 방법으로도 가능
pool.query('select id, name from game where id = $1;', [num], (error, results) => {
    if (error) {
        throw error
    }
    res.status(200).json(results.rows)
})
*/

async function allGameNames () {
    return pool.query('select id, name from game;')
}

async function getGameInfo (num) {
    return pool.query('select * from game where id = $1;', [num])
}


module.exports = {
    allGameNames,
    getGameInfo
}
