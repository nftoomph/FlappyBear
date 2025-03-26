// Create jump sound and background music
const jumpSound = new Audio('jump.wav');
const backgroundMusic = new Audio('alive.mp3');

// Configure sounds
jumpSound.volume = 0.4;
backgroundMusic.volume = 0.3;
backgroundMusic.loop = true;

// Sound state
let isSoundEnabled = true;

// Function to toggle sound
function toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    const soundButton = document.getElementById('soundButton');
    const icon = soundButton.querySelector('i');
    
    if (isSoundEnabled) {
        icon.className = 'fas fa-volume-up';
        backgroundMusic.play().catch(error => {
            console.log('Background music failed:', error);
        });
    } else {
        icon.className = 'fas fa-volume-mute';
        backgroundMusic.pause();
    }
}

// Start background music when page loads
window.addEventListener('load', () => {
    startBackgroundMusic();
});

// Function to play jump sound
function playJumpSound() {
    if (!isSoundEnabled) return;
    jumpSound.currentTime = 0;
    jumpSound.play().catch(error => {
        console.log('Jump sound failed:', error);
    });
}

// Function to start background music
function startBackgroundMusic() {
    if (!isSoundEnabled) return;
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