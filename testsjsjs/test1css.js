const questions = [
  {
    topic: "CSS",
    question: "Co znamená CSS?",
    possibleAnswers: ["Creative Style System", "Cascading Style Sheets", "Color Style Sheet", "Computer Style System"],
    correctAnswer: "Cascading Style Sheets",
  },
  {
    topic: "CSS",
    question: "K čemu slouží CSS?",
    possibleAnswers: ["Struktura", "Logika", "Stylování", "Server"],
    correctAnswer: "Stylování",
  },
  {
    topic: "Pravidlo",
    question: "Jak vypadá CSS pravidlo?",
    possibleAnswers: ["tag {}", "selector { property: value; }", "style()", "css()"],
    correctAnswer: "selector { property: value; }",
  },
  {
    topic: "Způsob",
    question: "Který způsob je nejlepší?",
    possibleAnswers: ["Inline", "Interní", "Externí CSS", "Script"],
    correctAnswer: "Externí CSS",
  },
  {
    topic: "Selektor",
    question: "Co je selektor?",
    possibleAnswers: ["Funkce", "Výběr prvků", "Proměnná", "Event"],
    correctAnswer: "Výběr prvků",
  },
  {
    topic: "CSS",
    question: "CSS se aplikuje:",
    possibleAnswers: ["Náhodně", "Podle selektorů", "Podle JS", "Podle serveru"],
    correctAnswer: "Podle selektorů",
  },
  {
    topic: "CSS",
    question: "CSS mění:",
    possibleAnswers: ["Design stránky", "HTML strukturu", "Logiku", "Server"],
    correctAnswer: "Design stránky",
  },
  {
    topic: "CSS",
    question: "Kde se píše externí CSS?",
    possibleAnswers: [".html", ".js", ".css", ".txt"],
    correctAnswer: ".css",
  },
  {
    topic: "CSS",
    question: "CSS je:",
    possibleAnswers: ["Programovací jazyk", "Stylovací jazyk", "Databáze", "Framework"],
    correctAnswer: "Stylovací jazyk",
  },
  {
    topic: "Zápis",
    question: "Který zápis je spravný?",
    possibleAnswers: ["color = red", "color-red", "set color red", "color: red;"],
    correctAnswer: "color: red;",
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
    <a href="../lessonscss/lessons-css.html"><button id="BackBtn">Zpět</button></a>
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