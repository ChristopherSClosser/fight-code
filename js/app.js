'use strict';

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
var formElement = document.getElementById('entry-form');

formElement.addEventListener('submit', handleSubmit);

function handleSubmit (event){
  event.preventDefault();
  event.stopPropagation();
  console.log(event);

  var userName = event.target.pickName.value;
  console.log(userName);
}
