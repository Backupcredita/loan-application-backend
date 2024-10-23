const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 19594; // You can change this port if needed

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const connection = mysql.createConnection({
    host: 'mysql-loan-application-backupcredita-5ebc.g.aivencloud.com', // Your MySQL host
    user: 'avnadmin', // Your MySQL user
    password: 'AVNS_imXagB_IpbsjzLVeOfc', // Your MySQL password
    database: 'defaultdb', // Your database name
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// API Endpoint for Loan Application
app.post('/apply', (req, res) => {
    const loanApplication = req.body;

    const query = 'INSERT INTO loan_applications SET ?';
    connection.query(query, loanApplication, (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(201).send('Loan application submitted successfully');
    });
});

// Start the Server
app.listen(port, () => {
    console.log(`Server is running on https://loan-application-backend-oaox.onrender.com:${19594}`);
});
