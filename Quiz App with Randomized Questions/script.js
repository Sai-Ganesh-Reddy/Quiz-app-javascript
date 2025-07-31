// 🧠 Quiz Questions Array
const questions = [
  {
    question: "What is the full form of HTML?",
    options: ["HyperText Markup Language", "Hyper Tool Multi Language", "HighText Markup Language", "None"],
    answer: "HyperText Markup Language"
  },
  {
    question: "Which keyword declares a variable in JavaScript?",
    options: ["var", "let", "const", "All of the above"],
    answer: "All of the above"
  },
  {
    question: "What is the output of '2' + 2 in JavaScript?",
    options: ["4", "'4'", "22", "NaN"],
    answer: "22"
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Google", "Mozilla", "Netscape", "Microsoft"],
    answer: "Netscape"
  },
  {
    question: "What does `===` check in JS?",
    options: ["Equality", "Strict equality", "Assignment", "None"],
    answer: "Strict equality"
  },
  {
    question: "Which of these is not a JavaScript framework?",
    options: ["React", "Angular", "Laravel", "Vue"],
    answer: "Laravel"
  },
  {
    question: "How to comment a single line in JavaScript?",
    options: ["<!-- comment -->", "# comment", "// comment", "/* comment */"],
    answer: "// comment"
  }
]

// 🎲 Shuffle Questions Randomly
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}
shuffleArray(questions)

// 🔢 Quiz Variables
let currentQuestion = 0
let score = 0
let timer
let timeLeft = 15

// 🔗 DOM Elements
const questionBox = document.getElementById('questionBox')
const answersBox = document.getElementById('answersBox')
const submitBtn = document.getElementById('submitBtn')
const resultBox = document.getElementById('resultBox')
const scoreDisplay = document.getElementById('score')
const restartBtn = document.getElementById('restartBtn')
const timerDisplay = document.getElementById('time')

// 🚀 Start the first question
loadQuestion()

// 📋 Load a question and options
function loadQuestion() {
  const q = questions[currentQuestion]
  questionBox.innerText = q.question
  answersBox.innerHTML = ''

  q.options.forEach(option => {
    const label = document.createElement('label')
    label.innerHTML = `<input type="radio" name="option" value="${option}"> ${option}`
    answersBox.appendChild(label)
  })

  // Start timer
  timeLeft = 15
  timerDisplay.innerText = timeLeft
  timer = setInterval(countdown, 1000)
}

// ⏳ Countdown function
function countdown() {
  timeLeft--
  timerDisplay.innerText = timeLeft
  if (timeLeft === 0) {
    clearInterval(timer)
    submitAnswer()
  }
}

// 🧾 Submit selected answer
submitBtn.addEventListener('click', () => {
  clearInterval(timer)
  submitAnswer()
})

function submitAnswer() {
  const selected = document.querySelector('input[name="option"]:checked')
  const correctAnswer = questions[currentQuestion].answer

  if (selected && selected.value === correctAnswer) {
    score++
  }

  currentQuestion++

  if (currentQuestion < questions.length) {
    loadQuestion()
  } else {
    endQuiz()
  }
}

// 🏁 Show final result
function endQuiz() {
  document.getElementById('quiz-box').style.display = 'none'
  resultBox.style.display = 'block'
  scoreDisplay.innerText = `${score} / ${questions.length}`
}

// 🔁 Restart quiz from beginning
restartBtn.addEventListener('click', () => {
  currentQuestion = 0
  score = 0
  shuffleArray(questions)
  document.getElementById('quiz-box').style.display = 'block'
  resultBox.style.display = 'none'
  loadQuestion()
})
