



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


