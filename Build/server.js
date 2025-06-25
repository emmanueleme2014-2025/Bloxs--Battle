const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Load database
function loadDB() {
  return JSON.parse(fs.readFileSync('db.json', 'utf8'));
}

function saveDB(data) {
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
}

// Create or load player
app.post('/player/:name', (req, res) => {
  const name = req.params.name;
  const db = loadDB();
  if (!db[name]) {
    db[name] = { level: 1, bounty: 0, fruits: [] };
    saveDB(db);
  }
  res.json(db[name]);
});

// Roll and battle (mock PvC)
app.post('/battle/:name', (req, res) => {
  const name = req.params.name;
  const db = loadDB();
  const player = db[name];
  if (!player) return res.status(404).send('Player not found');

  const roll = Math.floor(Math.random() * 100) + 1;
  const win = roll > 50;
  if (win) {
    player.level += 1;
    player.bounty += 10;
    player.fruits.push(`Fruit-${roll}`);
    saveDB(db);
  }
  res.json({ roll, result: win ? 'win' : 'lose', player });
});

// Buy a fruit
app.post('/buy/:name', (req, res) => {
  const name = req.params.name;
  const { fruit, cost } = req.body;
  const db = loadDB();
  const player = db[name];
  if (!player) return res.status(404).send('Player not found');
  if (player.bounty < cost) return res.status(400).send('Not enough bounty');

  player.bounty -= cost;
  player.fruits.push(fruit);
  saveDB(db);
  res.json(player);
});

app.listen(PORT, () => console.log(`BLX-FRT server running on port ${PORT}`));
