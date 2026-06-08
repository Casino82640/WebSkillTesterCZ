const questions = [
  {
    topic: "JavaScript",
    question: "Co je JavaScript?",
    possibleAnswers: ["Programovací jazyk", "Stylovací jazyk", "Databáze", "Server"],
    correctAnswer: "Programovací jazyk",
  },
  {
    topic: "JavaScript",
    question: "Kde běží JavaScript?",
    possibleAnswers: ["Pouze na serveru", "Pouze v databázi", "V prohlížeči", "Pouze v HTML"],
    correctAnswer: "V prohlížeči",
  },
  {
    topic: "Web",
    question: "K čemu slouží JavaScript na webu?",
    possibleAnswers: ["Struktura stránky", "Stylování", "Interaktivita a logika", "Ukládání dat"],
    correctAnswer: "Interaktivita a logika",
  },
  {
    topic: "tag",
    question: "Jaký HTML tag se používá pro vložení JavaScriptu?",
    possibleAnswers: ["js", "script", "code", "javascript"],
    correctAnswer: "script",
  },
  {
    topic: "alert",
    question: "Co se stane při spuštění alert(''Ahoj'')?",
    possibleAnswers: ["Nic", "Zobrazí se upozornění", "Vypiše do HTML", "Uloží data"],
    correctAnswer: "Zobrazí se upozornění",
  },
  {
    topic: "console",
    question: "Co dělá console.log?",
    possibleAnswers: ["Vypíše text do HTML", "Vypíše text do konzole", "Zobrazí alert", "Uloží proměnnou"],
    correctAnswer: "Vypíše text do konzole",
  },
  {
    topic: "prohlížeč",
    question: "Jak prohlížeč pracuje s JavaScriptem?",
    possibleAnswers: ["Ignoruje ho", "Spouští ho po načtení stránky", "Ukládá ho do databáze", "Převádí na CSS"],
    correctAnswer: "Spouští ho po načtení stránky",
  },
  {
    topic: "DOM",
    question: "Co je DOM?",
    possibleAnswers: ["Databáze", "Programovací jazyk", "Stromová struktura HTML dokumentu", "Styl"],
    correctAnswer: "Stromová struktura HTML dokumentu",
  },
  {
    topic: "JavaScript",
    question: "Co může JavaScript dělat?",
    possibleAnswers: ["Měnit obsah stránky", "Měnit server", "Měnit HTML soubor na disku", "Vypnout internet"],
    correctAnswer: "Měnit obsah stránky",
  },
  {
    topic: "Vztah",
    question: "Jaký je vztah mezi HTML, CSS a JavaScriptem?",
    possibleAnswers: ["HTML = styl, CSS = logika", "HTML = struktura, CSS = vzhled, JS = chování", "JS = struktura, HTML = logika", "CSS = programování"],
    correctAnswer: "HTML = struktura, CSS = vzhled, JS = chování",
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