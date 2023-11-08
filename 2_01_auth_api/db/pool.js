const {Pool} = require('pg')

const connectionString = process.env.DB_CONNECTION_STRING

const pool = new Pool({connectionString})

module.exports = pool