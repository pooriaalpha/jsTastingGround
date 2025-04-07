// const puzzle = document.getElementById("puzzle");
// let tiles = [1, 2, 3, 4, 5, 6, 7, 8, ""];

// function render() {
//     puzzle.innerHTML = "";
//     tiles.forEach((tile, index) => {
//         const tileElement = document.createElement("div");
//         tileElement.classList.add("tile");
//         if (tile === "") tileElement.classList.add("empty");
//         tileElement.textContent = tile;
//         // tileElement.style.transform = `translate(${(index % 3) * 105}px, ${Math.floor(index / 3) * 105}px)`;
//         tileElement.addEventListener("click", () => moveTile(index));
//         puzzle.appendChild(tileElement);
//     });
// }

// function moveTile(index) {
//     const emptyIndex = tiles.indexOf(""),
//           validMoves = [index - 3, index + 3, index - 1, index + 1];
//     if (validMoves.includes(emptyIndex)) {
//         [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
//         render();
//     }
// }

// function shuffle() {
//     for (let i = tiles.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
//     }
//     render();
// }

// render();

class PuzzleGame {
    constructor(elementId, size, tileClass) {
        this.element = document.getElementById(elementId);
        this.size = size;
        this.tileClass = tileClass;
        this.tiles = Array.from({length: size * size - 1}, (_, i) => i + 1);
        this.tiles.push("");
    }

    getPosition(index) {
        const tileSize = this.tileClass === 'tile-3x3' ? 105 : 85;
        return {
            x: (index % this.size) * tileSize,
            y: Math.floor(index / this.size) * tileSize
        };
    }

    render() {
        this.element.innerHTML = "";
        this.tiles.forEach((tile, index) => {
            const tileElement = document.createElement("div");
            tileElement.classList.add(this.tileClass);
            if (tile === "") {
                tileElement.classList.add("empty");
            }
            tileElement.textContent = tile;
            const position = this.getPosition(index);
            tileElement.style.transform = `translate(${position.x}px, ${position.y}px)`;
            tileElement.addEventListener("click", () => this.moveTile(index));
            this.element.appendChild(tileElement);
        });
    }

    moveTile(index) {
        const emptyIndex = this.tiles.indexOf("");
        const row = Math.floor(index / this.size);
        const emptyRow = Math.floor(emptyIndex / this.size);
        const validMoves = [];
        
        // Check horizontal moves (same row)
        if (row === emptyRow && Math.abs(index - emptyIndex) === 1) {
            validMoves.push(emptyIndex);
        }
        // Check vertical moves (same column)
        if (index % this.size === emptyIndex % this.size && Math.abs(row - emptyRow) === 1) {
            validMoves.push(emptyIndex);
        }

        if (validMoves.includes(emptyIndex)) {
            [this.tiles[index], this.tiles[emptyIndex]] = [this.tiles[emptyIndex], this.tiles[index]];
            this.render();
        }
    }

    shuffle() {
        for (let i = 0; i < 200; i++) {
            const emptyIndex = this.tiles.indexOf("");
            const validMoves = [];
            
            if (emptyIndex - this.size >= 0) validMoves.push(emptyIndex - this.size);
            if (emptyIndex + this.size < this.size * this.size) validMoves.push(emptyIndex + this.size);
            if (emptyIndex % this.size > 0) validMoves.push(emptyIndex - 1);
            if (emptyIndex % this.size < this.size - 1) validMoves.push(emptyIndex + 1);
            
            const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
            [this.tiles[emptyIndex], this.tiles[randomMove]] = [this.tiles[randomMove], this.tiles[emptyIndex]];
        }
        this.render();
    }
}

// Initialize both games
const puzzle8 = new PuzzleGame('puzzle-8', 3, 'tile-3x3');
const puzzle15 = new PuzzleGame('puzzle-15', 4, 'tile-4x4');

// Global functions for shuffle buttons
function shuffle8() {
    puzzle8.shuffle();
}

function shuffle15() {
    puzzle15.shuffle();
}

// Initial render
puzzle8.render();
puzzle15.render();