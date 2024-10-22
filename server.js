const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // PostgreSQL connection string
    ssl: {
        rejectUnauthorized: false
    }
});

// Route to handle form submission
app.post('/apply', async (req, res) => {
    const { name, email, phone, location, loan_amount, loan_type, employment_type, salary, employer, emi, purpose } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO loan_applications (name, email, phone, location, loan_amount, loan_type, employment_type, salary, employer, emi, purpose) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id',
            [name, email, phone, location, loan_amount, loan_type, employment_type, salary, employer, emi, purpose]
        );
        res.status(200).json({ success: true, applicationId: result.rows[0].id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error submitting application' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
