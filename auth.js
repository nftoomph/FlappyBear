// Firebase configuration
const firebaseConfig = {
    // Replace with your Firebase config
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Authentication state observer
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        updateUIForLoggedInUser(user);
    } else {
        // User is signed out
        updateUIForLoggedOutUser();
    }
});

function updateUIForLoggedInUser(user) {
    const loginOptions = document.querySelector('.login-options');
    loginOptions.innerHTML = `
        <div class="user-info">
            <img src="${user.photoURL || 'images/default-avatar.png'}" alt="Profile" class="profile-pic">
            <span>${user.displayName || user.email}</span>
        </div>
        <button onclick="logout()">
            <i class="fas fa-sign-out-alt"></i> Logout
        </button>
    `;
}

function updateUIForLoggedOutUser() {
    const loginOptions = document.querySelector('.login-options');
    loginOptions.innerHTML = `
        <button onclick="loginWithGoogle()">
            <i class="fab fa-google"></i> Google
        </button>
        <button onclick="loginWithWallet()">
            <i class="fas fa-wallet"></i> Wallet
        </button>
        <button onclick="loginWithEmail()">
            <i class="fas fa-envelope"></i> Email
        </button>
    `;
}

// Simple authentication functions that show "coming soon" messages
function loginWithGoogle() {
    alert('Google login coming soon!');
}

function loginWithWallet() {
    alert('Wallet login coming soon!');
}

function loginWithEmail() {
    alert('Email login coming soon!');
}

function logout() {
    auth.signOut()
        .catch((error) => {
            console.error('Logout error:', error);
            alert('Failed to logout. Please try again.');
        });
}

// Add event listeners to login buttons
document.addEventListener('DOMContentLoaded', () => {
    const googleBtn = document.querySelector('.login-options button:nth-child(1)');
    const walletBtn = document.querySelector('.login-options button:nth-child(2)');
    const emailBtn = document.querySelector('.login-options button:nth-child(3)');

    if (googleBtn) googleBtn.addEventListener('click', loginWithGoogle);
    if (walletBtn) walletBtn.addEventListener('click', loginWithWallet);
    if (emailBtn) emailBtn.addEventListener('click', loginWithEmail);
}); 