const express = require('express');
var bodyParser = require('body-parser');
const port = 3000;
const path = require('path');
const mustache = require('mustache-express');

// Create app
var app = express();

// Set app to use bodyParser()` middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('mustache', mustache());
//app.use('/todo', express.static('todo'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './views');
app.set('view engine', 'mustache');

const todos = [
  "Wash the car",
  "Buy groceries",
  "Pay bills"
];

const completes = [
  "Wash the dog",
  "Take out the trash"
]

app.get("/", function (req, res) {
  res.render('index', { todos: todos, completes: completes});
});

app.post("/", function (req, res) {
  todos.push(req.body.todo);
  console.log(req.body);
  res.redirect('/');
})

app.post("/complete", function (req, res) {
  completes.push(req.body.todo);
  console.log(req.body);
  console.log("you just completed something.")
  res.redirect('/');
})

app.listen(3000);
