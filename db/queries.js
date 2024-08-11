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
    await pool.query('INSERT INTO messages (user, message) VALUES ($1, $2)', [
      user,
      message,
    ]);
  } catch (err) {
    console.error('Error adding message', err.stack);
  }
}

async function getMessage(user, message) {
  try {
    const query =
      'SELECT * FROM messages WHERE user LIKE $1 OR message LIKE $2';
    const values = [`%${user}%`, `%${message}%`];
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (err) {
    console.error('Error executing search query', err.stack);
  }
}

async function deleteAllMessages() {
  try {
    const query = 'DELETE FROM messages';
    await pool.query(query);
    console.log('All messages deleted');
  } catch (err) {
    console.error('Error deleting all messages', err.stack);
  }
}

module.exports = {
  getAllMessages,
  addMessage,
  getMessage,
  deleteAllMessages,
};
