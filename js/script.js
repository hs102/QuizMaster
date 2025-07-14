const questionBox = document.querySelector("#question-box");


const geographyButton = document.getElementById("geography-button")
geographyButton.addEventListener("click", startQuiz)


const historyButton = document.getElementById("history-button")
historyButton.addEventListener("click", startQuiz)







function startQuiz() {
  // Hide the theme selection screen
  document.getElementById("theme-screen").style.display = "none"

  // Show the question screen
  document.getElementById("question-screen").style.display = "block"
  selectTheme(this.id.replace("-button", "")); // Get the theme from the button ID

  // Reset the current question index and scores
  currentQuestionIndex = 0;
  score = 0;
}


let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let question = null;

function selectTheme(theme) {
questionBox.innerHTML = ""; // Clear previous questions

  // Load questions based on the selected theme
  if (theme === "geography") {
    currentQuestions = geo;
  } else if (theme === "history") {
    currentQuestions = history;
  } else {
    console.error("Unknown theme selected:", theme);
    return;
  }
  question = currentQuestions[0]
  questionBox.innerHTML = `<h2>${question.question}</h2>`;

  // fetch(`assets/data/${theme}.json`)
  //   .then(response => response.json())
  //   .then(data => {
  //     currentQuestions = data;
  //     currentQuestionIndex = 0;
  //     score = 0;
  //     showQuestionScreen();
  //     displayQuestion();
  //   })
  //   .catch(error => {
  //     console.error("Failed to load questions:", error);
  //   });
}


function showQuestionScreen() {
  document.getElementById("theme-screen").style.display = "none";
  document.getElementById("question-screen").style.display = "block";
}





function selectAnswer(selected) {
  const correct = currentQuestions[currentQuestionIndex].answer;

  if (selected === correct) {
    score += 10;
  } else {
    score -= 5;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < currentQuestions.length) {
    displayQuestion();
  } else {
    showResult();
  }
}


function showResult() {
  document.getElementById("question-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";

  document.getElementById("final-score").textContent = score;
  document.getElementById("result-message").textContent = 
    score >= 60 ? "YOU PASSSSSEEEDDD" : "You failed!";
}
