// Create jump sound and background music
const jumpSound = new Audio('jump.wav');
const backgroundMusic = new Audio('alive.mp3');

// Configure sounds
jumpSound.volume = 0.4;
backgroundMusic.volume = 0.3;
backgroundMusic.loop = true;

// Function to play jump sound
function playJumpSound() {
    jumpSound.currentTime = 0;
    jumpSound.play().catch(error => {
        console.log('Jump sound failed:', error);
    });
}

// Function to start background music
function startBackgroundMusic() {
    backgroundMusic.currentTime = 0;
    backgroundMusic.play().catch(error => {
        console.log('Background music failed:', error);
    });
}

// Function to stop background music
function stopBackgroundMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
} 