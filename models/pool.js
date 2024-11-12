const mysql = require('mysql2');
const pool = mysql.createConnection({
    host: "junction.proxy.rlwy.net",
    user: "root",
    password: "emhJcfJEbuFSKhgWysTsyAMpEBYbvsAe",
    database: "railway",
    port: 57387,
    connectionLimit: 10,  // Adjust as needed
});

pool.connect((err) => {
    if (err)
        throw err
    else
        console.log('database connected');
})

module.exports = pool;