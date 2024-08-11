const pool = require('./pool');

async function getAllMessages() {
  try {
    const { rows } = await pool.query('SELECT * FROM messages');
    return rows;
  } catch (err) {
    console.error('Error fetching messages', err.stack);
  }
}

async function addMessage(user, message) {
  try {
    await pool.query('INSERT INTO messages ("user", message) VALUES ($1, $2)', [
      user,
      message,
    ]);
  } catch (err) {
    console.error('Error adding message', err.stack);
  }
}

async function getMessage(user, message) {
  try {
    // console.log(`Searching for user: ${user} and message: ${message}`);
    const query =
      'SELECT * FROM messages WHERE "user" ILIKE $1 OR message ILIKE $2'; // Changed LIKE to ILIKE for case-insensitive search
    const values = [`%${user}%`, `%${message}%`];
    const { rows } = await pool.query(query, values);
    // console.log('Search results:', rows);
    return rows;
  } catch (err) {
    console.error('Error executing search query', err.stack);
  }
}

async function deleteMessageById(id) {
  try {
    const query = 'DELETE FROM messages WHERE id = $1';
    await pool.query(query, [id]);
  } catch (err) {
    console.error('Error deleting message', err.stack);
  }
}

async function deleteAllMessages() {
  try {
    const query = 'DELETE FROM messages';
    await pool.query(query);
  } catch (err) {
    console.error('Error deleting all messages', err.stack);
  }
}

module.exports = {
  getAllMessages,
  addMessage,
  getMessage,
  deleteMessageById,
  deleteAllMessages,
};
