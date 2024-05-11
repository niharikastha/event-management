const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

// Define your routes and API endpoints here

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
