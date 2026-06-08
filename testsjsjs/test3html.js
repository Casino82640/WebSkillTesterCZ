const questions = [
  {
    topic: "Odkaz",
    question: "Jaký tag se používá pro odkaz?",
    possibleAnswers: ["<link>", "<a>", "<href>", "<url>"],
    correctAnswer: "<a>",
  },
  {
    topic: "URL",
    question: "Jaký atribut obsahuje URL?",
    possibleAnswers: ["src", "link", "url", "href"],
    correctAnswer: "href",
  },
  {
    topic: "Obrázek",
    question: "Jak vložíš obrázek?",
    possibleAnswers: ["<img>", "<image>", "<pic>", "<src>"],
    correctAnswer: "<img>",
  },
  {
    topic: "alt",
    question: "K čemu slouží atribut alt?",
    possibleAnswers: ["Velikost obrázku", "Popis obrázku", "Barva", "Odkaz"],
    correctAnswer: "Popis obrázku",
  },
  {
    topic: "_blank",
    question: "Co dělá target=_blank?",
    possibleAnswers: ["Zavře stránku", "Změní barvu", "Odstraní odkaz", "Otevře nový panel"],
    correctAnswer: "Otevře nový panel",
  },
  {
    topic: "Relativní cesta",
    question: "Relativní cesta znamená:",
    possibleAnswers: ["URL", "IP adresa", "Cesta od projektu", "Server"],
    correctAnswer: "Cesta od projektu",
  },
  {
    topic: "Absolutní cesta",
    question: "Absolutní cesta je:",
    possibleAnswers: ["Lokální", "URL adresa", "Bez cesty", "Relativní"],
    correctAnswer: "URL adresa",
  },
  {
    topic: "img",
    question: "Jaký atribut má img?",
    possibleAnswers: ["href", "src", "link", "url"],
    correctAnswer: "src",
  },
  {
    topic: "iframe",
    question: "K čemu slouží iframe?",
    possibleAnswers: ["Obrázek", "Styl", "Vložení stránky do stránky", "Script"],
    correctAnswer: "Vložení stránky do stránky",
  },
  {
    topic: "Atributy",
    question: "Atributy se zapisují:",
    possibleAnswers: ["Mimo tag", "Do closing tagu", "Do otevíracího tagu", "Do CSS"],
    correctAnswer: "Do otevíracího tagu",
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