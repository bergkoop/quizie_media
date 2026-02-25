const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to save user data
app.post('/save-data', (req, res) => {
    const userData = req.body;
    const filePath = path.join(__dirname, 'data', `${userData.username}.json`);

    fs.writeFile(filePath, JSON.stringify(userData, null, 2), (err) => {
        if (err) {
            console.error('Error saving data:', err);
            return res.status(500).send('Failed to save data.');
        }
        res.send('Data saved successfully!');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});