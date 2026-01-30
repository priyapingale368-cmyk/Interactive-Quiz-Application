const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language"
    ],
    correct: 0
  },
  {
    question: "Which language is used for styling web pages?",
    answers: ["HTML", "JQuery", "CSS", "XML"],
    correct: 2
  },
  {
    question: "Which is not a JavaScript framework?",
    answers: ["React", "Angular", "Vue", "Django"],
    correct: 3
  },
  {
    question: "Which tool is used to inspect elements and debug code in a typical browser like Chrome or similar browsers?",
    answers: ["GitHub","Web Server","Developers Tools","DNS"],
    correct: 2
  },
  {
    question: "Which part of web development is concerned with what users directly see and interact with?",
    answers: ["Back-End", "Database", "Front-end", "Full-Stack"],
    correct: 2
  },

];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const timerEl = document.getElementById("timer");
const resultEl = document.getElementById("result");
const quizEl = document.getElementById("quiz");
const scoreEl = document.getElementById("score");
const questionCountEl = document.getElementById("questionCount");
const progressEl = document.getElementById("progress");

/* Start quiz */
loadQuestion();
startTimer();   // 🔹 timer starts ONLY ONCE

function startTimer() {
  timerEl.textContent = `Time: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timer);
      showResult();   // 🔹 end quiz when time is over
    }
  }, 1000);
}

function loadQuestion() {
  feedbackEl.textContent = "";
  nextBtn.disabled = true;
  answersEl.innerHTML = "";

  questionEl.textContent = questions[currentQuestion].question;
  questionCountEl.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  progressEl.style.width =
    ((currentQuestion + 1) / questions.length) * 100 + "%";

  questions[currentQuestion].answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => checkAnswer(btn, index);
    answersEl.appendChild(btn);
  });
}

function checkAnswer(button, index) {
  const buttons = answersEl.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);

  if (index === questions[currentQuestion].correct) {
    button.classList.add("correct");
    feedbackEl.textContent = "Correct!";
    score++;
  } else {
    button.classList.add("wrong");
    buttons[questions[currentQuestion].correct].classList.add("correct");
    feedbackEl.textContent = "Wrong answer";
  }

  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  clearInterval(timer);
  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${questions.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  timeLeft = 30;

  quizEl.classList.remove("hidden");
  resultEl.classList.add("hidden");

  loadQuestion();
  startTimer();   // 🔹 restart timer once again
}
