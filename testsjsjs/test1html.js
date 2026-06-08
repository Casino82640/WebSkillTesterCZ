const questions = [
  {
    topic: "rok",
    question: "V kterém roce vzniklo HTML?",
    possibleAnswers: ["1989", "1991", "1995"],
    correctAnswer: "1991",
  },
  {
    topic: "firma",
    question: "Kde vzniklo HTML?",
    possibleAnswers: ["Microsoft", "Google", "CERN"],
    correctAnswer: "CERN",
  },
  {
    topic: "typ jazyka",
    question: "HTML je:",
    possibleAnswers: ["Programovací jazyk", "Značkovací jazyk", "Databázový jazyk"],
    correctAnswer: "Značkovací jazyk",
  },
  {
    topic: "verze",
    question: "Která verze je moderní standard?",
    possibleAnswers: ["HTML2", "HTML4", "HTML5"],
    correctAnswer: "HTML5",
  },
  {
    topic: "přípona",
    question: "HTML soubory mají příponu:",
    possibleAnswers: [".html", ".css", ".js"],
    correctAnswer: ".html",
  },
  {
    topic: "WWW",
    question: "WWW znamená:",
    possibleAnswers: ["World Web Wide", "World Wide Web", "Wide World Web"],
    correctAnswer: "World Wide Web",
  },
  {
    topic: "DOM",
    question: "Co je DOM?",
    possibleAnswers: ["Programovací jazyk", "Struktura dokumentu v paměti", "CSS styl", "Server"],
    correctAnswer: "Struktura dokumentu v paměti",
  },
  {
    topic: "HTML",
    question: "Jaký je účel HTML?",
    possibleAnswers: ["Vytvářet design", "Vytvářet strukturu stránky", "Přidávat animace", "Spravovat server"],
    correctAnswer: "Vytvářet strukturu stránky",
  },
  {
    topic: "Hypertext",
    question: "Co znamená hypertext?",
    possibleAnswers: ["Velký text", "Text bez formátování", "Text propojený odkazy", "Text s obrázky"],
    correctAnswer: "Text propojený odkazy",
  },
  {
    topic: "head",
    question: "K čemu slouží &lt;head&gt;?",
    possibleAnswers: ["Zobrazení textu", "Obsah stránky", "Metadata a nastavení", "Obrázky"],
    correctAnswer: "Metadata a nastavení",
  }
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