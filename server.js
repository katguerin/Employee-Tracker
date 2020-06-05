const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const inputCheck = require('./utils/inputCheck');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = new sqlite3.Database('./db/theshop.db', err => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Officially connected to the shop database.');
});

var fineOne = require('./findOne')

var orm = {
    findOne: (req, res, table) => {
        const sql = `SELECT * FROM ${table}
                     WHERE id = ?`;
        const params = [req.params.id];
        db.get(sql, params, (err, row) => {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          res.json({
            message: 'success',
            data: row
          });
        });
      }
}

// Get single employee
app.get('/api/employees/:id', (req, res) => orm.findOne(req, res, 'employees'));

app.get('/api/role/:id', (req, res) => orm.findOne(req, res, 'role'));

app.get('/api/department/:id', (req, res) => orm.findOne(req, res, 'department'));


// Get all employeess
app.get('/api/employees', (req, res) => {
    const sql = `SELECT * FROM employees`;
    const params = [];
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'success',
        data: rows
      });
    });
});

// Delete an employee
app.delete('/api/employees/:id', (req, res) => {
    const sql = `DELETE FROM employees WHERE id = ?`;
    const params = [req.params.id];
    db.run(sql, params, function(err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
  
      res.json({
        message: 'successfully deleted',
        changes: this.changes
      });
    });
});

// Create an employee
app.post('/api/employees', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'role_id', 'manager_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
});

// Print in terminal all from department table
db.all(`SELECT * FROM department`, (err, rows) => {
    console.log(rows);
});

// Print in terminal all from role table
db.all(`SELECT * FROM role`, (err, rows) => {
    console.log(rows);
});

 // Print in terminal all from employees table
db.all(`SELECT * FROM employees`, (err, rows) => {
    console.log(rows);
}); 

// Default response for any other requests(Not Found) Catch all
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.on('open', () => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
});