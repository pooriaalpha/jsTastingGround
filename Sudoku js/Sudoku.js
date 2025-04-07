let board = [];
let solution = [];
const EMPTY = 0;

// Initialize the game
function initGame() {
    board = [];
    solution = [];
    createEmptyBoard();
    generateSolution();
    createPuzzle();
    renderBoard();
}

// Create empty board
function createEmptyBoard() {
    for (let i = 0; i < 9; i++) {
        board[i] = Array(9).fill(EMPTY);
        solution[i] = Array(9).fill(EMPTY);
    }
}

// Generate a valid Sudoku solution
function generateSolution() {
    // Fill diagonal boxes first (they are independent)
    fillDiagonalBoxes();
    // Fill remaining cells
    solveSudoku(solution);
}

// Fill the diagonal 3x3 boxes
function fillDiagonalBoxes() {
    for (let box = 0; box < 9; box += 3) {
        let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffle(nums);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                solution[box + i][box + j] = nums[i * 3 + j];
            }
        }
    }
}

// Shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Solve Sudoku using backtracking
function solveSudoku(grid) {
    let row = 0;
    let col = 0;
    let isEmpty = true;
    
    // Find empty position
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === EMPTY) {
                row = i;
                col = j;
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty) break;
    }

    // If no empty position, puzzle is solved
    if (isEmpty) return true;

    // Try digits 1-9
    for (let num = 1; num <= 9; num++) {
        if (isSafe(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveSudoku(grid)) return true;
            grid[row][col] = EMPTY;
        }
    }
    return false;
}

// Check if number is safe to place
function isSafe(grid, row, col, num) {
    // Check row
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
        if (grid[x][col] === num) return false;
    }

    // Check 3x3 box
    let startRow = row - row % 3;
    let startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i + startRow][j + startCol] === num) return false;
        }
    }

    return true;
}

// Create puzzle by removing numbers from solution
function createPuzzle() {
    // Copy solution to board
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            board[i][j] = solution[i][j];
        }
    }

    // Remove numbers randomly
    let cellsToRemove = 45; // Adjust difficulty by changing this number
    while (cellsToRemove > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (board[row][col] !== EMPTY) {
            board[row][col] = EMPTY;
            cellsToRemove--;
        }
    }
}

// Render the board
function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            
            if (board[i][j] !== EMPTY) {
                cell.classList.add('initial');
                cell.textContent = board[i][j];
            } else {
                const input = document.createElement('input');
                input.type = 'number';
                input.min = 1;
                input.max = 9;
                input.dataset.row = i;
                input.dataset.col = j;
                input.addEventListener('input', validateInput);
                cell.appendChild(input);
            }
            
            boardElement.appendChild(cell);
        }
    }
}

// Validate input
function validateInput(e) {
    const input = e.target;
    const value = parseInt(input.value);
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);

    if (isNaN(value) || value < 1 || value > 9) {
        input.value = '';
        return;
    }

    // Check if the move is valid
    const tempBoard = board.map(row => [...row]);
    tempBoard[row][col] = value;
    
    if (!isValidMove(tempBoard, row, col, value)) {
        input.parentElement.classList.add('error');
    } else {
        input.parentElement.classList.remove('error');
    }
}

// Check if move is valid
function isValidMove(grid, row, col, num) {
    // Check row
    for (let x = 0; x < 9; x++) {
        if (x !== col && grid[row][x] === num) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
        if (x !== row && grid[x][col] === num) return false;
    }

    // Check 3x3 box
    let startRow = row - row % 3;
    let startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if ((i + startRow !== row || j + startCol !== col) && 
                grid[i + startRow][j + startCol] === num) return false;
        }
    }

    return true;
}

// Check solution
function checkSolution() {
    const inputs = document.querySelectorAll('input');
    const currentBoard = board.map(row => [...row]);
    
    let isComplete = true;
    inputs.forEach(input => {
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);
        const value = parseInt(input.value);
        
        if (isNaN(value)) {
            isComplete = false;
        } else {
            currentBoard[row][col] = value;
        }
    });

    if (!isComplete) {
        showMessage('Please fill in all cells!', 'error');
        return;
    }

    // Compare with solution
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (currentBoard[i][j] !== solution[i][j]) {
                showMessage('Solution is incorrect. Keep trying!', 'error');
                return;
            }
        }
    }
    
    showMessage('Congratulations! You solved the puzzle!', 'success');
}

// Show message
function showMessage(text, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.style.color = type === 'error' ? '#f44336' : '#4CAF50';
}

// Start new game
function newGame() {
    initGame();
    document.getElementById('message').textContent = '';
}

// Initialize game on load
initGame();