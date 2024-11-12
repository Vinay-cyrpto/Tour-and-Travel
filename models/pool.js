const mysql = require('mysql2');

// Create a pool of connections
const pool = mysql.createPool({
    host: "junction.proxy.rlwy.net",        // Database host
    user: "root",                           // Database user
    password: "emhJcfJEbuFSKhgWysTsyAMpEBYbvsAe",  // Database password
    database: "railway",                    // Database name
    port: 57387,                            // Database port
    connectionLimit: 10,                    // Max number of connections in the pool
    waitForConnections: true,               // Wait for available connections if all are in use
    multipleStatements: true,              // Allow multiple SQL statements in one query
    supportBigNumbers: true                // Support for large numbers
});

// Test the connection and log success or error
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Database connected');
    connection.release(); // Always release the connection back to the pool
});

// Handle connection pool errors
pool.on('error', (err) => {
    console.error('Error in the connection pool:', err);
});

module.exports = pool;
