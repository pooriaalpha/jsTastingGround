const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('startButton');
const gameOverDisplay = document.getElementById('gameOver');

let score = 0;
let timeLeft = 30;
let gameTimer;
let moleTimer;
let isPlaying = false;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole() {
    const index = Math.floor(Math.random() * holes.length);
    return moles[index];
}

function showMole() {
    const time = randomTime(600, 1000);
    const mole = randomHole();
    mole.classList.add('active');

    setTimeout(() => {
        mole.classList.remove('active');
        if (isPlaying) showMole();
    }, time);
}

function startGame() {
    if (isPlaying) return;
    
    isPlaying = true;
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    gameOverDisplay.style.display = 'none';
    startButton.disabled = true;

    showMole();

    gameTimer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    isPlaying = false;
    clearInterval(gameTimer);
    moles.forEach(mole => mole.classList.remove('active'));
    gameOverDisplay.style.display = 'block';
    startButton.disabled = false;
}

function whack(e) {
    if (!isPlaying) return;
    if (!e.target.classList.contains('active')) return;

    score++;
    scoreDisplay.textContent = score;
    e.target.classList.remove('active');
}

moles.forEach(mole => mole.addEventListener('click', whack));
startButton.addEventListener('click', startGame);