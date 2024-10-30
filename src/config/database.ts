// db.js
import mysql from "mysql2";
import { Pool } from "mysql2/typings/mysql/lib/Pool";

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost", // Or use '127.0.0.1'
  port: 3307, // Default MySQL port
  user: "root", // MySQL root user
  password: "123456", // Root password set in Docker
  database: "store_db", // Replace with your database name
});

// Export the pool to use it elsewhere in your app
// module.exports = pool.promise();  // Using the promise-based API for async/await support
export default pool.promise();
