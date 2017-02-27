'use strict';
var levels = ['diff-one','diff-two', 'diff-three'];
var characters = ['char-one', 'char-two', 'char-three'];
var chosenChar;
var chosenLevel;
var questions = [];

//user constructor
function Player(name, difficuly, fighter){
  this.name = name;
  this.difficuly = difficuly;
  this.character = fighter;
}
function Question(question, falseAnswerOne, falseAnswerTwo, correctAnswer) {
  this.question = question;
  this.falseAnswerOne = falseAnswerOne;
  this.falseAnswerTwo = falseAnswerTwo;
  this.correctAnswer = correctAnswer;
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
}
var one = new Question('What is the correct JavaScript syntax to change the content of the HTML element <p id="demo">This is a demonstration.</p>?', 'document.getElementById("p").innerHTML = "Hello World!";', '#demo.innerHTML = "Hello World!";', 'document.getElementById("demo").innerHTML = "Hello World!";');
