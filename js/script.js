// Core DOM elements
const questionBox = document.querySelector("#question-box");
const catName1 = document.getElementById("catName");
const answerButton1 = document.querySelector(".answer-btn-1");
const answerButton2 = document.querySelector(".answer-btn-2");
const answerButton3 = document.querySelector(".answer-btn-3");
const answerButton4 = document.querySelector(".answer-btn-4");

// Attach theme button listeners (ids end with -button)
["geography","history","foods","science","sports","hardcore"].forEach(t => {
  const btn = document.getElementById(`${t}-button`);
  if (btn) btn.addEventListener("click", startQuiz);
});

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
  document.getElementById("question-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";
  document.getElementById("final-score").textContent = score;
  document.getElementById("result-message").textContent = "TIME'S UP! You ran out of time!";
}



function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.body.classList.remove('hardcore-mode');
  const theme = this.id.replace('-button','');
  selectTheme(theme);
  document.getElementById("theme-screen").style.display = "none";
  document.getElementById("question-screen").style.display = "block";
  document.getElementById("score").textContent = score;
  document.getElementById("questionNumber").textContent = 1;
  startTimer();
}


function showResult() {
  const total = currentQuestions.length;
  if (currentQuestionIndex === total) {
    stopTimer();
    document.getElementById("question-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";
    document.getElementById("final-score").textContent = score;
    const passThreshold = total * 7; // 70%
    document.getElementById("result-message").textContent = score >= passThreshold
      ? "YOU PASSSSSEEEDDD conrgatzz homie fr fr"
      : "HAHAHAHA LOSER you failed gg noob lmaooo";
  }
}


function restartQuiz() {
  stopTimer();
  document.getElementById("question-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "none";
  document.getElementById("theme-screen").style.display = "block";
  currentQuestionIndex = 0;
  score = 0;
  timer = 90;
  document.getElementById("score").textContent = score;
  document.getElementById("timer").textContent = timer;
  questionBox.innerHTML = "";
  selectedAnswer = null;
  document.body.classList.remove('hardcore-mode');
  currentTheme = null;
}


let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let question = null;
let options = [];
let timer = 90;
let timerInterval = null;
let currentTheme = null;

function selectTheme(theme) {
  questionBox.innerHTML = "";
  currentTheme = theme;
  const banks = { geography: geo, history: history, foods: foods, science: science, sports: sports, hardcore: hardcore };
  currentQuestions = banks[theme] || [];
  if (theme === 'hardcore') document.body.classList.add('hardcore-mode');
  currentQuestionIndex = 0;
  question = currentQuestions[0];
  if (question) questionBox.innerHTML = `<h2>${question.question}</h2>`;
  document.getElementById('totalQuestions').textContent = currentQuestions.length;
  displayOptions();
}

// hardcore visuals handled inline

function displayOptions() {
  if (!question) return;
  options = [...question.options];
  const btns = [answerButton1, answerButton2, answerButton3, answerButton4];
  btns.forEach((b,i)=> b.innerHTML = `<p>${options[i]}</p>`);
  const labelMap = { geography: 'Geography', history: 'History', foods: 'Foods', science: 'Science', sports: 'Sports', hardcore: 'HARDCORE' };
  catName1.innerHTML = labelMap[currentTheme] || '';
  if (currentTheme === 'hardcore') document.body.classList.add('hardcore-mode');
}





// Removed showQuestionScreen (redundant)





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
  const correct = currentQuestions[currentQuestionIndex].answer;
  if (selectedAnswer === correct) score += 10;
  document.getElementById("score").textContent = score;
  currentQuestionIndex++;
  selectedAnswer = null;
  if (currentQuestionIndex >= currentQuestions.length) { showResult(); return; }
  nextQuestion();
}

function nextQuestion() {
  question = currentQuestions[currentQuestionIndex];
  questionBox.innerHTML = `<h2>${question.question}</h2>`;
  displayOptions();
  document.getElementById("questionNumber").textContent = currentQuestionIndex + 1;
  document.getElementById("totalQuestions").textContent = currentQuestions.length;
  showResult();
}











