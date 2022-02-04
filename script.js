$(document).ready(function() {
  let currentQuestion;
  let timeLeft = 10;
  let score = 0;
  let interval;


  let randomNumberGenrator = function(size) {
    return Math.ceil(Math.random() * size);
  }

  let questionGenerator = function () {
    let question = {};
    let num1 = randomNumberGenrator(10);
    let num2 = randomNumberGenrator(10);

    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);

    return question;
  }

  currentQuestion = questionGenerator();
  $('#equation').text(currentQuestion.equation);

  let renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);
  }

  let updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(":" + timeLeft);
  }

  let updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
  }

  let checkAnswer = function (userInput, answer) {
    if(userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  }

  var startGame = function () {
    if (!interval) {
      // call the updateTimeLeft function if timeLeft is 0
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);  
    }
  }


  $('#user-input').keyup(function() {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  })

  renderNewQuestion();
});




