const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

const grid = 20;
let count = 0;
let score = 0;
let time = 0;
let snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};
let apple = {
    x: 320,
    y: 320
};
let gameRunning = true;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function resetGame() {
    score = 0;
    time = 0;
    snake = {
        x: 160,
        y: 160,
        dx: grid,
        dy: 0,
        cells: [],
        maxCells: 4
    };
    apple = {
        x: getRandomInt(0, 68) * grid, // Ajustado para 1366px de ancho
        y: getRandomInt(0, 38) * grid
    };
    gameRunning = true;
    scoreDisplay.textContent = `Puntaje: ${score}`;
    timeDisplay.textContent = `Tiempo: ${time} segundos`;
    requestAnimationFrame(loop);
}

function loop() {
    if (!gameRunning) return;

    requestAnimationFrame(loop);

    if (++count < 4) {
        return;
    }

    count = 0;
    ctx.fillStyle = '#8bc34a'; // Color verde para simular pasto
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
        gameRunning = false;
        drawGameOver();
        return;
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    ctx.fillStyle = 'black'; // Color negro para la cabeza de la serpiente
    ctx.fillRect(snake.x, snake.y, grid - 1, grid - 1);

    ctx.fillStyle = 'green'; // Color verde para el cuerpo de la serpiente
    snake.cells.forEach((cell, index) => {
        ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            score += 10;
            scoreDisplay.textContent = `Puntaje: ${score}`;
            apple.x = getRandomInt(0, 68) * grid; // Ajustado para 1366px de ancho
            apple.y = getRandomInt(0, 38) * grid;
        }

        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                gameRunning = false;
                drawGameOver();
                return;
            }
        }
    });

    ctx.fillStyle = 'red'; // Color rojo para la manzana
    ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    if (gameRunning) {
        time++;
        timeDisplay.textContent = `Tiempo: ${Math.floor(time / 60)} segundos`;
    }
}

function drawGameOver() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
    ctx.font = '24px Arial';
    ctx.fillText("Presiona 'R' para reiniciar", canvas.width / 2, canvas.height / 2 + 50);
}

// Activar pantalla completa
const fullscreenButton = document.getElementById('fullscreenButton');
fullscreenButton.addEventListener('click', () => {
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) { /* Safari */
        canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) { /* IE11 */
        canvas.msRequestFullscreen();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    } else if (e.which === 38 && snake.dy === 0) {
        snake.dx = 0;
        snake.dy = -grid;
    } else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    } else if (e.which === 40 && snake.dy === 0) {
        snake.dx = 0;
        snake.dy = grid;
    } else if (e.which === 82 && !gameRunning) {
        resetGame();
    }
});

resetGame();
