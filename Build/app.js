const fruitMap = {
  1: "🍋 BLX-Lemon",
  10: "🌶️ BLX-Blaze Pepper",
  20: "❄️ BLX-Frost Berry",
  30: "⚡ BLX-Thunder Melon",
  50: "🌪️ BLX-Gale Mango",
  70: "🔥 BLX-Magma Pomegranate",
  90: "🧠 BLX-Psychic Plum",
  100: "💎 BLX-Divine Dragonfrt"
};

let userFruits = [];

function login() {
  const u = document.getElementById('username').value.trim();
  const p = document.getElementById('password').value.trim();
  const savedUsers = JSON.parse(localStorage.getItem("blxUsers")) || {};

  if (savedUsers[u] && savedUsers[u] === p) {
    alert(`Welcome back, ${u.toUpperCase()}! 🌟`);
    document.querySelector('.auth').style.display = 'none';
    document.querySelector('.game').style.display = 'block';
  } else {
    alert("❌ Invalid username or password!");
  }
}

function createAccount() {
  const u = document.getElementById('username').value.trim();
  const p = document.getElementById('password').value.trim();
  const savedUsers = JSON.parse(localStorage.getItem("blxUsers")) || {};

  if (savedUsers[u]) {
    alert("⚠️ Username already exists!");
  } else if (u && p) {
    savedUsers[u] = p;
    localStorage.setItem("blxUsers", JSON.stringify(savedUsers));
    alert(`✅ Account created for ${u}! Now log in.`);
  } else {
    alert("Please enter both username and password to sign up.");
  }
}

function startMode(mode) {
  document.getElementById('gameplay').style.display = 'block';
  document.querySelector('.mode-select').style.display = 'none';
  alert(`🎮 You entered ${mode.toUpperCase()} Mode`);
}

function rollFruit() {
  const roll = Math.floor(Math.random() * 100) + 1;
  let result = `🎲 You rolled a ${roll}! `;
  let fruit = "🍋 BLX-Lemon";
  for (let key in fruitMap) {
    if (roll >= key) fruit = fruitMap[key];
  }
  result += `You got: ${fruit}`;
  userFruits.push(fruit);
  document.getElementById('rollResult').textContent = result;
  updateInventory();
}

function updateInventory() {
  const div = document.getElementById('fruitInventory');
  div.innerHTML = "<h4>🍉 Your BLX-FRT Collection</h4><ul>" +
    userFruits.map(f => `<li>${f}</li>`).join('') +
    "</ul>";
}

function toggleTheme() {
  document.body.classList.toggle('dark');
}
