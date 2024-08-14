const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Paddle properties
const paddleWidth = 10;
const paddleHeight = 100;
const playerX = 0;
const computerX = canvas.width - paddleWidth;

// Ball properties
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 10;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Player paddle
let playerY = (canvas.height - paddleHeight) / 2;
let playerSpeedY = 0;
const playerSpeed = 8;

// Computer paddle
let computerY = (canvas.height - paddleHeight) / 2;

// Draw the net
function drawNet() {
    ctx.setLineDash([5, 15]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "#fff";
    ctx.stroke();
}

// Draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

// Draw paddles
function drawPaddle(x, y) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

// Move the ball
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX - ballRadius < playerX + paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX + ballRadius > computerX && ballY > computerY && ballY < computerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball out of bounds
    if (ballX - ballRadius < 0 || ballX + ballRadius > canvas.width) {
        resetBall();
    }
}

// Move computer paddle
function moveComputer() {
    const computerSpeed = 4;
    if (computerY + paddleHeight / 2 < ballY) {
        computerY += computerSpeed;
    } else if (computerY + paddleHeight / 2 > ballY) {
        computerY -= computerSpeed;
    }
}

// Reset the ball
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

// Move player paddle with keyboard
function movePlayer() {
    playerY += playerSpeedY;

    // Prevent paddle from going out of bounds
    if (playerY < 0) {
        playerY = 0;
    } else if (playerY + paddleHeight > canvas.height) {
        playerY = canvas.height - paddleHeight;
    }
}

// Handle keydown events
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        playerSpeedY = -playerSpeed;
    } else if (e.key === 'ArrowDown') {
        playerSpeedY = playerSpeed;
    }
});

// Handle keyup events
document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        playerSpeedY = 0;
    }
});

// Draw the game elements
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawNet();
    drawBall();
    drawPaddle(playerX, playerY);
    drawPaddle(computerX, computerY);
}

// Update game state
function update() {
    moveBall();
    moveComputer();
    movePlayer();
    draw();
}

// Game loop
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
