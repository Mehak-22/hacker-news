const pool = require('./src/db/connection'); // Adjust path to match the location of connection.js

(async () => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        console.log('MySQL is working:', rows[0].result); // Expected output: 2
    } catch (error) {
        console.error('Error connecting to MySQL:', error.message);
    } finally {
        await pool.end(); // Close the connection pool
    }
})();
