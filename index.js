const express = require('express');
const path = require('path');
const { encrypt, decrypt } = require('./utils/encryption');
const cors = require('cors');

const bodyParser = require('body-parser');

console.log(__dirname);


const app = express();
const port = process.env.PORT || 3000;

// const port = 3000;

app.use(express.json());
app.use(cors());

const gameSessions = {};



app.get('/', (req, res) => {
  res.redirect('/front-page');
});

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'main-menu.html'));
// });
app.get('/front-page', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'front-page.html'));
});

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory
//bug was fixed when app.use was brought down to line 37 , it was initially at line 18

// Example route for main-menu.html
app.get('/main-menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main-menu.html'));
});


// Serve the one-v-one.html file
app.get('/one-v-one', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','one-v-one.html'));
});

// Serve the index.html file
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','index.html'));
});

app.get('/time-rush', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','time-rush.html'));
}); 
app.get('/expired', (req, res) => {
  
  res.sendFile(path.join(__dirname, 'public', 'expired.html'));
});

app.get('/rules', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'rules.html'));
});
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about-us.html'));
});

app.get('/time-rush/time-rush-game/:mode', (req, res) => {
  // const mode = req.params.mode;
  // console.log(mode);
  res.sendFile(path.join(__dirname, 'public', 'time-rush-game.html'));
}); 


// Start a new game and return gameId
app.post('/start-game', (req, res) => {
  const { wordToFind } = req.body;
  if (!wordToFind) {
    return res.status(400).json({ error: 'Word to find is required' });
  }

  const gameId = encrypt(wordToFind);
  console.log('Encrypted gameId:', gameId);

  var decryptedWord = decrypt(gameId);
  console.log('Decrypted word:', decryptedWord);

  const wordString = String(decryptedWord);
  console.log('Decrypted word as string:', wordString);

  const expirationTime = Date.now() + 60 * 1000 * 61; // Set expiration time to 61 minute from now

  gameSessions[gameId] = {
    wordToFind: gameId,
    startTime: null,
    expirationTime 
  };

  res.json({ gameId });
});


// Join an existing game session and return the wordToFind
app.get('/join-game', (req, res) => {
  const { gameId } = req.query;
  const decryptedWord = decrypt(gameId);
  
  if (!gameSessions[gameId]) {
    return res.redirect(`/expired?gameId=${gameId}/${decryptedWord}`);
  }
  if (gameSessions[gameId]) {
    if (Date.now() > gameSessions.expirationTime) {
      delete gameSessions[gameId];
      // return res.redirect(`/expired?gameId=${gameId}`); // Redirect to the expired page with gameId
      return res.status(410).sendFile(path.join(__dirname, 'public', 'expired.html'));
      // return res.redirect(`/expired?gameId=${gameId}`);
      
      // return res.status(410).json({ error: 'Game session has expired' });
    }
    res.json({ wordToFind: decryptedWord });
  } else {
    res.status(404).send('Game session not found');
  }
});

// Serve the game page based on gameId
app.get('/game/:gameId', (req, res) => {
  const gameId = req.params.gameId;
  const decryptedWord = decrypt(gameId);
  // console.log(decryptedWord);
  if (!gameSessions[gameId]) {
    return res.redirect(`/expired?gameId=${gameId}/${decryptedWord}`); 
  }
  if (Date.now() > gameSessions.expirationTime) {
    delete gameSessions[gameId];
    // return res.redirect(`/expired?gameId=${gameId}`); // Redirect to the expired page with gameId
    // return res.status(410).json({ error: 'Game session has expired' });
    return res.status(410).sendFile(path.join(__dirname, 'public', 'expired.html'));
  }

  if (gameSessions[gameId]) {
    res.sendFile(path.join(__dirname, 'public', 'left-one-v-one.html')); // Serve the game page
  } else {
    return res.redirect(`/expired?gameId=${gameId}/${decryptedWord}`);// Redirect to expired page
  }
});

app.use(bodyParser.json());

// Initialize an empty object to store leaderboard entries by gameId
let leaderboard = {};

// Handle POST request to submit player score
app.post('/submit-score', (req, res) => {
  const { gameId, playerName, time } = req.body;
  
  if (!gameSessions[gameId]) {
    return res.redirect(`/expired?gameId=${gameId}/${decryptedWord}`);
  }

  // Validate gameId, player name, and time
  if (!gameId || !playerName || !time) {
    return res.status(400).json({ error: 'Game ID, player name, and time are required' });
  }

  // Check if the game session exists and is not expired
  if (!gameSessions[gameId] || Date.now() > gameSessions[gameId].expirationTime) {
    delete gameSessions[gameId];
    
    // return res.status(410).json({ error: 'Game session has expired' });
    // return res.redirect(`/expired?gameId=${gameId}`); // Redirect to the expired page with gameId
    // return res.status(410).json({ error: 'Game session has expired' });
    return res.status(410).sendFile(path.join(__dirname, 'public','expired.html'));
  }

  // Initialize leaderboard entry if it doesn't exist for this gameId
  if (!leaderboard[gameId]) {
    leaderboard[gameId] = [];
  }

  // Add score to leaderboard for the specified gameId
  leaderboard[gameId].push({ playerName, time });

  // Respond with success message
  res.status(200).json({ message: 'Score submitted successfully' });
});



// Periodically clean up expired game sessions
setInterval(() => {
  // console.log('Starting cleanup process...');  //debug ke liye
  const now = Date.now();

  // Clean up game sessions
  for (const gameId in gameSessions) {
    // console.log(`Processing game session ${gameId}...`);  //debug ke liye
    
    if (now > gameSessions[gameId].expirationTime) {
      // console.log(`Deleting game session ${gameId}...`);
      delete gameSessions[gameId];
      // console.log(`Deleted game session ${gameId}...`);
      
    }
  }
  // console.log('Cleanup process completed.');   //debug ke liye

}, 60000); // Clean up every minute


// Handle GET request to retrieve leaderboard for a specific gameId
app.get('/leaderboard', (req, res) => {
  const gameId = req.query.gameId;

  // Check if gameId is provided and exists in leaderboard
  if (!gameId || !leaderboard[gameId]) {
    return res.status(404).json({ error: 'Leaderboard not found for this game ID' });
  }
 
  res.json(leaderboard[gameId]);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
