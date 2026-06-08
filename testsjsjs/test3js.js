const questions = [
  {
    topic: "if",
    question: "Co dělá if?",
    possibleAnswers: ["Smyčku", "Podmínku", "Funkci", "Event"],
    correctAnswer: "Podmínku",
  },
  {
    topic: "===",
    question: "Co znamená ===?",
    possibleAnswers: ["Přiřazení", "Přisné porovnání", "Součet", "Odčítání"],
    correctAnswer: "Přisné porovnání",
  },
  {
    topic: "switch",
    question: "Co dělá switch?",
    possibleAnswers: ["Smyčku", "Event", "Funkci", "Podmínku s více možnostmi"],
    correctAnswer: "Podmínku s více možnostmi",
  },
  {
    topic: "break",
    question: "K čemu slouží break?",
    possibleAnswers: ["Ukončí program", "Ukončí switch case", "Restaruje", "Ignoruje"],
    correctAnswer: "Ukončí switch case",
  },
  {
    topic: "event",
    question: "Co je event?",
    possibleAnswers: ["Proměnná", "Funkce", "Událodst v prohlížeči", "Objekt"],
    correctAnswer: "Událodst v prohlížeči",
  },
  {
    topic: "event",
    question: "Jak přidáš event?",
    possibleAnswers: ["addEventListener", "addClick", "createEvent", "setEvent"],
    correctAnswer: "addEventListener",
  },
  {
    topic: "click",
    question: "Co je click?",
    possibleAnswers: ["Proměnná", "Funkce", "Událodst", "Objekt"],
    correctAnswer: "Událodst",
  },
  {
    topic: "preventDefault",
    question: "Co dělá preventDefault()?",
    possibleAnswers: ["Spustí event", "Zrruší výchozí chování", "Zavře stránku", "Resetuje"],
    correctAnswer: "Zrruší výchozí chování",
  },
  {
    topic: "event",
    question: "Co je eventTarget?",
    possibleAnswers: ["Typ", "Funkce", "Prvek, na který bylo kliknuto", "Objekt"],
    correctAnswer: "Prvek, na který bylo kliknuto",
  },
  {
    topic: "bubbling",
    question: "Co je bubbling?",
    possibleAnswers: ["Animace", "Smyčka", "Funkce", "Šíření události nahoru DOMem"],
    correctAnswer: "Šíření události nahoru DOMem",
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