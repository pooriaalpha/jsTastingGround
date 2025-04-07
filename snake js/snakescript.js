const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const unitSize = 20;
canvas.width = 400;
canvas.height = 400;

let snake = [
    { x: unitSize * 5, y: unitSize * 5 },
    { x: unitSize * 4, y: unitSize * 5 },
    { x: unitSize * 3, y: unitSize * 5 }
];

let direction = 'RIGHT';
let food = generateFood();
let score = 0;

document.addEventListener('keydown', changeDirection);
let gameActive = true;

function gameLoop() {
    if (isGameOver()) {
        gameActive = false;
        alert('Game Over! Your score: ' + score);
        resetGame();
        gameActive = true;
        setTimeout(gameLoop, 100);
        return;
    }
    
    if (gameActive) {
        updateSnake();
        draw();
        setTimeout(gameLoop, 100);
    }
}

function updateSnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    switch (direction) {
        case 'RIGHT': head.x += unitSize; break;
        case 'LEFT': head.x -= unitSize; break;
        case 'UP': head.y -= unitSize; break;
        case 'DOWN': head.y += unitSize; break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        score++;
    } else {
        snake.pop();
    }
}

function changeDirection(event) {
    const key = event.keyCode;
    const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

    switch (key) {
        case LEFT:
            if (direction !== 'RIGHT') direction = 'LEFT';
            break;
        case UP:
            if (direction !== 'DOWN') direction = 'UP';
            break;
        case RIGHT:
            if (direction !== 'LEFT') direction = 'RIGHT';
            break;
        case DOWN:
            if (direction !== 'UP') direction = 'DOWN';
            break;
    }
}

function isGameOver() {
    const head = snake[0];

    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
        return true;
    }

    for (let i = 4; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function generateFood() {
    let x, y;
    do {
        x = Math.floor(Math.random() * (canvas.width / unitSize)) * unitSize;
        y = Math.floor(Math.random() * (canvas.height / unitSize)) * unitSize;
    } while (snake.some(segment => segment.x === x && segment.y === y));

    return { x, y };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let segment of snake) {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, unitSize, unitSize);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, unitSize, unitSize);
}

function resetGame() {
    snake = [
        { x: unitSize * 5, y: unitSize * 5 },
        { x: unitSize * 4, y: unitSize * 5 },
        { x: unitSize * 3, y: unitSize * 5 }
    ];
    direction = 'RIGHT';
    food = generateFood();
    score = 0;
    // gameLoop();

}

gameLoop();
