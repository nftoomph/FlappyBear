// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
const bearImage = new Image();
bearImage.src = 'images/bear.png';
const treeImage = new Image();
treeImage.src = 'images/tree1.png';
const birdImage = new Image();
birdImage.src = 'images/bird3.png';
const backgroundImage = new Image();
backgroundImage.src = 'images/background.jpg';

// Prevent space bar from scrolling the page
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
    }
});

// Set canvas size
canvas.width = 320;
canvas.height = 480;

// Game variables
let bear = {
    x: 50,
    y: canvas.height / 2,
    velocity: 0,
    gravity: 0.5,
    jump: -8,
    width: 60,
    height: 60,
    hitboxOffset: 10  // Smaller hitbox than visual size
};

let pipes = [];
let score = 0;
let gameStarted = false;
let gameOver = false;
let highScore = localStorage.getItem('highScore') || 0;
let gravity = 0.5;
let jump = -8;
let velocity = 0;
let pipeWidth = 50;
let pipeGap = 150;

// Pipe properties
const birdHeight = 75;  // Half the previous height (was 150)
const pipeSpeed = 2;
const hitboxReduction = 15;  // Reduce hitbox size for more forgiving collisions

// Draw initial start screen
draw();

function checkCollision(bearX, bearY, bearW, bearH, obstacleX, obstacleY, obstacleW, obstacleH) {
    // Add padding to make collision detection more forgiving
    return bearX + bearW - bear.hitboxOffset > obstacleX + hitboxReduction &&
           bearX + bear.hitboxOffset < obstacleX + obstacleW - hitboxReduction &&
           bearY + bearH - bear.hitboxOffset > obstacleY + hitboxReduction &&
           bearY + bear.hitboxOffset < obstacleY + obstacleH - hitboxReduction;
}

// Event listeners
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (!gameStarted) {
            gameStarted = true;
            startGame();
        } else if (gameOver) {
            resetGame();
        } else {
            bear.velocity = jump;
        }
    }
});

// Add touch event support
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent scrolling when tapping
    if (!gameStarted) {
        gameStarted = true;
        startGame();
    } else if (gameOver) {
        resetGame();
    } else {
        bear.velocity = jump;
    }
});

// Game functions
function startGame() {
    // Create initial pipes
    createPipe();
    // Start game loop
    gameLoop();
}

function createPipe() {
    const gapPosition = Math.random() * (canvas.height - pipeGap - 100) + 50;
    pipes.push({
        x: canvas.width,
        gapY: gapPosition,
        passed: false
    });
}

function resetGame() {
    bear.y = canvas.height / 2;
    bear.velocity = 0;
    pipes = [];
    score = 0;
    gameOver = false;
    gameStarted = true;
    createPipe();
}

function update() {
    // Update bird
    bear.velocity += bear.gravity;
    bear.y += bear.velocity;

    // Check collisions with ground and ceiling
    if (bear.y + bear.height > canvas.height || bear.y < 0) {
        gameOver = true;
    }

    // Update pipes
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= pipeSpeed;

        // Check collision with pipes
        if (bear.x + bear.width > pipes[i].x && 
            bear.x < pipes[i].x + pipeWidth) {
            // Check collision with top bird
            if (checkCollision(
                bear.x, bear.y, bear.width, bear.height,
                pipes[i].x, pipes[i].gapY - birdHeight, pipeWidth, birdHeight
            )) {
                gameOver = true;
            }
            // Check collision with bottom tree
            if (checkCollision(
                bear.x, bear.y, bear.width, bear.height,
                pipes[i].x, pipes[i].gapY + pipeGap, pipeWidth, canvas.height - (pipes[i].gapY + pipeGap)
            )) {
                gameOver = true;
            }
        }

        // Score point when passing pipe
        if (!pipes[i].passed && pipes[i].x + pipeWidth < bear.x) {
            pipes[i].passed = true;
            score++;
        }

        // Remove off-screen pipes
        if (pipes[i].x + pipeWidth < 0) {
            pipes.splice(i, 1);
        }
    }

    // Create new pipes
    if (pipes.length === 0 || 
        pipes[pipes.length - 1].x < canvas.width - 200) {
        createPipe();
    }
}

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    
    // Draw pipes
    pipes.forEach(pipe => {
        // Draw bird (top pipe)
        ctx.drawImage(birdImage, 
            pipe.x, 
            pipe.gapY - birdHeight,  // Position bird above the gap
            pipeWidth, 
            birdHeight  // Reduced height for bird
        );
        
        // Draw tree (bottom pipe)
        ctx.drawImage(treeImage, 
            pipe.x, 
            pipe.gapY + pipeGap,  // Position tree at the bottom of gap
            pipeWidth, 
            canvas.height - (pipe.gapY + pipeGap)  // Scale tree to bottom
        );
    });
    
    // Draw bear
    ctx.save();
    ctx.translate(bear.x + bear.width/2, bear.y + bear.height/2);
    ctx.rotate(Math.max(Math.min(bear.velocity * 0.05, Math.PI/4), -Math.PI/4));
    ctx.drawImage(bearImage, -bear.width/2, -bear.height/2, bear.width, bear.height);
    ctx.restore();
    
    // Draw score
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${score}`, 20, 40);
    
    // Draw start message
    if (!gameStarted) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Press SPACE', canvas.width/2, canvas.height/2 - 20);
        ctx.font = 'bold 24px Arial';
        ctx.fillText('to Start', canvas.width/2, canvas.height/2 + 20);
    }
    
    // Draw game over message
    if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width/2, canvas.height/2);
        ctx.font = '20px Arial';
        ctx.fillText('Press Space to Restart', canvas.width/2, canvas.height/2 + 40);
    }
}

function gameLoop() {
    if (!gameOver) {
        update();
    }
    draw();
    requestAnimationFrame(gameLoop);
}