
// Pulled all classes or ID's

const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");


let currentQuestion = {};
let correctAnswers = true;
let score = 0;
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
        question: " What is the capital of United States ? ",
        choice1: "Washington DC",
        choice2: "Hawaii",
        choice3: "Little havana",
        Choice4: "Texas",
        answer: 1,

    },
    {
        question: " In the marvel universe, how many Infinity Stones are there ? ",
        choice1: " 10",
        choice2: "7",
        choice3: "12",
        Choice4: "6",
        answer: 4,
    },
    {
        question: " What is Ricks last name in “Rick and Morty”?? ",
        choice1: "Smith",
        choice2: "Sanchez",
        choice3: "Krombopulos",
        Choice4: "Slimslom",
        answer: 2,
    },
    {
        question: " Who is the founder of Microsoft? ",
        choice1: "Steve Jobs",
        choice2: "Jeff Bezos",
        choice3: "Barack Obama",
        Choice4: "Bill Gates",
        answer: 4,
    }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();

}

getNewQuestions = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score)

        return window.location.assign('/end.html');
    }

    // This is supposed to calculate what question the user is in and correspond to which percentage the user is in.
    questionCounter++
    // progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`


    // calculates the question value
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    // detects the question it'll ask
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    })


    availableQuestions.splice(questionsIndex, 1);

    correctAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!correctAnswers) return;

        correctAnswers = false
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" :
            "incorrect";

        if (classToApply === "correct") {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply);


        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestions()

        }, 1000)


    })

})

incrementScore = num => {
    score +=num;
    scoreText.innerText = score
}

startQuiz()
