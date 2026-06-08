const questions = [
  {
    topic: "počet",
    question: "Kolik existuje úrovní nadpisů?",
    possibleAnswers: ["3", "5", "6", "10"],
    correctAnswer: "6",
  },
  {
    topic: "tag",
    question: "Který tag je hlavní nadpis?",
    possibleAnswers: ["<h6>", "<h1>", "<head>", "<title>"],
    correctAnswer: "<h1>",
  },
  {
    topic: "p",
    question: "Co dělá p?",
    possibleAnswers: ["Obrázek", "Odkaz", "Odstavec textu", "Napdis"],
    correctAnswer: "Odstavec textu",
  },
  {
    topic: "blok",
    question: "Který prvek je blokový?",
    possibleAnswers: ["<span>", "<a>", "<div>", "<strong>"],
    correctAnswer: "<div>",
  },
  {
    topic: "strong",
    question: "K čemu slouží strong?",
    possibleAnswers: ["Odkaz", "Tučný text", "Obrázek", "Tabulka"],
    correctAnswer: "Tučný text",
  },
  {
    topic: "html",
    question: "Co znamená semantický HTML?",
    possibleAnswers: ["Kratký kod", "Významová struktura", "Rychlý kod", "Stylovaný kod"],
    correctAnswer: "Významová struktura",
  },
  {
    topic: "inline",
    question: "Který prvek je inline?",
    possibleAnswers: ["Kratký kod", "Rychlý kod", "Stylovaný kod", "Významová struktura"],
    correctAnswer: "Významová struktura",
  },
  {
    topic: "ul",
    question: "K čemu slouží ul?",
    possibleAnswers: ["Tabulka", "Nadpis", "Neuspořádaný seznam", "Obrázek"],
    correctAnswer: "Neuspořádaný seznam",
  },
  {
    topic: "ol",
    question: "K čemu slouží ol?",
    possibleAnswers: ["Číslovaný seznam", "Obrázek", "Odkaz", "Styl"],
    correctAnswer: "Číslovaný seznam",
  },
  {
    topic: "br",
    question: "Co dělá br?",
    possibleAnswers: ["Nový odstavec", "Zalomení řádku", "Nadpis", "Odkaz"],
    correctAnswer: "Zalomení řádku",
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
    <a href="../lessonshtml/lessons-html.html"><button id="BackBtn">Zpět</button></a>
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