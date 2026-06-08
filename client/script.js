async function loadTests() {

    const response = await fetch(
        "http://localhost:5000/api/tests"
    );

    const tests = await response.json();

    const container = document.getElementById("tests-container");

    tests.forEach(test => {

        const testElement = document.createElement("div");

        let questionsHTML = "";

        test.questions.forEach((question, index) => {

            let optionsHTML = "";

            question.options.forEach(option => {

                optionsHTML += `
                    <label>

                        <input
                            type="radio"
                            name="${test._id}-${index}"
                            value="${option}"
                        >

                        ${option}

                    </label>

                    <br>
                `;

            });

            questionsHTML += `

                <div class="question">

                    <h3>${question.question}</h3>

                    ${optionsHTML}

                </div>
            `;

        });

        testElement.innerHTML = `

            <div class="question">

                <h2>${test.title}</h2>

                ${questionsHTML}

                <button class="header-button">
                    Submit
                </button>

            </div>
        `;

        const button = testElement.querySelector("button");

        button.addEventListener("click", () => {
            checkAnswers(test);
        });

        container.appendChild(testElement);

    });

}

async function checkAnswers(test) {

    let score = 0;

    test.questions.forEach((question, index) => {

        const selectedAnswer = document.querySelector(

            `input[name="${test._id}-${index}"]:checked`

        );

        if(selectedAnswer) {

            if(selectedAnswer.value === question.correctAnswer) {

                score++;

            }

        }

    });

    alert(`Your score: ${score}/${test.questions.length}`);

    await fetch("http://localhost:5000/api/results", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            testTitle: test.title,

            score: score,

            totalQuestions: test.questions.length

        })

    });

}

loadTests();