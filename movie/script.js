const quotes = [
    "“The greatest thing you'll ever learn is just to love and be loved in return.” — Moulin Rouge",
    "“You had me at hello.” — Jerry Maguire",
    "“I'm king of the world!” — Titanic",
    "“Here's looking at you, kid.” — Casablanca",
    "“To infinity and beyond!” — Toy Story"
];

const questions = [
    {
        question: "Who directed the movie 'Inception'?",
        answers: [
            { text: "Christopher Nolan", correct: true },
            { text: "Steven Spielberg", correct: false },
            { text: "James Cameron", correct: false },
            { text: "Quentin Tarantino", correct: false }
        ]
    },
    {
        question: "In which movie does the character 'Forrest Gump' appear?",
        answers: [
            { text: "The Shawshank Redemption", correct: false },
            { text: "Forrest Gump", correct: true },
            { text: "The Godfather", correct: false },
            { text: "Gladiator", correct: false }
        ]
    },
    {
        question: "Which movie features the quote, 'I see dead people'?",
        answers: [
            { text: "The Sixth Sense", correct: true },
            { text: "The Others", correct: false },
            { text: "The Ring", correct: false },
            { text: "A Nightmare on Elm Street", correct: false }
        ]
    },
    {
        question: "Who played Jack Dawson in Titanic?",
        answers: [
            { text: "Brad Pitt", correct: false },
            { text: "Leonardo DiCaprio", correct: true },
            { text: "Johnny Depp", correct: false },
            { text: "Matt Damon", correct: false }
        ]
    },
    {
        question: "What is the name of the wizarding school in Harry Potter?",
        answers: [
            { text: "Hogwarts", correct: true },
            { text: "Durmstrang", correct: false },
            { text: "Beauxbatons", correct: false },
            { text: "Ilvermorny", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;

function generateQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("quoteDisplay").innerText = randomQuote;
}

function showCharacters(movie) {
    const characterCards = document.querySelectorAll(".character-card");
    characterCards.forEach(card => {
        card.classList.add("hidden");
        if (card.dataset.movie === movie) {
            card.classList.remove("hidden");
        }
    });
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timeLeft').innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up! Moving to the next question.");
            nextQuestion(); // Automatically moves to the next question when time is up
        }
    }, 1000);
}

function nextQuestion() {
    clearInterval(timer);
    timeLeft = 30; // Reset time for the next question
    startTimer(); // Start the timer for the new question

    const questionContainer = document.getElementById('questionContainer');
    const answerButtons = document.getElementById('answerButtons');
    answerButtons.innerHTML = '';
    
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        document.getElementById('question').innerText = currentQuestion.question;
        
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectAnswer(answer));
            answerButtons.appendChild(button);
        });
    } else {
        showScore();
    }
}

function selectAnswer(answer) {
    if (answer.correct) {
        score++;
    }
    currentQuestionIndex++;
    nextQuestion();
}

function showScore() {
    clearInterval(timer);
    document.getElementById('finalScore').innerText = `${score} out of ${questions.length}`;
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('resultContainer').classList.remove('hidden');
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30; // Reset time for the new quiz
    document.getElementById('quiz-container').classList.remove('hidden');
    document.getElementById('resultContainer').classList.add('hidden');
    nextQuestion(); // Start the quiz again
}

document.addEventListener('DOMContentLoaded', () => {
    generateQuote(); // Display a random quote
    nextQuestion(); // Start the first question
});
