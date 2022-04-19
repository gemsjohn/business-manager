const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      port: '3306',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'password',
      database: 'business'
    },
    console.log('Connected to the Business Manager database.')
);

module.exports = db;