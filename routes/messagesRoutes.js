const express = require('express');
const messageRouter = express.Router();
const controllers = require('../controllers/messagesController');

// Define routes and their handlers
messageRouter.get('/', controllers.messagesGet);
messageRouter.get('/new', controllers.addMessagesGet);
messageRouter.post('/new', controllers.addMessagesPost);

module.exports = messageRouter;
