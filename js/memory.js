const grid = document.getElementById("grid");
const startBtn = document.getElementById("startBtn");
const statusText = document.getElementById("statusText");
const congratsEl = document.getElementById("congrats");
const levelText = document.getElementById("levelText");
const livesEl = document.getElementById("lives");

const ICON_POOL = [
  "🍎",
  "🍌",
  "🍇",
  "🍉",
  "🍒",
  "🍋",
  "🍓",
  "🥝",
  "🍍",
  "🥕",
  "🍄",
  "⭐",
  "⚽",
  "🎲",
  "🎈",
  "🚀",
  "🎵",
  "🧩",
  "💎",
  "🎁",
];

const INITIAL_CARD_COUNT = 6;
const MAX_CARD_COUNT = 24;
const CARD_STEP = 2;
const MAX_LIVES = 3;

let currentCardCount = INITIAL_CARD_COUNT;
let currentLevel = 1;
let livesRemaining = MAX_LIVES;
let openCards = [];
let matchedPairs = 0;
let boardLocked = false;
let gameActive = false;
let previewTimeoutId = null;

function renderLives() {
  const hearts = livesEl.querySelectorAll(".life");

  hearts.forEach((heart, index) => {
    heart.classList.toggle("lost", index >= livesRemaining);
  });
}

function updateHud() {
  levelText.textContent = `LEVEL: ${currentLevel}`;
  renderLives();
}

function getColumnCount(cardCount) {
  const startingPoint = Math.ceil(Math.sqrt(cardCount));

  for (let cols = startingPoint; cols <= cardCount; cols += 1) {
    if (cardCount % cols === 0) {
      return cols;
    }
  }

  return cardCount;
}

function updateGridLayout() {
  const cols = getColumnCount(currentCardCount);
  const gap = currentCardCount >= 18 ? 10 : 12;
  const availableWidth = Math.min(window.innerWidth * 0.92, 1180);
  const size = Math.max(
    44,
    Math.min(96, Math.floor((availableWidth - (cols - 1) * gap) / cols))
  );

  grid.style.setProperty("--cols", cols);
  grid.style.setProperty("--gap", `${gap}px`);
  grid.style.setProperty("--card-size", `${size}px`);
}

function buildDeck() {
  const pairCount = currentCardCount / 2;
  const levelIcons = ICON_POOL.slice(0, pairCount);

  return [...levelIcons, ...levelIcons].sort(() => Math.random() - 0.5);
}

function createCard(icon) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "card";
  card.dataset.value = icon;
  card.innerHTML = `
    <span class="card-inner">
      <span class="card-face card-back" aria-hidden="true"></span>
      <span class="card-face card-front">${icon}</span>
    </span>
  `;

  card.addEventListener("click", () => handleCardClick(card));
  return card;
}

function renderLevel() {
  grid.innerHTML = "";
  updateGridLayout();

  buildDeck().forEach((icon) => {
    grid.appendChild(createCard(icon));
  });
}

function previewCards() {
  const cards = grid.querySelectorAll(".card");

  boardLocked = true;
  gameActive = false;
  statusText.textContent = "Perhatikan posisi kartu selama 3 detik...";

  cards.forEach((card) => {
    card.classList.add("flipped");
  });

  clearTimeout(previewTimeoutId);
  previewTimeoutId = setTimeout(() => {
    cards.forEach((card) => {
      card.classList.remove("flipped");
    });

    openCards = [];
    boardLocked = false;
    gameActive = true;
    statusText.textContent = "Cocokkan semua pasangan kartu tanpa salah tebakan.";
  }, 3000);
}

function startGame() {
  clearTimeout(previewTimeoutId);
  currentCardCount = INITIAL_CARD_COUNT;
  currentLevel = 1;
  livesRemaining = MAX_LIVES;
  startBtn.style.display = "none";
  startBtn.textContent = "Start Again";
  congratsEl.style.display = "none";
  congratsEl.textContent = "";
  statusText.textContent = "Cocokkan semua pasangan kartu tanpa salah tebakan.";

  loadLevel();
}

function loadLevel() {
  openCards = [];
  matchedPairs = 0;
  boardLocked = true;
  gameActive = false;
  livesRemaining = MAX_LIVES;
  statusText.textContent = "Cocokkan semua pasangan kartu tanpa salah tebakan.";
  congratsEl.style.display = "none";

  updateHud();
  renderLevel();
  previewCards();
}

function handleCardClick(card) {
  if (
    !gameActive ||
    boardLocked ||
    card.classList.contains("flipped") ||
    card.classList.contains("matched")
  ) {
    return;
  }

  card.classList.add("flipped");
  openCards.push(card);

  if (openCards.length === 2) {
    boardLocked = true;
    setTimeout(checkOpenCards, 550);
  }
}

function checkOpenCards() {
  const [firstCard, secondCard] = openCards;

  if (!firstCard || !secondCard) {
    boardLocked = false;
    return;
  }

  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedPairs += 1;
    updateHud();

    openCards = [];
    boardLocked = false;

    if (matchedPairs === currentCardCount / 2) {
      handleLevelComplete();
    }

    return;
  }

  firstCard.classList.remove("flipped");
  secondCard.classList.remove("flipped");
  openCards = [];
  boardLocked = false;
  livesRemaining -= 1;
  renderLives();

  if (livesRemaining <= 0) {
    handleLoss();
  } else {
    statusText.textContent = `Salah tebak. Nyawa tersisa: ${livesRemaining}`;
  }
}

function handleLevelComplete() {
  if (currentCardCount >= MAX_CARD_COUNT) {
    gameActive = false;
    statusText.textContent = "";
    congratsEl.textContent = "🎉 Congratulations! You have finished the game";
    congratsEl.style.display = "block";
    startBtn.style.display = "inline-flex";
    return;
  }

  gameActive = false;
  boardLocked = true;
  livesRemaining = MAX_LIVES;
  updateHud();

  setTimeout(() => {
    currentCardCount += CARD_STEP;
    currentLevel += 1;
    loadLevel();
  }, 600);
}

function handleLoss() {
  clearTimeout(previewTimeoutId);
  gameActive = false;
  boardLocked = true;
  statusText.textContent =
    "Kamu kalah. Tekan Start Again untuk mulai dari awal.";
  startBtn.style.display = "inline-flex";
}

startBtn.addEventListener("click", startGame);
window.addEventListener("resize", updateGridLayout);

updateHud();
updateGridLayout();
