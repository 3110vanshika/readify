const {Pool} = require('pg')

const db = new Pool({
    user:process.env.DATABASE_USER,
    host:process.env.DATABASE_HOST,
    port:process.env.DATABASE_PORT,
    database:process.env.DATABASE_DB,
    password:process.env.DATABASE_PASS
})
module.exports = {db};