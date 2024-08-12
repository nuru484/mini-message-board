const db = require('../db/queries');

const allMessagesGet = async (req, res) => {
  try {
    const messages = await db.getAllMessages();
    res.render('index', { title: 'Mini Messageboard', messages: messages });
  } catch (error) {
    console.error('Error fetching messages', error);
    res.status(500).send('Internal Server Error');
  }
};

const singleMessageGet = async (req, res) => {
  try {
    const searchQuery = req.query.query;
    const messages = await db.getMessage(searchQuery, searchQuery); // Assuming you want to search with both user and message
    res.render('message', {
      title: 'Found Messages',
      messages: messages,
    });
  } catch (error) {
    console.error('Error fetching messages', error);
    res.status(500).send('Internal Server Error');
  }
};

const addMessagesGet = (req, res) => {
  res.render('messageForm', { title: 'Add a New Message' });
};

const addMessagesPost = async (req, res) => {
  try {
    const { user, message } = req.body;
    await db.addMessage(user, message);
    res.redirect('/');
  } catch (error) {
    console.error('Error sending messages', error);
    res.status(500).send('Internal Server Error');
  }
};

const deleteAllMessages = async (req, res) => {
  try {
    await db.deleteAllMessages();
    res.redirect('/'); // Redirect to the homepage or wherever you want after deletion
  } catch (error) {
    console.error('Error deleting all messages', error);
    res.status(500).send('Internal Server Error');
  }
};

const deleteSingleMessage = async (req, res) => {
  try {
    const { id } = req.body;
    await db.deleteMessageById(id);
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting message', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  allMessagesGet,
  singleMessageGet,
  addMessagesGet,
  addMessagesPost,
  deleteSingleMessage,
  deleteAllMessages,
};
