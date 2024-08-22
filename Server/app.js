const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
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
  port: process.env.DB_PORT,
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
  const { entry_id, vehicle_no, challan_quantity, gross_weight, expectedWeight } = req.body;
  // Validate input
  if (!vehicle_no || !challan_quantity || !gross_weight || !expectedWeight || !entry_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Insert data into MySQL
  pool.query(
    'INSERT INTO weighbridge (entry_id, vehicle_no, challan_quantity_MT, gross_weight_MT, expected_weight_MT) VALUES (?, ?, ?, ?, ?)',
    [entry_id, vehicle_no, challan_quantity, gross_weight, expectedWeight],
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

app.get('/entry-detail/:id', (req, res) => {
  const { id } = req.params;
  pool.query(`SELECT entry_id, vehicle_no, t_id, s_id, location, challan_quantity, in_date, in_time FROM gate_entry where entry_id=${id}`, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json(results);
  });
});

//delay fetch
app.get('/delay-data/:id', (req, res) => {
  const { id } = req.params;
  pool.query(`SELECT entry_id, vehicle_no, t_id, delay_minutes FROM transition_delay where entry_id=${id}`, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json(results);
  });
});

//Visualize dashboard

app.get('/dashboard/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT cs.gcv, cs.moisture, td.delay_minutes, td.t_id, td.vehicle_no 
    FROM transition_delay AS td 
    INNER JOIN coalsample AS cs ON td.entry_id = cs.entry_id 
    WHERE td.t_id = (SELECT t_id FROM gate_entry WHERE entry_id = ?)
  `;

  pool.query(query, [id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json(results);
  });
});

//weight-diff
app.get('/weight-diff/:id', (req, res) => {
  const { id } = req.params;
  const query = `
  select (wb.expected_weight_MT-wb.challan_quantity_MT),wb.vehicle_no from weighbridge as wb inner join gate_entry as ge on wb.entry_id=ge.entry_id 
  where wb.entry_id in
   (SELECT entry_id from gate_entry where t_id=(select t_id from gate_entry where entry_id=?)) 
  `;

  pool.query(query, [id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Database error" });
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
