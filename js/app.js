'use strict';
var levels = ['diff-one','diff-two', 'diff-three'];
var characters = ['char-one', 'char-two', 'char-three'];
var chosenChar;
var chosenLevel;
var human;
var computer;
var timeLimit = 5; // in Seconds for question
var overlayDuration = 5000; //in Milsecs

//Questions array
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

var questions = [one, two, three, four, five, six, seven, eight, nine, ten];
var questionNumber = 0;
var answers = [];

//user constructor
function Player(name, difficuly, fighter){
  this.name = name;
  this.isHuman = false;
  this.difficuly = difficuly;
  this.character = fighter;
  this.health = 5;
}

//question constructor
function Question(question, answers) {
  this.question = question;
  this.answers = answers;
  this.correctAnswer = answers[0];
}
//for creating character
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
  var userName = event.target.pickName.value;
  console.log('form data', userName, chosenChar, chosenLevel);
  getQuestion(questions, questionNumber);
  human = new Player(userName, chosenLevel, chosenChar);
  human.isHuman = true;
  placeHealthBar(human);
  computer = new Player('computer', chosenLevel);// needs a Char and LvL?
  placeHealthBar(computer);
  fireUpTimer();
}
//display questions
function getQuestion(questions, questionNumber) {
  var questionElement = document.getElementById('questionContainer');
  var questionContainer = document.createElement('div');
  questionContainer.textContent = questions[questionNumber].question;
  questionElement.appendChild(questionContainer);
  var answerElement = document.getElementById('answersContainer');
  var answerContainer = document.createElement('input');
  var answerInputElements = [document.getElementById('answerOne'), document.getElementById('answerTwo'), document.getElementById('answerThree')];
  var answerLabel = document.createElement('label');
  //Set up variables for answers
  var topAns = getRandomIndex();
  var midAns = getRandomIndex();
  var botAns = getRandomIndex();
  while (midAns === topAns) {
    midAns = getRandomIndex();
  }
  while (botAns === topAns || botAns === midAns) {
    botAns = getRandomIndex();
  }
  var allAns = [topAns, midAns, botAns];
  for (var k = 0; k < answerInputElements.length; k++) {
    answerInputElements[k].textContent = questions[questionNumber].answers[allAns[k]];
  }
  questionNumber++;
  function getRandomIndex() {
    return Math.floor(Math.random() * (answerInputElements.length));
  }
}
var formElement = document.getElementById('entry-form');
formElement.addEventListener('submit', handleSubmit);

function submitAnswer(){
  event.preventDefault();
  event.stopPropagation();
  var radioAnswers = ['answerOne', 'answerTwo', 'answerThree'];
  for (var i = 0; i < radioAnswers.length; i++) {
    //console.log('radio ans at i', radioAnswers[i]);
    var radioAns = document.getElementById(radioAnswers[i]);

    console.log('radio answers ', radioAns.textContent);
    console.log('this.answers ', one.answers[0]);
    if(radioAns.checked === true){
      if (radioAns.textContent === one.answers[0]){
        //punch the computer
        console.log('Punch the computer');
        displayHit();
      } else {
        //the computer punches you
        console.log('You have been hit!');
        displayHit();
      }
    }else{
      console.log('answer not checked ', radioAns.value);
    }
    clearInterval(tick);//Remove timer to prevent memory leak
  }
  questions[i]++;
}
var radioElement = document.getElementById('answersContainer');
radioElement.addEventListener('submit', submitAnswer);

function placeHealthBar(player){
  if (player.isHuman) {
    var healthId = 'player-health';
  } else {
    healthId = 'computer-health';
  }
  var healthElement = document.getElementById(healthId);
  while (healthElement.firstChild) {
    healthElement.removeChild(healthElement.firstChild);
  }
  for (var i = 0; i < player.health; i++) {
    var imageElement = document.createElement('img');
    imageElement.src = 'img/heart.png';
    healthElement.appendChild(imageElement);
  }
}

function fireUpTimer(){
  var timerElement = document.getElementById('timer');
  var tick = setInterval(changeSeconds, 1000);
  timerElement.textContent = timeLimit;
  function changeSeconds(){
    timeLimit -= 1;
    timerElement.textContent = timeLimit;
    if (timeLimit === 0){
      console.log('pow!!');
      clearInterval(tick);
      displayHit();
    }
  }
}

function displayHit(){
  var overlay = document.getElementById('overlay-animations');
  overlay.setAttribute('style', 'display: block');
  console.log('Should see overlay');
  var overlaytime = setInterval(overlayEnd, overlayDuration);
  function overlayEnd(){
    overlay.setAttribute('style', 'display: none');
    clearInterval(overlaytime);
    console.log('Clearing Overlay');
  }
}
