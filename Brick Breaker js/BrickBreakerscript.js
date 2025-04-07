const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

// Game variables
let score = 0;
let gameInterval;
let gameRunning = false;

// Ball properties
const ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    dx: 4,
    dy: -4,
    radius: 6
};

// Paddle properties
const paddle = {
    width: 78,
    height: 10,
    x: (canvas.width - 78) / 2
};

// Brick properties
const brickRowCount = 5;
const brickColumnCount = 8;
const brickWidth = 50;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 25;

// Create bricks array
const bricks = [];
const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8F00FF'];

for(let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { 
            x: 0, 
            y: 0, 
            status: 1,
            color: colors[Math.floor(Math.random() * colors.length)]
        };
    }
}

// Event listeners
document.addEventListener('mousemove', (e) => {
    const relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > paddle.width / 2 && relativeX < canvas.width - paddle.width / 2 ) {
        paddle.x = relativeX - paddle.width / 2;
    }
});

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#FFF';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            if(bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = bricks[c][r].color;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if(b.status === 1) {
                if(ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
                    ball.dy = -ball.dy;
                    b.status = 0;
                    score++;
                    scoreElement.textContent = `Score: ${score}`;
                    
                    if(score === brickRowCount * brickColumnCount) {
                        alert('YOU WIN!');
                        gameRunning = false;
                        clearInterval(gameInterval);
                    }
                }
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    
    // Ball collision with walls
    if(ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    if(ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    } else if(ball.y + ball.dy > canvas.height - ball.radius) {
        if(ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.dy = -ball.dy;
        } else {
            // alert('GAME OVER');
            gameRunning = false;
            clearInterval(gameInterval);
        }
    }
    
    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;
}

function startGame() {
    if (!gameRunning) {
        // Reset game state
        score = 0;
        scoreElement.textContent = `Score: ${score}`;
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 4;
        ball.dy = -4;
        paddle.x = (canvas.width - paddle.width) / 2;
        
        // Reset bricks
        for(let c = 0; c < brickColumnCount; c++) {
            for(let r = 0; r < brickRowCount; r++) {
                bricks[c][r].status = 1;
                bricks[c][r].color = colors[Math.floor(Math.random() * colors.length)];
            }
        }
        
        gameRunning = true;
        gameInterval = setInterval(draw, 10);
    }
}