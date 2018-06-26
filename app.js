const http = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

const entries = [];
// make entries visible throughout the whole application
app.locals.entries = entries;

app.use(logger('dev'));

// parse the incoming request data
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/new-entry', (req, res) => {
  res.render('new-entry');
});

app.post('/new-entry', (req, res) => {
  if (!req.body.title || !req.body.body) {
    res.status(400).send('Entries must have title and body');
    return;
  }

  entries.push({
    title: req.body.title,
    content: req.body.body,
    published: new Date()
  });

  res.redirect('/');
});

app.use((req, res, next) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log('guestbook app is running on port: ' + port);
});
