const words = ["street", "job", "automobile", "november", "house", "tree", "frog", "cake"];

const containerWord = document.querySelector(".word");
const correctCount = document.querySelector('.correct-count');
const wrongCount = document.querySelector('.wrong-count');
const wordMistakes = document.querySelector('.word-mistakes');
const timer = document.querySelector('#timer');
let seconds = parseInt(timer.textContent.slice(3, 5));
let minutes = parseInt(timer.textContent.slice(0, 2));
let timerId;

function randomWord(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

let word = words[randomWord(0, words.length - 1)];


function renderWord(el) {
    containerWord.innerHTML = el.split("").map((char) => `<span>${char}</span>`).join("");
}

renderWord(word);
let index = 0;
let isRunning = false;

document.addEventListener("keydown", function(event) {

    if (isRunning === false) {
        timerStart();
        isRunning = true;

    }

    const modifiedWord = containerWord.querySelectorAll('span');
    if (modifiedWord[index].textContent === event.key) {
        modifiedWord[index].classList.add("c");
        modifiedWord[index].classList.remove("w");
        index++;
    } else {
        modifiedWord[index].classList.add('w');
        wordMistakes.textContent = ++wordMistakes.textContent;
    }

    if (index === modifiedWord.length) {
        if (wordMistakes.textContent != 0) {
            wrongCount.textContent = ++wrongCount.textContent;
        } else {
            correctCount.textContent = ++correctCount.textContent;
        }
        wordMistakes.textContent = 0;
        index = 0;
        setTimeout(nextWord, 0);
    }
});

function nextWord() {
    stopGame();
    word = words[randomWord(0, words.length - 1)];
    renderWord(word);
}

function stopGame() {
    if (correctCount.textContent == 5) {
        alert(`Вы победили! Ваше время ${timer.textContent}`);
        timerStop();
    } else if (wrongCount.textContent == 5) {
        alert(`Вы проиграли! Ваше время ${timer.textContent}`);
        timerStop();
    }
}

function format(item) {
    if (item < 10) {
        return `0${item}`;
    }
    return item;
}

function timerStart() {
    timerId = setInterval(() => {
        seconds++;
        if (seconds === 59) {
            minutes++;
            seconds = 0;
        }
        timer.textContent = `${format(minutes)}:${format(seconds)}`;
    }, 1000);
}

function timerStop() {
    clearInterval(timerId);
    resetGame();
}

function resetGame() {
    correctCount.textContent = 0;
    wrongCount.textContent = 0;
    wordMistakes.textContent = 0;
    timer.textContent = '00:00';
    seconds = 0;
    minutes = 0;
    isRunning = false;
}