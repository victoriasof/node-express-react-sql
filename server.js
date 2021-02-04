const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const app = express();
const config = require('./config');

app.use(cors());
// Middleware to add support for JSON data in POST and PUT requests
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: config.user,
  password: config.password,
  database: config.database
});
connection.connect();

app.get('/', (req, res) => {
    res.send('Homepage route');
});

app.get('/api/users', (req, res) => {
    // const users = [
    //     {
    //         id: 1,
    //         name: 'Manos'
    //     },
    //     {
    //         id: 2,
    //         name: 'Victoria'
    //     },
    //     {
    //         id: 3,
    //         name: 'Maria'
    //     }
    // ];

    connection.query('SELECT * FROM users', (err, rows, fields) => {
        if (err) throw err
        res.json(rows);
    });
});

app.get('/api/users/:userId', (req, res) => {
    const id = req.params.userId;
    // const name = 'Manos';

    connection.query('SELECT * FROM users WHERE id = ?',id ,(err, rows, fields) => {
        if (err) throw err
        res.json(rows[0]);
    });

    // connection.query('SELECT * FROM users WHERE id = ? AND name = ?',[id, name] ,(err, rows, fields) => {
    //     if (err) throw err
    //     res.json(rows);
    // });
});

app.post('/api/register', (req, res) => {
    // connection.query("INSERT INTO users (name, email, password) VALUES ('maria', 'maria@gmail.com', '123456')");

    connection.query(
        "INSERT INTO users (name, email, password) VALUES ( ?, ?, ? )",
        [req.body.name, req.body.email, req.body.password],
        (err, rows, fields) => {
            if (err) throw err;
            if (rows.affectedRows == 1) {
                const token = jwt.sign(
                    {id: rows.insertId}, 
                    config.secret, {
                    expiresIn: 86400 // Expires in 24 hours
                });
                res.json({
                    message: "successfully created new user",
                    token: token
                });
            }
        }
    );

    //INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
    //VALUES ('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway');
});

app.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
});