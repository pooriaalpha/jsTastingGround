const symbols = ['🍎', '🍌', '🍒', '🍇', '🍉', '🥝', '🍓', '🍍'];
let cards = [];
let gameBoard;
let firstCard = null, secondCard = null;
let lockBoard = false;

function initializeGame() {
    // Reset variables
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    
    // Clear the game board
    gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';
    
    // Create and shuffle new cards
    cards = [...symbols, ...symbols];
    cards.sort(() => Math.random() - 0.5);
    
    // Create new card elements
    cards.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this.classList.contains("flipped")) return;
    this.textContent = this.dataset.symbol;
    this.classList.add("flipped");
    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}

function checkForMatch() {
    lockBoard = true;
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        resetBoard();
    } else {
        setTimeout(() => {
            firstCard.textContent = "";
            secondCard.textContent = "";
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// Initialize the game when the page loads
initializeGame();