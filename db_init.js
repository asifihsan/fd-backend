const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database (creates it if it doesn't exist)
const db = new sqlite3.Database('./feedback.db', (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

// Create Feedback Table
db.run(`CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5) NOT NULL,
    feedback_text TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
    if (err) {
        console.error("Table creation failed:", err.message);
    } else {
        console.log("Feedback table is ready.");
    }
});

module.exports = db;
