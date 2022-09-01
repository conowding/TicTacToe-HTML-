// Create array to hold board data
let boardData = [
[0, 0, 0],
[0, 0, 0],
[0, 0, 0]
]

let player = 1;
let gameOver = false;

// pull in cells from DOM
const cellElement = document.querySelectorAll(".cell");
const resultElement = document.getElementById("result");

// Add event listener
cellElement.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        placeMarker(index);
    })
})

function placeMarker(index) {
    let col = index % 3
    let row = (index - col) / 3
    if(boardData[row][col] == 0 && gameOver == false) {
        boardData[row][col] = player;
        // console.log(row)
        player *= -1;
        drawMarker();
        checkResult();
    }    
}

//Create function for drawing player markers
function drawMarker() {
    for(let row = 0; row < 3; row++)  {
        for(let col = 0; col<3; col++) {
            if(boardData[row][col] == 1) {
                cellElement[(row * 3) + col].classList.add("cross");
            } else if(boardData[row][col] == -1) {
                cellElement[(row * 3) + col].classList.add("circle");
            }
        }
    }
}

function checkResult() {
    for(let i = 0; i < 3; i++) {
        let rowSum = boardData[i][0] + boardData[i][1] + boardData[i][2];
        let colSum = boardData[0][i] + boardData[1][i] + boardData[2][i];
        if(rowSum == 3 || colSum == 3) {
            endGame(1);
            return 
        } else if(rowSum == -3 || colSum == -3) {
            endGame(2);
            return 
        }
    }

    let diagonalSum1 = boardData[0][0] + boardData[1][1] + boardData[2][2];
    let diagonalSum2 = boardData[0][0] + boardData[1][1] + boardData[2][2]; 
    if(diagonalSum1 == 3 || diagonalSum2 == 3) {
        endGame(1);
        return 
    } else if(diagonalSum1 == -3 || diagonalSum2 == -3) {
        endGame(2);
        return 
    }

    if(boardData[0].indexOf(0) == -1 &&
        boardData[1].indexOf(0) == -1 &&
        boardData[2].indexOf(0) == -1) {
            endGame(0);
            return 
        }
}

// Function to end the game and display the result
function endGame(winner) {
    gameOver = true;
    const resultElement = document.getElementById("result");
    if(winner == 0) {
        resultElement.innerText = "It's a tie!"
    } else {
        resultElement.innerText = `Player ${winner} wins!`
    }
}

// Restarts the game
const restartButton = document.getElementById("restart");
restartButton.addEventListener("click", () => {
    boardData = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
        ]
    
    player = 1;
    gameOver = false;
    cellElement.forEach(cell => {
        cell.classList.remove("cross", "circle")
    })
    resultElement.innerText = ""
});