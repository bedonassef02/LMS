const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: 'root',
    password: process.env.PASSWORD,
    database: 'lms',
    port:process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log("Error Connection : " + err.stack);
        return
    }
    console.log("Connection ad id " + connection.threadId);
});

module.exports = connection