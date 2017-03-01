'use strict';
var levels = ['diff-one','diff-two', 'diff-three'];
var characters = ['char-one', 'char-two', 'char-three'];
var radioAnswers = ['ansOne', 'ansTwo', 'ansThree'];
var labelIds = ['answerOne', 'answerTwo', 'answerThree'];
var chosenChar;
var chosenLevel;
var human;
var computer;
var timeLimit = 60; // in Seconds for question
var overlayDuration = 1000; //in Milsecs
var tick; // an interval varaible needs to be global so it cant be cleared from multiple functions.
var haveWinner = false;
var compPic = document.getElementById('compPic');
var oppenentPic = 'img/computeropp.png';
var fightingBoss = false;
var winnerOverlay = document.getElementById('winner-overlay');
var loserOverlay = document.getElementById('loser-overlay');

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
var bossQuestions = []; // need some questions here
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
  // console.log(event);
  compPic.src = oppenentPic;
  for (var i = 0; i < characters.length; i++) {
    var radio = document.getElementById(characters[i]);
    if (radio.checked === true){
      chosenChar = radio.value;
      // console.log('radio value',radio.checked);
      var playPic = document.getElementById('playPic');
      playPic.src = chosenChar;
    }
  }
  for (var i = 0; i < levels.length; i++) {
    var radio = document.getElementById(levels[i]);
    if (radio.checked === true){
      chosenLevel = radio.value;
      if (radio.value === 'diff-one'){
        console.log('You have 60 seconds to answer each question');
      } else if (radio.value === 'diff-two') {
        timeLimit = 30;
      } else if (radio.value === 'diff-three') {
        timeLimit = 10;
      }
    }
  }
  var userName = event.target.pickName.value;
  // console.log(userName, chosenChar, chosenLevel);
  getQuestion();
  human = new Player(userName, chosenLevel, chosenChar);
  human.isHuman = true;
  placeHealthBar(human);
  computer = new Player('computer', chosenLevel);// needs a Char and LvL?
  var currentUserStats = [human.name, chosenChar, chosenLevel];
  //call saveToLocalStorage, placeHealthBar, fireUpTimer
  saveToLocalStorage(currentUserStats);
  placeHealthBar(computer);
  fireUpTimer();
  hideEntryForm();
}
//display questions
function getQuestion() {
  if (haveWinner){
    clearInterval(tick);
    if (computer.health === 0) {
      summonBoss();
    }
    return;
  }
  var questionElement = document.getElementById('questionContainer');
  questionElement.textContent = questions[questionNumber].question;
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
  // questionNumber++;
  //display questions in random order

  //display answers in random order
  function getRandomIndex() {
    return Math.floor(Math.random() * (answerInputElements.length));
  }
}
var formElement = document.getElementById('entry-form');
formElement.addEventListener('submit', handleSubmit);

function shuffleArrayInPlace(questions) {
  var i = 9;
  var j, temp;
  while (i >= 1) {
    j = Math.floor( Math.random() * ( i + 1 ) ); // random element up to i, inclusive
    // swap i j
    temp = questions[i];
    questions[i] = questions[j];
    questions[j] = temp;
    i--;
  }
  return questions;
}

//console.log(shuffleArrayInPlace(questions));

function submitAnswer(){
  event.preventDefault();
  event.stopPropagation();
  for (var i = 0; i < radioAnswers.length; i++) {
    //console.log('radio ans at i', radioAnswers[i]);
    var radioAns = document.getElementById(radioAnswers[i]);
    var radioLables = document.getElementById(labelIds[i]);
    if(radioAns.checked){
      if (radioLables.textContent === questions[questionNumber].answers[0]){
        //punch the computer
        console.log('Punch the computer');
        displayHit(computer);
        break;
      } else {
        //the computer punches you
        console.log('You have been hit!');
        displayHit(human);
        break;
      }
    } else {
      console.log('answer at index ' + i + ' not checked ');
      if (i === 2){
        return;
      }
    }
  }
  questionNumber++;
  clearInterval(tick);//Remove timer to prevent memory leak
  getQuestion();
  fireUpTimer();
  //set radio buttons to unchecked
  uncheckRadio();
}
//set radio buttons to unchecked
function uncheckRadio(){
  for (var i = 0; i < radioAnswers.length; i++) {
    document.getElementById(radioAnswers[i]).checked = false;
  }
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
  if (haveWinner){
    return;
  }
  var countDown = timeLimit;
  var timerElement = document.getElementById('timer');
  tick = setInterval(changeSeconds, 1000);
  timerElement.textContent = countDown;
  function changeSeconds(){
    countDown -= 1;
    timerElement.textContent = countDown;
    if (countDown === 0){
      console.log('pow!!');
      clearInterval(tick);
      displayHit(human);
      questionNumber++;
      uncheckRadio();
      getQuestion();
      fireUpTimer();
    }
  }
}

function displayHit(player){
  player.health--;
  if (fightingBoss){
    player.health--;
  }
  var overlay = document.getElementById('overlay-animations');
  overlay.setAttribute('style', 'display: block');
  // console.log('Should see overlay');
  var overlaytime = setInterval(overlayEnd, overlayDuration);
  function overlayEnd(){
    overlay.setAttribute('style', 'display: none');
    clearInterval(overlaytime);
    // console.log('Clearing Overlay');
  }
  placeHealthBar(player);
  handleWinLoss(player);
}

//save user info to local storage
function saveToLocalStorage(currentUserStats){
  //user name, character, and difficuly
  localStorage.itemObjects = JSON.stringify(currentUserStats);

  // console.log('Saved; ', localStorage, 'to localStorage');
}

// checking to see if either opponets health is 0
function handleWinLoss(player){
  if (player.health <= 0) {
    // debugger;
    if (player.isHuman === true) {
      loserOverlay.setAttribute('style', 'z-index: 9');
      console.log('You Lose! and see Lindsay...');
    } else {
      winnerOverlay.setAttribute('style', 'z-index: 9');
      console.log('You Win! and see Ely...');
    }
    haveWinner = true;
  }
}
// this hides the entry form on submit.
function hideEntryForm(){
  var entryForm = document.getElementById('entry-form');
  entryForm.setAttribute('style', 'display: none');
}

function summonBoss(){
  fightingBoss = true;
  haveWinner = false;
  compPic.src = 'img/adam-boss.png';
  winnerOverlay.setAttribute('style', 'z-index: 9');
  cumputer.health = 6;
  player.health = 5;
  questions = bossQuestions;// grab new questions

  // reset timer


}
