var playerPos = { row: 1, col: 1 };
var goalPos = { row: rows - 2, col: cols - 2 };

var mazeContainer = document.getElementById("maze-container");
var messageDiv = document.getElementById("message");

function drawMaze() {
    mazeContainer.innerHTML = "";
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            if (maze[i][j] === 0) cell.classList.add("wall");
            else cell.classList.add("path");

            if (i === goalPos.row && j === goalPos.col) cell.classList.add("goal");
            if (i === playerPos.row && j === playerPos.col) cell.classList.add("player");

            mazeContainer.appendChild(cell);
        }
    }
}

function movePlayer(dr, dc) {
    let newRow = playerPos.row + dr;
    let newCol = playerPos.col + dc;

    if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) return;

    if (maze[newRow][newCol] === 0) return;

    playerPos = { row: newRow, col: newCol };
    drawMaze();

    if (playerPos.row === goalPos.row && playerPos.col === goalPos.col) {
        messageDiv.textContent = "🎉 Level Completed!";
        document.getElementById("nextLevelForm").style.display = "block";
        document.removeEventListener("keydown", keydownHandler);
    }
}

function keydownHandler(e) {
    if (e.key === "ArrowUp") movePlayer(-1, 0);
    else if (e.key === "ArrowDown") movePlayer(1, 0);
    else if (e.key === "ArrowLeft") movePlayer(0, -1);
    else if (e.key === "ArrowRight") movePlayer(0, 1);
}

document.addEventListener("keydown", keydownHandler);
drawMaze();
