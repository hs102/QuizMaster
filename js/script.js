



const geographyButton = document.getElementById("geography-button")
geographyButton.addEventListener("click", startQuiz)


const historyButton = document.getElementById("history-button")
historyButton.addEventListener("click", startQuiz)







function startQuiz() {
  // Hide the theme selection screen
  document.getElementById("theme-screen").style.display = "none"

  // Show the question screen
  document.getElementById("question-screen").style.display = "block"
}


let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

function selectTheme(theme) {
  fetch(`assets/data/${theme}.json`)
    .then(response => response.json())
    .then(data => {
      currentQuestions = data;
      currentQuestionIndex = 0;
      score = 0;
      showQuestionScreen();
      displayQuestion();
    })
    .catch(error => {
      console.error("Failed to load questions:", error);
    });
}

