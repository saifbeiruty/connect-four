const { stdin, stdout } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

class C4 {
    constructor(row = 4, col = 4) {
        this.row = row;
        this.col = col;
        this.player1 = 'R';
        this.player2 = 'Y';
        this.currentPlayer = 'R';
        this.board = this.makeBoard();
        this.movements = 0;
    }

    makeBoard() {
        const board = new Array(this.row).fill(null).map(() => new Array(this.col).fill(' ')) 
        return board;
    }

    placeRing(col) {
        for(let r = this.row - 1; r >= 0; r--) {
            if(this.board[r][col] === ' ') {
                this.board[r][col] = this.currentPlayer;
                this.movements++;
                return true;
            }
        }
        return false;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'R' ? 'Y' : 'R';
    }

    checkWinner() {
        for (let r = 0; r < this.row - 3; r++) {
            for (let c = 0; c < this.col; c++) {
                if (this.board[r][c] !== ' ' && this.board[r][c] === this.board[r + 1][c] && this.board[r][c] === this.board[r + 2][c] && this.board[r][c] === this.board[r + 3][c]) return true;
            }
        }

        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.col - 3; c++) {
                if (this.board[r][c] !== ' ' && this.board[r][c] === this.board[r][c + 1] && this.board[r][c] === this.board[r][c + 2] && this.board[r][c] === this.board[r][c + 3]) return true;
            }
        }

        for (let r = 0; r < this.row - 3; r++) {
            for (let c = 0; c < this.col - 3; c++) {
                if (this.board[r][c] !== ' ' && this.board[r][c] === this.board[r + 1][c + 1] && this.board[r][c] === this.board[r + 2][c + 2] && this.board[r][c] === this.board[r + 3][c + 3]) return true;
            }
        }

        for (let r = 0; r < this.row - 3; r++) {
            for (let c = this.col; c >= 3; c--) {
                if (this.board[r][c] !== ' ' && this.board[r][c] === this.board[r + 1][c - 1] && this.board[r][c] === this.board[r + 2][c - 2] && this.board[r][c] === this.board[r + 3][c - 3]) return true;
            }
        }

        return false;

    }

    boardIsFull() {
        return this.row * this.col === this.movements;
    }

    gameOver() {
        return this.checkWinner() || this.boardIsFull();
    }

    startGame() {
        console.log(this.board)
        rl.question(`Its players ${this.currentPlayer} turn :`, (input) => {
            input = parseInt(input);
            if(input < 0 || input >= this.col || isNaN(input) || !this.placeRing(input)) {
                console.log('Invalid Input');
                this.startGame();
                return;
            }

            if(this.gameOver()) {
                if(this.checkWinner()) {
                    console.log(`Player ${this.currentPlayer} Won`);
                } else {
                    console.log('Its a Tie')
                }
                rl.close();
                return;
            }

            this.switchPlayer();
            this.startGame();
            return;

        })
    }

}

const game = new C4();
game.startGame();