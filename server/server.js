const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'kas-seramc',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test DB Connection
app.get('/api/test-db', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    res.json({ message: 'Connected to MySQL Database successfully!' });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ error: 'Database connection failed', details: error.message });
  }
});

// API Endpoints
// Get all transactions
app.get('/api/transactions', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, 'income' as type, name, date, category, amount, description FROM incomes
      UNION ALL
      SELECT id, 'expense' as type, name, date, category, amount, description FROM expenses
      ORDER BY date DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a transaction
app.post('/api/transactions', async (req, res) => {
  const { id, type, name, date, category, amount, description } = req.body;
  try {
    const tableName = type === 'income' ? 'incomes' : 'expenses';
    const [result] = await pool.query(
      `INSERT INTO ${tableName} (id, name, date, category, amount, description) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, name, date, category, amount, description]
    );
    res.status(201).json({ message: 'Transaction added successfully to ' + tableName });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a transaction
app.delete('/api/transactions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // We attempt to delete from both tables since the ID is unique
    await pool.query('DELETE FROM incomes WHERE id = ?', [id]);
    await pool.query('DELETE FROM expenses WHERE id = ?', [id]);
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get top buyers
app.get('/api/top-buyers', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.ign as name, SUM(o.totalAmount) as value
      FROM seramc_db.\`Order\` o
      JOIN seramc_db.\`User\` u ON o.userId = u.id
      WHERE o.status = 'PAID'
      GROUP BY u.ign
      ORDER BY value DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
