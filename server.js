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

// Print in terminal all from department table
db.all(`SELECT * FROM department`, (err, rows) => {
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