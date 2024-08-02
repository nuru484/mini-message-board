const express = require('express');
const newMessageRouter = express.Router();

newMessageRouter.get('/', (req, res) => {
    res.render('form', { title: "Add a New Message" });
});

newMessageRouter.post('/', (req, res) => {
    const { user, text } = req.body;
    const newMessage = {
        text: text,
        user: user,
        added: new Date()
    };
    
    req.app.locals.messages.push(newMessage);
    
    res.redirect('/');
});

module.exports = newMessageRouter;
