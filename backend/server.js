// backend/server.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('database.db'); // Use a file-based DB for persistence

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS colleges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    location TEXT,
    course TEXT,
    fee INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    college_name TEXT,
    rating INTEGER,
    comment TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    college_id INTEGER UNIQUE
  )`);

  // Seed data if table is empty
  db.get('SELECT COUNT(*) as count FROM colleges', (err, row) => {
    if (row.count === 0) {
      const colleges = [
        { name: 'ABC Engineering College', location: 'Hyderabad', course: 'Computer Science', fee: 120000 },
        { name: 'XYZ Institute of Technology', location: 'Bangalore', course: 'Electronics', fee: 100000 },
        { name: 'Sunrise Business School', location: 'Chennai', course: 'MBA', fee: 150000 },
        { name: 'Greenfield Medical College', location: 'Hyderabad', course: 'MBBS', fee: 250000 },
      ];
      const stmt = db.prepare('INSERT INTO colleges (name, location, course, fee) VALUES (?, ?, ?, ?)');
      colleges.forEach((c) => stmt.run(c.name, c.location, c.course, c.fee));
      stmt.finalize();
    }
  });
});

// GET /colleges with filters
app.get('/colleges', (req, res) => {
  let query = 'SELECT * FROM colleges WHERE 1=1';
  const params = [];

  if (req.query.location) {
    query += ' AND location = ?';
    params.push(req.query.location);
  }
  if (req.query.course) {
    query += ' AND course = ?';
    params.push(req.query.course);
  }
  if (req.query.minFee) {
    query += ' AND fee >= ?';
    params.push(parseInt(req.query.minFee));
  }
  if (req.query.maxFee) {
    query += ' AND fee <= ?';
    params.push(parseInt(req.query.maxFee));
  }
  if (req.query.search) {
    query += ' AND name LIKE ?';
    params.push(`%${req.query.search}%`);
  }

  if (req.query.sort) {
    const order = req.query.sort === 'asc' ? 'ASC' : 'DESC';
    query += ` ORDER BY fee ${order}`;
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /reviews
app.post('/reviews', (req, res) => {
  const { college_name, rating, comment } = req.body;
  if (!college_name || !rating || !comment) return res.status(400).json({ error: 'Missing fields' });
  if (rating < 1 || rating > 5) return res.status(400).json({ error: 'Rating must be between 1 and 5' });

  db.run('INSERT INTO reviews (college_name, rating, comment) VALUES (?, ?, ?)', [college_name, rating, comment], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// GET /reviews
app.get('/reviews', (req, res) => {
  db.all('SELECT * FROM reviews', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /favorites
app.post('/favorites', (req, res) => {
  const { college_id } = req.body;
  if (!college_id) return res.status(400).json({ error: 'Missing college_id' });

  db.run('INSERT OR IGNORE INTO favorites (college_id) VALUES (?)', [college_id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID || 'existing' });
  });
});

// GET /favorites
app.get('/favorites', (req, res) => {
  db.all('SELECT c.* FROM favorites f JOIN colleges c ON f.college_id = c.id', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// DELETE /favorites/:id (where :id is college_id)
app.delete('/favorites/:id', (req, res) => {
  const college_id = parseInt(req.params.id);
  db.run('DELETE FROM favorites WHERE college_id = ?', [college_id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));