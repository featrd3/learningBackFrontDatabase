const mysql = require('mysql2')
const db = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "your_password",
    database: "recipesdb"
})

module.exports = db;