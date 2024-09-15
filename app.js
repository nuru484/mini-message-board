const express = require('express');
const ejs = require('ejs');
const path = require('path');
const messagesRouter = require('./routes/messagesRoutes');
const populatedb = require('./db/populatedb');

const app = express();
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', messagesRouter);

(async () => {
  try {
    console.log('Initializing the database...');

    await populatedb();

    console.log('Database initialized successfully.');

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to initialize the database:', error);
    process.exit(1);
  }
})();
