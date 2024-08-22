const express = require('express');
const { PythonShell } = require('python-shell');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = 3000;
const axios = require('axios')
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

//compare gcv get real-gcv
app.get('/real-gcv/:id', (req, res) => {
  const { id } = req.params;
  const query = `
  SELECT td.vehicle_no, td.s_id, sm.gcv_range FROM transition_delay td JOIN source_master sm ON td.s_id = sm.s_id
  WHERE td.s_id IN (SELECT DISTINCT(s_id) FROM transition_delay WHERE t_id = (SELECT t_id FROM transition_delay WHERE entry_id = ?)) 
  AND td.t_id = (SELECT t_id FROM transition_delay WHERE entry_id = ?)
  `;

  pool.query(query, [id, id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json(results);
  });
})

//weight-diff
app.get('/weight-diff/:id', (req, res) => {
  const { id } = req.params;
  const query = `
  select (wb.expected_weight_MT-wb.challan_quantity_MT),wb.vehicle_no, wb.entry_id from weighbridge as wb inner join gate_entry as ge on wb.entry_id=ge.entry_id 
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

//prediction route
app.post('/predict-quality', async (req, res) => {
  const inputData = req.body;

  try {
    const response = await axios.post('http://localhost:5000/predict', inputData);
    return res.json({ predictions: response.data });
  } catch (error) {
    console.error('Error predicting quality:', error);
    return res.status(500).json({ error: 'Error predicting quality' });
  }
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
