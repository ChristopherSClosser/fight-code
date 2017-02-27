'use strict';
var levels = ['diff-one','diff-two', 'diff-three'];
var characters = ['char-one', 'char-two', 'char-three'];
var chosenChar;
var chosenLevel;
var questions = [];
var questionNumber = 0;
var answers = [];

//user constructor
function Player(name, difficuly, fighter){
  this.name = name;
  this.difficuly = difficuly;
  this.character = fighter;
}
function Question(question, answers, correctAnswer) {
  this.question = question;
  this.answers = answers;
  this.correctAnswer = correctAnswer;
}

function getQuestion(questions, questionNumber) {
  var questionElement = document.getElementById('questionContainer');
  var questionContainer = document.createElement('div');
  questionContainer.textContent = questions[questionNumber].question;
  questionElement.appendChild(questionContainer);
  questionNumber++;
}

var formElement = document.getElementById('entry-form');

formElement.addEventListener('submit', handleSubmit);

function handleSubmit (event){
  event.preventDefault();
  event.stopPropagation();
  console.log(event);

  for (var i = 0; i < characters.length; i++) {
    var radio = document.getElementById(characters[i]);
    if (radio.checked === true){
      chosenChar = radio.value;
    }
  }
  for (var i = 0; i < levels.length; i++) {
    var radio = document.getElementById(levels[i]);
    if (radio.checked === true){
      chosenLevel = radio.value;
    }
  }
  var userName = event.target.pickName.value;
  console.log(userName, chosenChar, chosenLevel);
  getQuestion(questions, questionNumber);
}

var one = new Question('What is the correct JavaScript syntax to change the content of the HTML element <p id="demo">This is a demonstration.</p>?', ['document.getElementById("demo").innerHTML = "Hello World!";', 'document.getElementById("p").innerHTML = "Hello World!";', '#demo.innerHTML = "Hello World!";' ]);
var two = new Question('Inside which HTML element do we put the JavaScript?', ['<script>', '<js>', '<javascript>']);
var three = new Question('Where is the correct place to insert a JavaScript?', ['Both the <head> section and the <body> section are correct', 'The <head> section', 'The <body> section']);
var four = new Question('What is the correct syntax for referring to an external script called "xxx.js"?', ['<script src="xxx.js">', '<script href="xxx.js">', '<script name="xxx.js">']);
var five = new Question('How can you add a comment in a JavaScript?', ['//This is a comment', '\'This is a comment','<!--This is a comment-->']);
var six = new Question('What command is used to exit out of a function in JavaScript?', ['return ;', 'console.log();', 'prompt();']);
var seven = new Question('Which tag in HTML does not require a closing tag?', ['img tag', 'p tag', 'section tag']);
var eight = new Question('Which of the following is an example of semantic HTML?',['<em> </em>', '<b> </b>', '<p> </p>']);
var nine = new Question('What is the proper syntax for writing a comment in HTML?', ['<!-- Insert comment here. -->', '// Insert comment here.', '<-- Insert  comment here. -->']);
var ten = new Question('How would you declare the variable k?', ['var k;', 'var = k;', 'k = variable;']);

