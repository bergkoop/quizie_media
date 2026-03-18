window.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('welcome-overlay');
    const usernameInput = document.getElementById('username');
    const startButton = document.getElementById('start-button');
    const gastButton = document.getElementById('gast');

    // New: Check if on quiz page and username already set
    const isQuizPage = window.location.pathname.includes('/quizzes/member-1-online_communicatie/');
    const savedUsername = localStorage.getItem('username');
    
    if (isQuizPage && savedUsername) {
        // Prefill and auto-hide overlay
        usernameInput.value = savedUsername;
        overlay.style.display = 'none';
        return; // Skip rest for quiz pages
    }

    // Existing logic for index.html or no saved name
    // Handle "Start" button click
    startButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username !== '') {
            localStorage.setItem('username', username);
            overlay.style.display = 'none';
        } else {
            usernameInput.classList.add('error');
            usernameInput.placeholder = 'graag uw naam invoeren';
        }
    });

    // Handle "doe als gast"
    gastButton.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    // Optional: Prefill if saved (even on index)
    if (savedUsername) {
        usernameInput.value = savedUsername;
    }
});
