const gameContainer = document.getElementById('gameContainer');
const player = document.getElementById('player');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');

let playerX = 375;
let score = 0;
let gameIsOver = false;
let bullets = [];
let invaders = [];
let invaderDirection = 1;
let invaderStepDown = false;


// Player movement
document.addEventListener('keydown', (e) => {
    if (gameIsOver) return;
    
    if (e.key === 'ArrowLeft' && playerX > 0) {
        playerX -= 20;
    }
    if (e.key === 'ArrowRight' && playerX < 750) {
        playerX += 20;
    }
    if (e.key === ' ') {
        shoot();
        shoot();
        shoot();
        // setTimeout(() => {  shoot(); }, 200);
        // setTimeout(() => {  shoot(); }, 400);
    }
    player.style.left = playerX + 'px';
});

// Shooting mechanism
function shoot() {
    const bullet = document.createElement('div');
    bullet.className = 'bullet';
    bullet.style.left = (playerX + 23) + 'px';
    bullet.style.bottom = '50px';
    gameContainer.appendChild(bullet);
    bullets.push(bullet);
}

// Create invaders
function createInvaders() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 8; j++) {
            const invader = document.createElement('div');
            invader.className = 'invader';
            invader.style.left = (j * 80 + 100) + 'px';
            invader.style.top = (i * 60 + 50) + 'px';
            gameContainer.appendChild(invader);
            invaders.push(invader);
        }
    }
}

// Game loop
function gameLoop() {
    if (gameIsOver) return;

    // Move bullets
    bullets.forEach((bullet, bulletIndex) => {
        const bulletTop = parseInt(bullet.style.bottom) + 5;
        if (bulletTop > 600) {
            bullet.remove();
            bullets.splice(bulletIndex, 1);
        } else {
            bullet.style.bottom = bulletTop + 'px';
        }
    });

    // Move invaders
    let shouldStepDown = false;
    invaders.forEach((invader) => {
        const invaderLeft = parseInt(invader.style.left);
        if (invaderDirection === 1 && invaderLeft > 750) {
            shouldStepDown = true;
        }
        if (invaderDirection === -1 && invaderLeft < 10) {
            shouldStepDown = true;
        }
    });

    if (shouldStepDown) {
        invaderDirection *= -1;
        invaders.forEach((invader) => {
            invader.style.top = (parseInt(invader.style.top) + 30) + 'px';
            if (parseInt(invader.style.top) > 520) {
                gameOver();
            }
        });
    } else {
        invaders.forEach((invader) => {
            invader.style.left = (parseInt(invader.style.left) + (2 * invaderDirection)) + 'px';
        });
    }

    // Check collisions
    bullets.forEach((bullet, bulletIndex) => {
        invaders.forEach((invader, invaderIndex) => {
            if (checkCollision(bullet, invader)) {
                bullet.remove();
                bullets.splice(bulletIndex, 1);
                invader.remove();
                invaders.splice(invaderIndex, 1);
                score += 10;
                scoreElement.textContent = 'Score: ' + score;

                if (invaders.length === 0) {
                    alert('You win! Score: ' + score);
                    gameOver();
                }
            }
        });
    });

    requestAnimationFrame(gameLoop);
}

// Collision detection
function checkCollision(bullet, invader) {
    const bulletRect = bullet.getBoundingClientRect();
    const invaderRect = invader.getBoundingClientRect();

    return !(bulletRect.right < invaderRect.left || 
            bulletRect.left > invaderRect.right || 
            bulletRect.bottom < invaderRect.top || 
            bulletRect.top > invaderRect.bottom);
}

// Game over function
function gameOver() {
    gameIsOver = true;
    gameOverElement.style.display = 'block';
}

function resetGame() {
  playerX = 375;
     score = 0;
     gameIsOver = false;
     bullets = [];
     invaders = [];
     invaderDirection = 1;
     invaderStepDown = false;
    // createInvaders();
    // gameLoop();
  window.location.reload();

return;

}

// Start game
createInvaders();
gameLoop();
