const questionBox = document.querySelector("#question-box");


const geographyButton = document.getElementById("geography-button")
geographyButton.addEventListener("click", startQuiz)


const historyButton = document.getElementById("history-button")
historyButton.addEventListener("click", startQuiz)


const answerButton1 = document.querySelector(".answer-btn-1");
const answerButton2 = document.querySelector(".answer-btn-2");
const answerButton3 = document.querySelector(".answer-btn-3");
const answerButton4 = document.querySelector(".answer-btn-4");

const catName1 = document.getElementById("catName")



function startQuiz() {

  question

  // Hide the theme selection & results screen
  document.getElementById("theme-screen").style.display = "none"
  // document.getElementById("result-screen").style.display = "none"

  // Show the question screen
  document.getElementById("question-screen").style.display = "block"
  selectTheme(this.id.replace("-button", "")); // Get the theme from the button ID

  // Get the selected theme and make it available to displayOptions
  
  displayOptions(this.id.replace("-button", "")); // Pass the theme to displayOptions
  
  // Display the options for the first question
  // Reset the current question index and scores
  nextQuestion()


}


function showResult() {

  if(currentQuestionIndex === 10) {
    document.getElementById("question-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";

    document.getElementById("final-score").textContent = score;
    document.getElementById("result-message").textContent = 
      score >= 70 ? "YOU PASSSSSEEEDDD conrgatzz homie fr fr" : "HAHAHAHA LOSER you failed gg noob lmaooo";

     
  }
  else {
    
    return
}
}


function restartQuiz() {

  
  document.getElementById("question-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "none";
  document.getElementById("theme-screen").style.display = "block";
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("score").textContent = score;
  questionBox.innerHTML = "";
  selectedAnswer = null;

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
  // answerButtons = [] //reset answer buttons
  // answerButtons.innerHTML = ""; // Clear previous options
  
  if (theme === "geography") { 
    options = [...question.options];
    answerButton1.innerHTML = `<p>${options[0]}</p>`;
    answerButton2.innerHTML = `<p>${options[1]}</p>`;
    answerButton3.innerHTML = `<p>${options[2]}</p>`;
    answerButton4.innerHTML = `<p>${options[3]}</p>`;
    catName1.innerHTML = 'Geography';
  }
  
  else if (theme === "history") {
    options = [...question.options];
    console.log(options);
    answerButton1.innerHTML = `<p>${options[0]}</p>`;
    answerButton2.innerHTML = `<p>${options[1]}</p>`;
    answerButton3.innerHTML = `<p>${options[2]}</p>`;
    answerButton4.innerHTML = `<p>${options[3]}</p>`;
    catName1.innerHTML = 'History';
  }

}





function showQuestionScreen() {
  document.getElementById("theme-screen").style.display = "none";
  document.getElementById("question-screen").style.display = "block";
}





// Variable to store selected answer
let selectedAnswer = null;

// Add event listeners to answer buttons
answerButton1.addEventListener("click", () => selectAnswer(0));
answerButton2.addEventListener("click", () => selectAnswer(1));
answerButton3.addEventListener("click", () => selectAnswer(2));
answerButton4.addEventListener("click", () => selectAnswer(3));

// Function to store the selected answer
function selectAnswer(index) {
  selectedAnswer = currentQuestions[currentQuestionIndex].options[index];
  checkAnswer();
}

function checkAnswer() {
  if (selectedAnswer === null) return;
  
  // Get the current question
  const correct = currentQuestions[currentQuestionIndex].answer;
  console.log("Selected Answer:", selectedAnswer);
  console.log("Correct Answer:", correct);
  // Check if the answer is correct
  if (selectedAnswer === correct) {
    score += 10;
    console.log("Correct! Score:", score);
  } else {
   
    console.log("Incorrect! Score:", score);
  }
  
  // Update the score display
  document.getElementById("score").textContent = score;
  
  // Move to next question
  currentQuestionIndex++;
  
  // Reset selected answer for next question
  selectedAnswer = null;
  
  // Check if we've reached the end of questions
  if (currentQuestionIndex >= currentQuestions.length) {
    console.log("Quiz completed. Final score:", score);
    showResult();
    return;
  }
  
  // Display the next question
  nextQuestion();
}

function nextQuestion() {
  // Get the current question
  question = currentQuestions[currentQuestionIndex];
  
  // Display the question
  questionBox.innerHTML = `<h2>${question.question}</h2>`;
  
  // Display the options 
  const theme = currentQuestions === geo ? "geography" : "history";
  displayOptions(theme);



  
  document.getElementById("questionNumber").textContent = currentQuestionIndex + 1;
  showResult();

}











