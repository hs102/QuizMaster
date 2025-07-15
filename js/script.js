const questionBox = document.querySelector("#question-box");


const geographyButton = document.getElementById("geography-button")
geographyButton.addEventListener("click", startQuiz)


const historyButton = document.getElementById("history-button")
historyButton.addEventListener("click", startQuiz)


const answerButton1 = document.querySelector(".answer-btn-1");
const answerButton2 = document.querySelector(".answer-btn-2");
const answerButton3 = document.querySelector(".answer-btn-3");
const answerButton4 = document.querySelector(".answer-btn-4");




function startQuiz() {
  // Hide the theme selection screen
  document.getElementById("theme-screen").style.display = "none"

  // Show the question screen
  document.getElementById("question-screen").style.display = "block"
  selectTheme(this.id.replace("-button", "")); // Get the theme from the button ID

  // Get the selected theme and make it available to displayOptions
  
  displayOptions(this.id.replace("-button", "")); // Pass the theme to displayOptions
  
  // Display the options for the first question
  // Reset the current question index and scores
  nextQuestion()


}


let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let question = null;
let options = [];

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
  return currentQuestionIndex += 1;

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

function displayOptions(theme) {
  answerButtons = [] //reset answer buttons
  answerButtons.innerHTML = ""; // Clear previous options
  
  if (theme === "geography") { 
    options = [...question.options];
    answerButton1.innerHTML = `<p>${options[0]}</p>`;
    answerButton2.innerHTML = `<p>${options[1]}</p>`;
    answerButton3.innerHTML = `<p>${options[2]}</p>`;
    answerButton4.innerHTML = `<p>${options[3]}</p>`;
  }
  
  else if (theme === "history") {
    options = [...question.options];
    console.log(options);
    answerButton1.innerHTML = `<p>${options[0]}</p>`;
    answerButton2.innerHTML = `<p>${options[1]}</p>`;
    answerButton3.innerHTML = `<p>${options[2]}</p>`;
    answerButton4.innerHTML = `<p>${options[3]}</p>`;
  }

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




function nextQuestion() {
  currentQuestionIndex++; 
  if (currentQuestionIndex < currentQuestions.length) {
    question = currentQuestions[currentQuestionIndex];
    questionBox.innerHTML = `<h2>${question.question}</h2>`;
    displayOptions(currentQuestions === geo ? "geography" : "history");
  }
}

// Add event listeners to answer buttons
answerButton1.addEventListener("click", nextQuestion);
answerButton2.addEventListener("click", nextQuestion);
answerButton3.addEventListener("click", nextQuestion);
answerButton4.addEventListener("click", nextQuestion);



// function showResult() {
//   document.getElementById("question-screen").style.display = "none";
//   document.getElementById("result-screen").style.display = "block";

//   document.getElementById("final-score").textContent = score;
//   document.getElementById("result-message").textContent = 
//     score >= 60 ? "YOU PASSSSSEEEDDD" : "You failed!";
// }


