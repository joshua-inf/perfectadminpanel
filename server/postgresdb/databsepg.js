const {Client} = require('pg');


const db = new Client({
    host: "localhost",
    user:'postgres',
    port:5432,
    password:"admin",
    database:'postgres'
})


module.exports = {db};