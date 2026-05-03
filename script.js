// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;// this variable is used to keep track of the current question index in the quizQuestions array
let score = 0;// this variable is used to keep track of the user's score
let answersDisabled = false;// this variable is used to disable answer buttons after a user selects an answer

totalQuestionsSpan.textContent = quizQuestions.length;// this line sets the text content of the totalQuestionsSpan element to the length of the quizQuestions array, which represents the total number of questions in the quiz
maxScoreSpan.textContent = quizQuestions.length;// 

// event listeners
startButton.addEventListener("click",   startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");// this line removes the "active" class from the startScreen element, hiding it from view
  quizScreen.classList.add("active");// this line adds the "active" class to the quizScreen element, making it visible

    showQuestion();// this function is called to display the first question of the quiz when the user clicks the start button
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];// this is used to get the current question object from the quizQuestions array based on the currentQuestionIndex variable`
  const delayTime = 150;

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;// this line sets the text content of the questionText element to the question property of the currentQuestion object, which displays the current question on the quiz screen

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer, index) => {//
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;// this line sets a custom data attribute called "correct" on the button element, which is used to indicate whether the answer is correct or not. The value of this attribute is set to the correct property of the answer object, which is a boolean value (true or false)

    button.addEventListener("click", selectAnswer);
    
    setTimeout(() => {
        button.classList.add("fade-in");// excutable after the delay time, this is used to create a fade-in effect for the answer buttons
    }, index * delayTime);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
    if (answersDisabled) return;// this line checks if the answersDisabled variable is true, which means that the user has already selected an answer and the buttons are disabled. If this is the case, the function will return early and not execute any further code, preventing multiple selections and ensuring that only one answer can be selected per question.

    answersDisabled = true;

    const selectedButton = event.target;// this line gets the button element that was clicked by the user, which is the target of the click event. The selectedButton variable is used to reference this button element in the rest of the function, allowing us to check if the selected answer is correct and to apply the appropriate styles to the buttons.
    const isCorrect = selectedButton.dataset.correct === "true";// this line checks if the "correct" data attribute of the selected button is equal to the string "true". Since the dataset properties are always strings, we compare it to the string "true" to determine if the selected answer is correct or not. The result of this comparison is stored in the isCorrect variable, which will be true if the answer is correct and false if it is not.

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
    Array.from(answersContainer.children).forEach((button) => {// this line iterates over all the child elements of the answersContainer, which are the answer buttons. For each button, it checks if the button's "correct" data attribute is equal to "true". If it is, it adds the "correct" class to that button, which can be used to style it differently (e.g., with a green background). If the button is not correct but is the one that was selected by the user, it adds the "incorrect" class to that button, which can be used to style it differently (e.g., with a red background). This provides visual feedback to the user about which answer was correct and which one they selected.
        if (button.dataset.correct === "true") {// correct button: this line checks if the "correct" data attribute of the button is equal to the string "true". If it is, it means that this button represents the correct answer for the current question.
      button.classList.add("correct");
        } else if (button === selectedButton) {// button the user clicks this line checks if the current button in the loop is the same as the button that was clicked by the user (the selectedButton). If it is, it means that this button represents the answer that the user selected, and since it's not correct (as checked in the previous condition), it adds the "incorrect" class to this button to indicate that it was the wrong choice.
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

    nextQuestions();
}
function nextQuestions() {
    setTimeout(() => {
        currentQuestionIndex++;

        // check if there are more questions or if the quiz is over
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 2000);
}
function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
