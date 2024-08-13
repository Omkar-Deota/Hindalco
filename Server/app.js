const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors=require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: 'GET,POST,PUT,DELETE', 
  credentials: true,
}));
// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const checkDatabaseConnection = (callback) => {
    pool.query('SELECT 1', (error) => {
      if (error) {
        console.error('Database connection failed:', error);
        callback(false);
      } else {
        console.log('Database connected successfully');
        callback(true);
      }
    });
  };
// Route to handle form submissions
app.post('/weighbridge-submit', (req, res) => {
  const { vehicle_no, challan_quantity, gross_weight,expectedWeight } = req.body;
  // Validate input
  if (!vehicle_no || !challan_quantity|| !gross_weight|| !expectedWeight) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Insert data into MySQL
  pool.query(
    'INSERT INTO weighbridge (vehicle_no, challan_quantity_MT, gross_weight_MT, expected_weight_MT) VALUES (?, ?, ?, ?)',
    [vehicle_no, challan_quantity, gross_weight, expectedWeight],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(201).json({ message: 'Data submitted successfully', id: results.insertId });
    }
  );
});

//retrive weighbridge data
// Route to retrieve weighbridge data
app.get('/weighbridge-data', (req, res) => {
  pool.query('SELECT * FROM weighbridge', (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json(results);
  });
});

checkDatabaseConnection((isConnected) => {
  if (isConnected) {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } else {
    console.error('Server failed to start due to database connection issues');
  }
});
