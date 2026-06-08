const questions = [
  {
    topic: "proměnná",
    question: "Co je proměnná?",
    possibleAnswers: ["Místo v pamětí pro uložení hodnoty", "Událost", "Funkce", "Styl"],
    correctAnswer: "Místo v pamětí pro uložení hodnoty",
  },
  {
    topic: "proměnná",
    question: "Jak vytvoříš proměnnou v moderním JS?",
    possibleAnswers: ["create", "var", "let", "define"],
    correctAnswer: "let",
  },
  {
    topic: "const",
    question: "Co znamená const?",
    possibleAnswers: ["Proměnná se může měnit", "Proměnnou nelze přepsat", "Proměnná je prázdná", "Proměnná je funkce"],
    correctAnswer: "Proměnnou nelze přepsat",
  },
  {
    topic: "const",
    question: "Co se stane, pokud napišu const x = 5; x = 10;?",
    possibleAnswers: ["x bude 10", "Nic", "Chyba", "x bude undefined"],
    correctAnswer: "Chyba",
  },
  {
    topic: "hello",
    question: "Jaký je datový typ ''Hello''?",
    possibleAnswers: ["Number", "Boolean", "String", "Object"],
    correctAnswer: "String",
  },
  {
    topic: "true",
    question: "Jaký je datový typ true?",
    possibleAnswers: ["Number", "Boolean", "String", "Null"],
    correctAnswer: "Boolean",
  },
  {
    topic: "typeof",
    question: "Co vrátí typeof 5?",
    possibleAnswers: ["''number''", "''string''", "''int''", "''value''"],
    correctAnswer: "''number''",
  },
  {
    topic: "null",
    question: "Jaký je rozdíl mezi null a undefined?",
    possibleAnswers: ["Jsou stejné", "undefined je číslo", "null je string", "Null je prázdná hodnota, undefined není definovaná"],
    correctAnswer: "Null je prázdná hodnota, undefined není definovaná",
  },
  {
    topic: "něco",
    question: "Co se stane, pokud udělam ''5'' + 1?",
    possibleAnswers: ["6", "''6''", "''51''", "Error"],
    correctAnswer: "''51''",
  },
  {
    topic: "něco",
    question: "Co se stane, pokud let a = 5; let b = a; b = 10;?",
    possibleAnswers: ["a = 10", "a = 5", "chyba", "undefined"],
    correctAnswer: "a = 5",
  },
];

const quizProgress = document.getElementById("quizProgress");
const questionContainer = document.getElementById("questionContainer");
const answerContainer = document.getElementById("answerContainer");

let currentQuestionIndex = 0;
let score = 0;

function handleQuestion(index) {
  quizProgress.innerHTML = "";
  questions.forEach(() => {
    quizProgress.innerHTML += "<span></span>";
  });

  const spans = document.querySelectorAll("#quizProgress span");
  for (let i = 0; i <= index; i++) {
    spans[i].classList.add("seen");
  }

  questionContainer.innerHTML = `
    <p>${questions[index].topic}</p>
    <p>${questions[index].question}</p>
  `;

  answerContainer.innerHTML = "";

  questions[index].possibleAnswers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer;
    answerContainer.appendChild(button);

    button.addEventListener("click", () => {
      const allButtons = document.querySelectorAll("#answerContainer button");
      allButtons.forEach(btn => btn.disabled = true);

      if (answer === questions[index].correctAnswer) {
        button.classList.add("correct");
        score++;
      } else {
        button.classList.add("wrong");

        allButtons.forEach(btn => {
          if (btn.textContent === questions[index].correctAnswer) {
            btn.classList.add("correct");
          }
        });
      }

      setTimeout(() => {
        if (currentQuestionIndex === questions.length - 1) {
          showResult();
        } else {
          currentQuestionIndex++;
          handleQuestion(currentQuestionIndex);
        }
      }, 1500);
    });
  });
}

function showResult() {
  quizProgress.innerHTML = "";
  questionContainer.innerHTML = `
    <h2>Test dokončen</h2>
    <p>Tvoje skóre:</p>
    <h1>${score} / ${questions.length}</h1>
  `;

  answerContainer.innerHTML = `
    <button id="restartBtn">Restartovat test</button>
    <a href="../lessonsjs/lessons-js.html"><button id="BackBtn">Zpět</button></a>
  `;

  document.getElementById("restartBtn").addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    handleQuestion(currentQuestionIndex);
  });
  document.getElementById("BackBtn").addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    handleQuestion(currentQuestionIndex);
  });
}

handleQuestion(currentQuestionIndex);