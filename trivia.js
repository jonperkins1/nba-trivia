$(document).ready(function(){

  // start the game when user clicks on Start button
  $("#start-button").on("click", gameState.startTimer);

});

// information about the state of game play
var gameState = {

  // set the time at 60 seconds, and count down by 1 second
  timeRemaining : 60,

  // start the timer, hide the start page, show the questions
  startTimer: function() {
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    setInterval(gameState.countdown, 1000);
    $("#start-page").hide();
    trivia.displayQuestions();
  },

  // decrement the timer and update the UI; stop the timer at 0
  countdown: function() {
    gameState.timeRemaining--;
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    if (gameState.timeRemaining === 0) {
      gameState.stopTimer();
      $("#timer").empty();
    }
  },

  // stop the timer and check the answers
  stopTimer: function() {
    clearInterval();
    trivia.checkAnswers();
  },

  // hide the quetions and display the end page with results
  showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
    $("#end-page").show();
    $("#questions-box").empty();
    $("#timer").empty();
    $("#timer").hide();
    $("#correct-answers").text("Correct answers: " + numCorrect);
    $("#incorrect-answers").text("Incorrect answers: " + numIncorrect);
    $("#unanswered").text("Skipped questions: " + numUnanswered);
  }
}// functions to handle the building questions page and scoring
var trivia = {

    // pull questions from the array of questions, loop through them, and append to UI
    displayQuestions: function() {
      var divContainer = $("#questions-box");
      var answerGroup = $(".form-check");
      divContainer.append('<h2>Questions:</h2>');
              
      for (var i = 0; i < questionBank.length; i++) {
  
        divContainer.append('<div id="question">' + questionBank[i].question + '</div>');
  
        var answer1 = questionBank[i].answers[0];
        var answer2 = questionBank[i].answers[1];
        var answer3 = questionBank[i].answers[2];
        var answer4 = questionBank[i].answers[3];
  
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer4 + '</label></div>');
    }

  
      // add a Done button to the end of the page and register its click handler
      var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
      divContainer.append(doneButton);
      $("#done-button").on("click", gameState.stopTimer);
    },
  
    // test if the user answers are correct, incorrect, or if there are unanswered questions
    checkAnswers: function() {
      var correctAnswer;
      var userAnswer;
      var numCorrect = 0;
      var numIncorrect = 0;
      var numUnanswered = 0;
  
      // loop through to compare the text of the label with the user answers
      // increment score counts appropriately
      for (var i = 0; i < questionBank.length; i++) {
        correctAnswer = questionBank[i].correct;
        userAnswer = $('input[id=radio'+i+']:checked + label').text();
  
        if (userAnswer === correctAnswer) {
          numCorrect++;
        } else if (userAnswer === "") {
          numUnanswered++;
        } else if (userAnswer !== correctAnswer) {
          {
            numIncorrect++;
          }
        }
      }
  
      // show the end page with the score tally
      gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
    },
  }
  
  // array of objects with the questions, possible answers, and the correct answer
  var questionBank =
  [
    {
      question: "Which NBA team has the most championships?",
      answers: ["Los Angeles Lakers", "Boston Celtics", "San Antonio Spurs", "Golden State Warriors"],
      correct: "Boston Celtics"
    },
  
    {
      question: "Which NBA player has the most NBA championships?",
      answers: ["Michael Jordan", "Kobe Bryant", "Bill Russell", "LeBron James"],
      correct: "Bill Russell"
    },
    {
      question: "In what city was the first NBA game played?",
      answers: ["Boston", "New York", "Toronto", "Los Angeles"],
      correct: "Toronto"
    },
    {
      question: "Who is the NBA's all-time leading scorer?",
      answers: ["Kobe Bryant", "Kareem Abdul-Jabbar", "Karl Malone", "Michael Jordan"],
      correct: "Kareem Abdul-Jabbar"
    },
    {
      question: "Who is the all-time leader in assists?",
      answers: ["John Stockton", "Magic Johnson", "Isiah Thomas", "Chris Paul"],
      correct: "John Stockton"
    },
    {
      question: "Which team holds the record for the most wins in a regular season?",
      answers: ["Chicago Bulls", "Golden State Warriors", "San Antonio Spurs", "Miami Heat"],
      correct: "Golden State Warriors"
    },
    {
      question: "Which coach has won the most NBA championships?",
      answers: ["Red Auerbach", "Pat Riley", "Phil Jackson", "Doc Rivers"],
      correct: "Phil Jackson"
    },
    {
      question: "Who invented basketball?",
      answers: ["James Naismith", "Larry O'Brien", "Lavar Ball", "Calvin Cambridge"],
      correct: "James Naismith"
    },
    {
      question: "How many games are played in an NBA season?",
      answers: ["62", "72", "82", "92"],
      correct: "82"
    },
    {
      question: "Which of these NBA players has his jersey retired for a team he never played for?",
      answers: ["Magic Johnson", "Kareem Abdul-Jabbar", "Michael Jordan", "Shaquille O'Neal"],
      correct: "Michael Jordan"
    }
  ]

