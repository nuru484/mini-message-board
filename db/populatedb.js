const pool = require('./pool');

const createTableSQL = `
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "user" VARCHAR(255) NOT NULL,  
    message TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const insertMessagesSQL = `
  INSERT INTO messages ("user", message) 
  VALUES 
  ('John Doe', 'Hello World!'),
  ('Jane Smith', 'This is a message board.'),
  ('Alex Johnson', 'Post your message here.')
`;

const createDeploymentStatusTableSQL = `
  CREATE TABLE IF NOT EXISTS deployment_status (
    id SERIAL PRIMARY KEY,
    task_name VARCHAR(255) UNIQUE,
    completed BOOLEAN DEFAULT FALSE
  );
`;

const populatedb = async () => {
  try {
    const checkStatusQuery = `SELECT completed FROM deployment_status WHERE task_name = 'tableCreated'`;
    const statusResult = await pool.query(checkStatusQuery);

    if (statusResult.rows.length > 0 && statusResult.rows[0].completed) {
      console.log('Database created already completed. Skipping creation.');
      return;
    }

    // Create table
    await pool.query(createTableSQL);
    await pool.query(createDeploymentStatusTableSQL);
    console.log('Table created or already exists.');

    // Insert messages
    await pool.query(insertMessagesSQL);
    console.log('Database populated successfully.');

    const updateStatusQuery = `
      INSERT INTO deployment_status (task_name, completed)
      VALUES ('tableCreated', true)
      ON CONFLICT (task_name)
      DO UPDATE SET completed = EXCLUDED.completed;
    `;
    await pool.query(updateStatusQuery);
  } catch (err) {
    console.error('Error populating database:', err);
  } finally {
    console.log('Done initializing');
  }
};

module.exports = populatedb;
