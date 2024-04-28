const mysql = require('mysql2');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'your password',
    database: 'your database'
});

db.connect();

module.exports = db;