const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydatabase',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const createTable = () => {
    const sql =
        'CREATE TABLE IF NOT EXISTS mytable ( id INT AUTO_INCREMENT PRIMARY KEY, column1 VARCHAR(255), column2 VARCHAR(255))';
    pool.query(sql, (err, result) => {
        if (err) {
            console.log('Error creating table:', err);
        } else {
            console.log('Table created successfully');
        }
    });
};

app.get('/mytable', (req, res) => {
    const sql = 'SELECT * FROM mytable';
    pool.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error fetching data');
        } else {
            res.json(result);
        }
    });
});

app.post('/mytable', (req, res) => {
    const { column1, column2 } = req.body;
    const sql = 'INSERT INTO mytable (column1, column2) VALUES (?, ?)';

    pool.query(sql, [column1, column2], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Error adding user');
        } else {
            res.json({ id: result.insertId, column1, column2 });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
