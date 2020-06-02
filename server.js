
const sqlite3 = require('sqlite3').verbose();
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

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

db.all(`SELECT * FROM department`, (err, rows) => {
    console.log(rows);
  });

// Delete an employee
// db.run(`DELETE FROM employee WHERE id = ?`, 1, function(err, result) {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result, this, this.changes);
// });

// Create an employee
// const sql = `INSERT INTO employee (id, first_name, last_name, industry_connected) 
//               VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];
// // ES5 function, not arrow function, to use this
// db.run(sql, params, function(err, result) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result, this.lastID);
// });

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