// Welcome Overlay Logic
window.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('welcome-overlay');
    const startButton = document.getElementById('start-button');

    startButton.addEventListener('click', () => {
        const username = document.getElementById('username').value;
        if (username.trim() !== '') {
            // Save to localStorage
            localStorage.setItem('username', username);

            // Simulate saving to JSON
            const userData = {
                username: username,
                loginTime: new Date().toISOString()
            };
            console.log(JSON.stringify(userData));

            // Hide the overlay
            overlay.style.display = 'none';
        } else {
            alert('Voer alstublieft uw naam in.');
        }
    });
});