const questions = [
  {
    topic: ".class",
    question: "Co je .class?",
    possibleAnswers: ["ID", "Třída", "Funkce", "Tag"],
    correctAnswer: "Třída",
  },
  {
    topic: "#id",
    question: "Co je #id?",
    possibleAnswers: ["Třída", "ID selektor", "Tag", "Proměnná"],
    correctAnswer: "ID selektor",
  },
  {
    topic: "Priorita",
    question: "Co má vyšší prioritu?",
    possibleAnswers: ["Element", "Class", "ID", "Inline"],
    correctAnswer: "ID",
  },
  {
    topic: "Dědičnost",
    question: "Co znamená dědičnost?",
    possibleAnswers: ["Styl se kopíruje z rodiče", "Styl se maže", "Styl se mění", "Styl se resetuje"],
    correctAnswer: "Styl se kopíruje z rodiče",
  },
  {
    topic: "div",
    question: "Který selektor vybere všechny p uvnitř div?",
    possibleAnswers: ["div > p", "div p", "p div", "div + p"],
    correctAnswer: "div p",
  },
  {
    topic: "div",
    question: "Co znamená selektor div > p?",
    possibleAnswers: ["Všechny p prvky", "Přimé potomky p uvnitř div", "Všechny div uvnitř p", "První p na stránce"],
    correctAnswer: "Přimé potomky p uvnitř div",
  },
  {
    topic: "selektor",
    question: "Co dělá * selektor?",
    possibleAnswers: ["Vybere první prvek", "Vybere všechny prvky", "Vybere pouze div", "Vybere pouze text"],
    correctAnswer: "Vybere všechny prvky",
  },
  {
    topic: "hover",
    question: "Co znamená pseudo-třída :hover?",
    possibleAnswers: ["Kliknutí", "Najetí myší", "Fokus", "Scroll"],
    correctAnswer: "Najetí myší",
  },
  {
    topic: "pseudo-element",
    question: "Co je pseudo-element?",
    possibleAnswers: ["Skutečný HTML prvek", "Virtuální část prvku", "CSS proměnná", "Funkce"],
    correctAnswer: "Virtuální část prvku",
  },
  {
    topic: "pseudo-element",
    question: "Který zápis je pseudo-element?",
    possibleAnswers: [":hover", "::before", ".class", "#id"],
    correctAnswer: "::before",
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