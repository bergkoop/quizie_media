// Welcome Overlay Logic
window.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('welcome-overlay');
    const startButton = document.getElementById('start-button');
    const gastButton = document.getElementById('gast');

    // Handle "Start" button click (requires username)
    startButton.addEventListener('click', () => {
        const usernameInput = document.getElementById('username');
        const username = usernameInput.value;
        if (username.trim() !== '') {
            // Save to localStorage
            localStorage.setItem('username', username);
            // Hide the overlay
            overlay.style.display = 'none';
        } else {
            // Show error message in input field
            usernameInput.classList.add('error');
            usernameInput.placeholder = 'graag uw naam invoeren';
        }
    });

    // Handle "doe als gast" (play as guest) button click
    gastButton.addEventListener('click', () => {
        // Hide the overlay - user can access without login
        overlay.style.display = 'none';
    });
});
