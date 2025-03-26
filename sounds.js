// Create jump sound and background music
const jumpSound = new Audio('/FlappyBear/jump.wav');
const backgroundMusic = new Audio('/FlappyBear/alive.mp3');

// Configure sounds
jumpSound.volume = 0.4;
backgroundMusic.volume = 0.3;
backgroundMusic.loop = true;

// Sound state
let isSoundEnabled = true;

// Add error handling for audio loading
jumpSound.addEventListener('error', (e) => {
    console.error('Error loading jump sound:', e);
});

backgroundMusic.addEventListener('error', (e) => {
    console.error('Error loading background music:', e);
});

// Function to toggle sound
function toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    const soundButton = document.getElementById('soundButton');
    const icon = soundButton.querySelector('i');
    
    if (isSoundEnabled) {
        icon.className = 'fas fa-volume-up';
        backgroundMusic.play().catch(error => {
            console.error('Failed to play background music:', error);
        });
    } else {
        icon.className = 'fas fa-volume-mute';
        backgroundMusic.pause();
    }
}

// Start background music when page loads
window.addEventListener('load', () => {
    console.log('Page loaded, attempting to start background music');
    startBackgroundMusic();
});

// Function to play jump sound
function playJumpSound() {
    if (!isSoundEnabled) return;
    jumpSound.currentTime = 0;
    jumpSound.play().catch(error => {
        console.error('Failed to play jump sound:', error);
    });
}

// Function to start background music
function startBackgroundMusic() {
    if (!isSoundEnabled) return;
    backgroundMusic.currentTime = 0;
    backgroundMusic.play().catch(error => {
        console.error('Failed to start background music:', error);
    });
}

// Function to stop background music
function stopBackgroundMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
} 