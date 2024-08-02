const express = require('express');
const ejs = require('ejs');
const path = require('path'); 
const newMessageRouter = require('./routes/new-message');

const app = express();
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Sample messages
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

// Make messages available to routers
app.locals.messages = messages;

// Index route
app.get('/', (req, res) => {
    res.render('index', { title: "Mini Messageboard", messages: messages });
});

// Message details route
app.get('/message/:id', (req, res) => {
    const message = messages[req.params.id];
    if (message) {
        res.render('message', { title: "Message Details", message: message });
    } else {
        res.status(404).send('Message not found');
    }
});

// Use the new message router
app.use('/new', newMessageRouter);

const port = 8000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
