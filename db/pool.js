const { Pool } = require('pg');

// Get the connection string from the command line argument
const connectionString = process.argv[2];

if (!connectionString) {
  console.error('Please provide a database connection string as an argument.');
  process.exit(1);
}

const pool = new Pool({
  connectionString: connectionString,
});

module.exports = pool;
