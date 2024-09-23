const mysql = require('mysql2');
const pool = mysql.createConnection({
    host: "14.139.230.119",
    user: "root",
    password: "TC0cdQcwCWn5BNmI",
    database: "examportal",
    port: 31004
})

pool.connect((err) => {
    if (err)
        throw err
    else
        console.log('database connected');
})

module.exports = pool;