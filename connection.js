const mysql = require("mysql2");
const db = mysql.createConnection({
  user: "root",
  password: "",
  port: 3306,
  localhost: "3001",
  database: "employee_db",
});

db.connect((error) => {
  if (error) throw error;
  console.log("server conected");
});

module.exports = db;
