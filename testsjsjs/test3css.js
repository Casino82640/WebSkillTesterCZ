const questions = [
  {
    topic: "Box model",
    question: "Co je to box model?",
    possibleAnswers: ["JavaScript funkce", "Struktura prvku v CSS", "HTML tag", "Framework"],
    correctAnswer: "Struktura prvku v CSS",
  },
  {
    topic: "Box model",
    question: "Jaké části obsahuje box model?",
    possibleAnswers: ["text, barva, font", "content, padding, border, margin", "width, height", "display, flex"],
    correctAnswer: "content, padding, border, margin",
  },
  {
    topic: "Padding",
    question: "Co je padding?",
    possibleAnswers: ["Vnější mezera", "Vnitřní mezera", "Okraj", "Obsah"],
    correctAnswer: "Vnitřní mezera",
  },
  {
    topic: "Margin",
    question: "Co je margin?",
    possibleAnswers: ["Vnější mezera", "Vnitřní mezera", "Barva", "Obsah"],
    correctAnswer: "Vnější mezera",
  },
  {
    topic: "Border",
    question: "Co je border?",
    possibleAnswers: ["Obsah", "Vnější mezera", "Font", "Okraj prvku"],
    correctAnswer: "Okraj prvku",
  },
  {
    topic: "Box",
    question: "Co dělá box-sizing: border-box;?",
    possibleAnswers: ["Zvětší prvek", "Zahrne padding a border do šířky", "Skryje prvek", "Změní barvu"],
    correctAnswer: "Zahrne padding a border do šířky",
  },
  {
    topic: "Block",
    question: "Co znamená display: block?",
    possibleAnswers: ["Inline prvek", "Zabírá celý prvek", "Skrytý prvek", "Flexbox"],
    correctAnswer: "Zabírá celý prvek",
  },
  {
    topic: "Inline",
    question: "Co znamená display: inline?",
    possibleAnswers: ["Je vedle ostatních prvků", "Zabírá celý řádek", "Skrytý", "Flex"],
    correctAnswer: "Je vedle ostatních prvků",
  },
  {
    topic: "Flex",
    question: "K čemu slouží display: flex?",
    possibleAnswers: ["Barva", "Moderní rozložení prvků", "Animace", "Text"],
    correctAnswer: "Moderní rozložení prvků",
  },
  {
    topic: "@media",
    question: "Co umožnuje @media?",
    possibleAnswers: ["Animace", "Události", "Funkce", "Responzivní design"],
    correctAnswer: "Responzivní design",
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