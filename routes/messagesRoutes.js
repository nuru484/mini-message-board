const express = require('express');
const messageRouter = express.Router();
const controllers = require('../controllers/messagesController');

// Routes and their handlers
messageRouter.get('/', controllers.allMessagesGet); // Route for all messages
messageRouter.get('/search', controllers.singleMessageGet); // Route for searching messages
messageRouter.get('/new', controllers.addMessagesGet); // Route to render the form for adding a message
messageRouter.post('/new', controllers.addMessagesPost); // Route for form submission
messageRouter.post('/delete', controllers.deleteSingleMessage);
messageRouter.post('/delete-all', controllers.deleteAllMessages);

module.exports = messageRouter;
