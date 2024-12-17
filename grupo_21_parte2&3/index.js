const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8008; 
const group = 21;

app.use(cors());
app.use(express.json());


const users = new Map();
const games = new Map();
const waitingPlayers = new Map();

function generateGameId(data) {
    return crypto
        .createHash('md5')
        .update(JSON.stringify(data) + Date.now())
        .digest('hex');
}

app.post('/register', (req, res) => {
    console.log("req = " + JSON.stringify(req.body));
    console.log("nick = " + req.body.nick + " password = " + req.body.password);
    const { nick, password } = req.body;
  
    // Validate request body
    if (!nick || !password) {
      return res.status(400).json({ error: 'Missing nick or password' });
    }
  
    // Read existing users from users.json (or create empty array if file not found/invalid)
    let users = [];
    const usersFilePath = path.join(__dirname + "/../db/", 'users.json');
  
    try {
      const fileContent = fs.readFileSync(usersFilePath, 'utf8');
      if (fileContent.trim()) {
        users = JSON.parse(fileContent);
      }
    } catch (err) {
      // If file doesn't exist or can't be read, start fresh
      users = [];
    }
  
    // Append the new user to the array
    users.push({ nick, password });
  
    // Write updated user list to users.json
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  
    // Send response
    res.status(200).json({ message: 'User registered successfully!' });
  });

app.post('/join', (req, res) => {
    const { nick, password, group, size } = req.body;
    
    if (!users.has(nick) || users.get(nick) !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    for (const [waitingNick, data] of waitingPlayers) {
        if (waitingNick !== nick && data.size === size) {
            
            const gameId = generateGameId({ players: [waitingNick, nick], size });
            const game = {
                players: [waitingNick, nick],
                size,
                board: Array(24).fill(null),
                turn: waitingNick,
                phase: 'drop'
            };
            games.set(gameId, game);
            waitingPlayers.delete(waitingNick);
            return res.status(200).json({ game: gameId });
        }
    }

    
    waitingPlayers.set(nick, { size, timestamp: Date.now() });
    const gameId = generateGameId({ player: nick, size });
    res.status(200).json({ game: gameId });
});


app.get('/update', (req, res) => {
    const { nick, game } = req.query;
    
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const gameData = games.get(game);
    if (gameData) {
        const interval = setInterval(() => {
            res.write(`data: ${JSON.stringify({
                board: gameData.board,
                turn: gameData.turn,
                phase: gameData.phase
            })}\n\n`);
        }, 1000);

        req.on('close', () => {
            clearInterval(interval);
        });
    } else {
        res.write(`data: ${JSON.stringify({ error: 'Game not found' })}\n\n`);
    }
});

// Notify endpoint
app.post('/notify', (req, res) => {
    const { nick, password, game, cell } = req.body;
    
    // Validate user
    if (!users.has(nick) || users.get(nick) !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const gameData = games.get(game);
    if (!gameData) {
        return res.status(404).json({ error: 'Game not found' });
    }

    if (gameData.turn !== nick) {
        return res.status(400).json({ error: 'Not your turn' });
    }

    // Update game state
    gameData.board[cell] = nick;
    gameData.turn = gameData.players.find(p => p !== nick);
    games.set(game, gameData);

    res.status(200).json({});
});

// Leave endpoint
app.post('/leave', (req, res) => {
    const { nick, password, game } = req.body;
    
    // Validate user
    if (!users.has(nick) || users.get(nick) !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (games.has(game)) {
        games.delete(game);
    }
    if (waitingPlayers.has(nick)) {
        waitingPlayers.delete(nick);
    }

    res.status(200).json({});
});

// Ranking endpoint
app.get('/ranking', (req, res) => {
    // Implement ranking logic here
    res.status(200).json({ ranking: [] });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 