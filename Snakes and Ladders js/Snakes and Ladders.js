const boardSize = 100;
let currentPlayer = 1;
let playerPositions = {
    1: 0,
    2: 0
};

// Define snakes and ladders
const snakesAndLadders = {
    // Snakes (head: tail)
    97: 78,
    95: 56,
    88: 24,
    57: 22,
    62: 18,
    36: 6,
    // Ladders (bottom: top)
    5: 14,
    8: 30,
    13: 38,
    28: 76,
    32: 43,
    50: 67,
    71: 92,
    80: 99
};

function createBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    
    // Create cells in reverse order for each row
    for (let row = 9; row >= 0; row--) {
        for (let col = row % 2 === 0 ? 0 : 9; 
             row % 2 === 0 ? col < 10 : col >= 0; 
             row % 2 === 0 ? col++ : col--) {
            
            const cell = document.createElement('div');
            const cellNumber = (9 - row) * 10 + (row % 2 === 0 ? col + 1 : 10 - col);
            
            cell.className = 'cell';
            cell.id = `cell-${cellNumber}`;
            cell.innerHTML = cellNumber;

            // Add snake or ladder styling
            if (snakesAndLadders[cellNumber]) {
                if (snakesAndLadders[cellNumber] < cellNumber) {
                    cell.classList.add('snake');
                } else {
                    cell.classList.add('ladder');
                }
            }

            board.appendChild(cell);
        }
    }
    updatePlayerPositions();
}

function rollDice() {
    const diceResult = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice-result').textContent = `Dice Roll: ${diceResult}`;
    movePlayer(currentPlayer, diceResult);
}

function movePlayer(player, spaces) {
    const newPosition = playerPositions[player] + spaces;
    
    if (newPosition <= boardSize) {
        playerPositions[player] = newPosition;
        
        // Check for snakes and ladders
        if (snakesAndLadders[newPosition]) {
            setTimeout(() => {
                playerPositions[player] = snakesAndLadders[newPosition];
                updatePlayerPositions();
                const message = snakesAndLadders[newPosition] > newPosition ? 
                    "Climbing up the ladder! 🪜" : 
                    "Oops! Snake bite! 🐍";
                document.getElementById('dice-result').textContent += ` - ${message}`;
            }, 500);
        }

        // Check for win
        if (newPosition === boardSize) {
            setTimeout(() => {
                alert(`Player ${player} wins! 🎉`);
                resetGame();
            }, 100);
            return;
        }
    }

    updatePlayerPositions();
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.getElementById('current-player').textContent = `Current Player: ${currentPlayer}`;

    let currentbg = document.getElementById('current-player');
    if (currentPlayer === 1 ) {
        currentbg.style.setProperty("background" , "rgba(255,  0,  10, 0.25 )" ) ;
    }
    else {
        currentbg.style.setProperty("background" , "rgba(0,  0,  250, 0.25 )" ) ;
    }
    

}

function updatePlayerPositions() {
    // Clear all players
    document.querySelectorAll('.player').forEach(el => el.remove());
    
    // Update positions
    Object.entries(playerPositions).forEach(([player, position]) => {
        if (position > 0) {
            const cell = document.getElementById(`cell-${position}`);
            const playerDiv = document.createElement('div');
            playerDiv.className = `player player${player}`;
            cell.appendChild(playerDiv);
        }
    });
}

function resetGame() {
    currentPlayer = 1;
    playerPositions = {
        1: 0,
        2: 0
    };
    document.getElementById('current-player').textContent = 'Current Player: 1';
    document.getElementById('dice-result').textContent = 'Roll the dice to start!';
    document.getElementById('current-player').style.setProperty("background" , "rgba(255,  0,  10, 0.25 )" ) ;


    createBoard();
}

// Initialize the game
createBoard();




function createDice(number) {
    const dotPositionMatrix = {
        1: [
            [50, 50]
        ],
        2: [
            [20, 20],
            [80, 80]
        ],
        3: [
            [20, 20],
            [50, 50],
            [80, 80]
        ],
        4: [
            [20, 20],
            [20, 80],
            [80, 20],
            [80, 80]
        ],
        5: [
            [20, 20],
            [20, 80],
            [50, 50],
            [80, 20],
            [80, 80]
        ],
        6: [
            [20, 20],
            [20, 80],
            [50, 20],
            [50, 80],
            [80, 20],
            [80, 80]
        ]
    };
    const dice = document.createElement("div");
    dice.classList.add("dice");

    // dice.style.setProperty("background" , "rgba(255,  0,  10, 0.25 )" ) ;


    // currentPlayer = currentPlayer === 1 ? 2 : 1;

    // if (currentPlayer === 1 ) {
    //     dice.style.setProperty("background" , "rgba(255,  0,  10, 0.25 )" ) ;
    // }
    // else {
    //     dice.style.setProperty("background" , "rgba(0,  0,  250, 0.25 )" ) ;
    // }

    for (const dotPosition of dotPositionMatrix[number] ) {
        const dot = document.createElement("div");

        dot.classList.add("dice-dot");
        dot.style.setProperty("--top" , dotPosition[0]  + "%");
        dot.style.setProperty("--left" , dotPosition[1]  + "%");
        dice.appendChild(dot);
        
    }

    return dice;
}
// console.log(createDice(3));

function randomizeDice(diceContainer , numberOfDice){
    diceContainer.innerHTML = "";

    for (let i = 0; i < numberOfDice ; i++) {
        const random = Math.floor((Math.random() * 6) + 1);
        const dice = createDice(random);

        diceContainer.appendChild(dice);
    }

}
const diceContainer = document.querySelector(".dice-container");
const btnRollDice = document.querySelector(".btn-roll-dice");

const NUMBER_OF_DICE = 1 ;

randomizeDice (diceContainer , NUMBER_OF_DICE);
// randomizeDice (diceContainer , NUMBER_OF_DICE);

btnRollDice.addEventListener("click" , () => {
    const interval = setInterval( () => {
        randomizeDice(diceContainer , NUMBER_OF_DICE);
    } , 50 );
    setTimeout( () => clearInterval(interval), 1000);
});

