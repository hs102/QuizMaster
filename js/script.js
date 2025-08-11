const questionBox = document.querySelector("#question-box");


const geographyButton = document.getElementById("geography-button")
geographyButton.addEventListener("click", startQuiz)

const historyButton = document.getElementById("history-button")
historyButton.addEventListener("click", startQuiz)

const foodsButton = document.getElementById("foods-button")
foodsButton.addEventListener("click", startQuiz)

const scienceButton = document.getElementById("science-button")
scienceButton.addEventListener("click", startQuiz)

const sportsButton = document.getElementById("sports-button")
sportsButton.addEventListener("click", startQuiz)


const answerButton1 = document.querySelector(".answer-btn-1");
const answerButton2 = document.querySelector(".answer-btn-2");
const answerButton3 = document.querySelector(".answer-btn-3");
const answerButton4 = document.querySelector(".answer-btn-4");

const catName1 = document.getElementById("catName")

// Timer functions
function startTimer() {
  timer = 90; // Reset timer to 90 seconds
  document.getElementById("timer").textContent = timer;
  
  timerInterval = setInterval(() => {
    timer--;
    document.getElementById("timer").textContent = timer;
    
    // Change color when time is running low
    const timerElement = document.getElementById("timer");
    if (timer <= 10) {
      timerElement.style.color = "red";
      timerElement.style.fontWeight = "bold";
    } else if (timer <= 30) {
      timerElement.style.color = "orange";
      timerElement.style.fontWeight = "bold";
    } else {
      timerElement.style.color = "inherit";
      timerElement.style.fontWeight = "inherit";
    }
    
    // Time's up!
    if (timer <= 0) {
      clearInterval(timerInterval);
      timeUp();
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function timeUp() {
  stopTimer();
  // Show lose screen
  document.getElementById("question-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";
  document.getElementById("final-score").textContent = score;
  document.getElementById("result-message").textContent = "TIME'S UP! You ran out of time!";
}



function startQuiz() {
  // Reset the current question index and scores
  currentQuestionIndex = 0;
  score = 0;
  
  // Hide the theme selection & results screen
  document.getElementById("theme-screen").style.display = "none"
  // document.getElementById("result-screen").style.display = "none"

  // Show the question screen
  document.getElementById("question-screen").style.display = "block"
  selectTheme(this.id.replace("-button", "")); // Get the theme from the button ID

  // Get the selected theme and make it available to displayOptions
  displayOptions(this.id.replace("-button", "")); // Pass the theme to displayOptions
  
  // Update the initial display
  document.getElementById("score").textContent = score;
  document.getElementById("questionNumber").textContent = currentQuestionIndex + 1;
  
  // Start the timer
  startTimer();
}


function showResult() {

  if(currentQuestionIndex === 10) {
    stopTimer(); // Stop the timer when quiz is completed
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

  stopTimer(); // Stop the timer
  document.getElementById("question-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "none";
  document.getElementById("theme-screen").style.display = "block";
  currentQuestionIndex = 0;
  score = 0;
  timer = 90; // Reset timer
  document.getElementById("score").textContent = score;
  document.getElementById("timer").textContent = timer;
  questionBox.innerHTML = "";
  selectedAnswer = null;

}


let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let question = null;
let options = [];
let timer = 90;
let timerInterval = null;

function selectTheme(theme) {
  console.log("selectTheme called with theme:", theme);
  questionBox.innerHTML = ""; // Clear previous questions

  // Load questions based on the selected theme
  if (theme === "geography") {
    currentQuestions = geo;
    console.log("Geography questions loaded:", geo);
  } else if (theme === "history") {
    currentQuestions = history;
    console.log("History questions loaded:", history);
  } else if (theme === "foods") {
    currentQuestions = foods;
    console.log("Foods questions loaded:", foods);
  } else if (theme === "science") {
    currentQuestions = science;
    console.log("Science questions loaded:", science);
  } else if (theme === "sports") {
    currentQuestions = sports;
    console.log("Sports questions loaded:", sports);
  } else {
    console.error("Unknown theme selected:", theme);
    return;
  }
  
  // Set the current question to the first question
  currentQuestionIndex = 0;
  question = currentQuestions[currentQuestionIndex];
  console.log("Current question set to:", question);
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
  console.log("displayOptions called with theme:", theme);
  console.log("Current question object:", question);
  
  // answerButtons = [] //reset answer buttons
  // answerButtons.innerHTML = ""; // Clear previous options
  
  if (theme === "geography") { 
    options = [...question.options];
    answerButton1.innerHTML = `<p>${options[0]}</p>`;
    answerButton2.innerHTML = `<p>${options[1]}</p>`;
    answerButton3.innerHTML = `<p>${options[2]}</p>`;
    answerButton4.innerHTML = `<p>${options[3]}</p>`;
    catName1.innerHTML = 'Geography';
    console.log("Geography options displayed:", options);
  }
  
  else if (theme === "history") {
    options = [...question.options];
    console.log(options);
    answerButton1.innerHTML = `<p>${options[0]}</p>`;
    answerButton2.innerHTML = `<p>${options[1]}</p>`;
    answerButton3.innerHTML = `<p>${options[2]}</p>`;
    answerButton4.innerHTML = `<p>${options[3]}</p>`;
    catName1.innerHTML = 'History';
    console.log("History options displayed:", options);
  }

  else if (theme === "foods") {
    options = [...question.options];
    console.log("Foods options:", options);
    answerButton1.innerHTML = `<p>${options[0]}</p>`;
    answerButton2.innerHTML = `<p>${options[1]}</p>`;
    answerButton3.innerHTML = `<p>${options[2]}</p>`;
    answerButton4.innerHTML = `<p>${options[3]}</p>`;
    catName1.innerHTML = 'Foods';
    console.log("Foods options displayed:", options);
  } 
  
  else if (theme === "science") {
    options = [...question.options];
    console.log("Science options:", options);
    answerButton1.innerHTML = `<p>${options[0]}</p>`;
    answerButton2.innerHTML = `<p>${options[1]}</p>`;
    answerButton3.innerHTML = `<p>${options[2]}</p>`;
    answerButton4.innerHTML = `<p>${options[3]}</p>`;
    catName1.innerHTML = 'Science';
    console.log("Science options displayed:", options);
  }
  
  else if (theme === "sports") {
    options = [...question.options];
    console.log("Sports options:", options);
    answerButton1.innerHTML = `<p>${options[0]}</p>`;
    answerButton2.innerHTML = `<p>${options[1]}</p>`;
    answerButton3.innerHTML = `<p>${options[2]}</p>`;
    answerButton4.innerHTML = `<p>${options[3]}</p>`;
    catName1.innerHTML = 'Sports';
    console.log("Sports options displayed:", options);
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
  let theme;
  if (currentQuestions === geo) {
    theme = "geography";
  } else if (currentQuestions === history) {
    theme = "history";
  } else if (currentQuestions === foods) {
    theme = "foods";
  } else if (currentQuestions === science) {
    theme = "science";
  } else if (currentQuestions === sports) {
    theme = "sports";
  }
  displayOptions(theme);



  
  document.getElementById("questionNumber").textContent = currentQuestionIndex + 1;
  showResult();

}











