const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const inputCheck = require('./utils/inputCheck');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

var Promise = require('bluebird');

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
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'theshop',
    password: 'root'
});

// Get single function
function findOne (req, res, table) {
        console.log(`FINDONE -- ${table}`)
        const sql = `SELECT * FROM ${table} WHERE id = ?`;
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

// Get single employee
//app.get('/api/employees/:id', (req, res) => findOne(req, res, 'employees'));
// Get single role
//app.get('/api/roles/:id', (req, res) => findOne(req, res, 'roles'));
// Get single department
//app.get('/api/department/:id', (req, res) => findOne(req, res, 'department'));

// Get all function
function findAll(req, res, table) {
        console.log(`FINDALL - ${table}`)
        const sql = `SELECT * FROM ${table}`;
        const params = [req.params.id];
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
}

// Get all employees
//app.get('/api/employees', (req, res) => findAll(req, res, 'employees'));
// Get all roles
//app.get('/api/roles', (req, res) => findAll(req, res, 'roles'));
// Get all departments
//app.get('/api/department', (req, res) => findAll(req, res, 'department'));


// // Delete a selection function
// function deleteOne: (req, res, table) => {
//         const sql = `DELETE * FROM employees ${table} 
//                     WHERE id = ?`;
//         const params = [req.params.id];
//         db.run(sql, params, function(err, result) {
//             if (err) {
//                 res.status(400).json({ error: res.message });
//                 return;
//             }
//             res.json({
//                 message: 'successfully deleted',
//                 changes: this.changes
//             }); 
//         });
// }   

// // Delete single employee
// app.get('/api/employees/:id', (req, res) => deleteOne(req, res, 'employees'));
// // Delete single role
// app.get('/api/roles/:id', (req, res) => deleteOne(req, res, 'roles'));
// // Delete single department
// app.get('/api/department/:id', (req, res) => deleteOne(req, res, 'department'));

// // var editOne = require('./editOne')
// // Edit one function - needs to be checked can i still use orm for this?
// var orm = {
//     editOne: (req, res, table) => {
//         const sql = `UPDATE ${table} SET ?? = ? 
//                      WHERE id = ?`;
//         const params = [req.body.party_id, req.params.id];
      
//         db.run(sql, params, function(err, result) {
//           if (err) {
//             res.status(400).json({ error: err.message });
//             return;
//           }
//           res.json({
//             message: 'successfully edited',
//             data: req.body,
//             changes: this.changes
//           });
//         });
//     }
// }

// // Edit single employee
// app.get('/api/employees/:id', (req, res) => orm.editOne(req, res, 'employees'));
// // Edit single role
// app.get('/api/roles/:id', (req, res) => orm.editOne(req, res, 'roles'));
// // Edit single department
// app.get('/api/department/:id', (req, res) => orm.editOne(req, res, 'department'));


// Create an employee
app.post('/api/employees', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'role_id', 'manager_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
});

// Print in terminal all from department table - new
connection.query('SELECT * FROM `department`', 
    function(err, results, fields) {
        console.log('MYSQL - GET ALL DEPARTMENTS'); 
        console.log(results);
        console.log(fields);
});

// Print in terminal all from roles table
db.all(`SELECT * FROM roles`, (err, rows) => {
    console.log('GET ALL ROLES');
    console.log(rows);
});

 // Print in terminal all from employees table
db.all(`SELECT * FROM employees`, (err, rows) => {
    console.log('GET ALL EMPLOYEES');
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