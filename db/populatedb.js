const pool = require('./pool');

(async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS messages (
          id SERIAL PRIMARY KEY,
          text VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

    // Insert sample data
    await pool.query(`
        INSERT INTO messages (text)
        VALUES 
        ('Hello World!'),
        ('This is a message board.'),
        ('Post your message here.')
      `);

    console.log('Database populated successfully.');
  } catch (err) {
    console.error('Error populating database:', err);
  } finally {
    pool.end();
  }
})();
