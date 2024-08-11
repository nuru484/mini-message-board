const pool = require('./pool');

const createTableSQL = `
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const insertMessagesSQL = `
  INSERT INTO messages (user, message)
  VALUES 
  ('John Doe', 'Hello World!'),
  ('Jane Smith', 'This is a message board.'),
  ('Alex Johnson', 'Post your message here.')
`;

(async () => {
  try {
    // Create table
    await pool.query(createTableSQL);
    console.log('Table created or already exists.');

    // Insert messages
    await pool.query(insertMessagesSQL);
    console.log('Database populated successfully.');
  } catch (err) {
    console.error('Error populating database:', err);
  } finally {
    // Close the pool
    await pool.end();
  }
})();
