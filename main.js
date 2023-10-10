var questions = []
var answers;
var userScore = 0
var quizData = [];
var checked;
var correct;
function generateQuizData() {
    for(var i=0; i<20; i++) {
        var num1 = Math.floor(Math.random() * 10);
        var num2 = Math.floor(Math.random() * 10);
        var correctAnswer = num1 + num2;
        var wrongAnswer1 = correctAnswer + Math.floor(Math.random() * 3) + 1;
        var wrongAnswer2 = correctAnswer - Math.floor(Math.random() * 3) - 1;
        var question = "What is " + num1 + " + " + num2 + "?";
        var answers = [correctAnswer, wrongAnswer1, wrongAnswer2];
        answers.sort(() => Math.random() - 0.5);
        correct = answers.indexOf(correctAnswer);
        quizData.push({question: question, answers: answers, correct: correct});
    }
}
generateQuizData();
function displayQuiz(){ 
var quizDiv = document.getElementById("quiz");
for(var i=0; i<quizData.length; i++) {
    var qDiv = document.createElement("div");
    qDiv.innerHTML = "<p>"+quizData[i].question+"</p>";
    for(var j=0; j<quizData[i].answers.length; j++) {
        var radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "question"+i;
        radio.value = j;
        qDiv.appendChild(radio);
        qDiv.innerHTML += quizData[i].answers[j]+"<br>";
    }
    quizDiv.appendChild(qDiv);
}
}
 
function checkAllSelected() {
  for (var i = 0; i < quizData.length; i++) {
      var radio = document.getElementsByName("question" + i);
    var selected = false;
     for (var j = 0; j < radio.length; j++) {
     if (radio[j].checked) {
          selected = true;
          break;
        }
      }
      if (!selected) {
        return false;
      }
    }
    return true;
  }
  
function submitAnswer() {
  var score = 0;

  if (checkAllSelected()){
    for (var i = 0; i < quizData.length; i++) {
        var radios = document.getElementsByName("question" + i);
        for (var j = 0; j < radios.length; j++) {
            var radio = radios[j];
            if (radio.value == quizData[i].correct && radio.checked) {
                score++;
            }
        }
    }
    
    document.getElementById("submit").classList.add("none");
    document.getElementById("results").innerHTML = "You got " + score + " out of " + quizData.length + " questions";
    document.getElementById("results").classList.remove ("block");
    document.getElementById("restart").classList.remove("hidden");
} else {
    alert("Please select all the questions");
}
}

function keepScore(){
var score = 0;
for (var i = 0; i < quizData.length; i++) {
  var radio = document.getElementsByName("question" + i);
for (var j = 0; j < radio.length; j++) {
  var radioButton = radio[j];
  if (radioButton.value == quizData[i].correct && radioButton.checked) {
    score++;
  }
  else {
    score--;
    
  }
}
}
}