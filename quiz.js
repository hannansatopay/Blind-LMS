var quiz = document.getElementById("quiz");
var ques = document.getElementById("question");
var opt1 = document.getElementById("option1");
var opt2 = document.getElementById("option2");
var opt3 = document.getElementById("option3");
var opt4 = document.getElementById("option4");

var nques = questions.length; //Fetch the questions from questions.js

document.addEventListener('deviceready', function() {

  function startRecognition() {
    window.plugins.speechRecognition.startListening(function(result) {
      if (questions[parseInt(localStorage.question)][5].toLowerCase().includes(result[0].toLowerCase())) {
        localStorage.setItem("score", parseInt(localStorage.score) + 1);
        $("#score").text(parseInt(localStorage.score) + 1);
      }
      if (parseInt(localStorage.question) == nques - 1) {
        TTS.speak({
          text: "Your score is " + String(localStorage.score),
          locale: 'en-IN'
        });
        setTimeout(function() {
          localStorage.clear();
          localStorage.setItem("formfilled", "1");
          window.location.href = "index.html";
        }, 3000);
      } else {
        localStorage.setItem("question", parseInt(localStorage.question) + 1);
        window.location.href = "quiz.html";
      }
    }, {
      language: "en-US",
      showPopup: true
    });
  }

  if (!localStorage.question) {
    localStorage.setItem("question", 0);
    localStorage.setItem("score", 0);
  }

  $("#question").text(questions[parseInt(localStorage.question)][0]);
  $("#option1").text(questions[parseInt(localStorage.question)][1]);
  $("#option2").text(questions[parseInt(localStorage.question)][2]);
  $("#option3").text(questions[parseInt(localStorage.question)][3]);
  $("#option4").text(questions[parseInt(localStorage.question)][4]);
  $("#answer").text(questions[parseInt(localStorage.question)][5]);
  $("#score").text(localStorage.getItem("score"));

  var say = $("#question").text() + " Option A, " +
    $("#option1").text() + " Option B, " +
    $("#option2").text() + " Option C, " +
    $("#option3").text() + " Option D, " +
    $("#option4").text();

  TTS.speak({
    text: say,
    locale: 'en-IN'
  }).then(function() {
    window.plugins.speechRecognition.isRecognitionAvailable(function(available) {
      window.plugins.speechRecognition.hasPermission(function(isGranted) {
        if (isGranted) {
          startRecognition();
        } else {
          window.plugins.speechRecognition.requestPermission(function() {
            startRecognition();
          }, function(err) {
            console.log(err);
          });
        }
      }, function(err) {
        console.log(err);
      });
    }, function(err) {
      console.log(err);
    });
  });

});
