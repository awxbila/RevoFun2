const startSection = document.getElementById("start-section");
const gameSection = document.getElementById("game-section");
const playBtn = document.getElementById("playBtn");
const resetBtn = document.getElementById("resetBtn");
const themeToggle = document.getElementById("themeToggle");
const resultEl = document.getElementById("result");
const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");
const playerMoveEl = document.getElementById("playerMove");
const computerMoveEl = document.getElementById("computerMove");
const choiceButtons = document.querySelectorAll(".choice-btn");

const moveIcons = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️",
};

let playerScore = 0;
let computerScore = 0;
let matchOver = false;

function updateScoreboard() {
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

function setResult(message, type = "") {
  resultEl.textContent = message;
  resultEl.className = `result-text ${type}`.trim();
}

function resetMatch() {
  playerScore = 0;
  computerScore = 0;
  matchOver = false;
  resetBtn.hidden = true;

  updateScoreboard();
  setResult("First to 10 points wins!");
  playerMoveEl.textContent = moveIcons.rock;
  computerMoveEl.textContent = moveIcons.rock;

  choiceButtons.forEach((button) => {
    button.disabled = false;
  });
}

function startGame() {
  startSection.style.display = "none";
  gameSection.hidden = false;
  gameSection.style.display = "block";
  resetMatch();
}

function play(playerChoice) {
  if (matchOver) {
    return;
  }

  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  playerMoveEl.textContent = moveIcons[playerChoice];
  computerMoveEl.textContent = moveIcons[computerChoice];

  if (playerChoice === computerChoice) {
    setResult("IT'S A DRAW!", "draw");
    return;
  }

  const playerWins =
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper");

  if (playerWins) {
    playerScore += 1;
    setResult("YOU WON THIS ROUND! 🎉", "player");
  } else {
    computerScore += 1;
    setResult("COMPUTER WON THIS ROUND! 🎉", "computer");
  }

  updateScoreboard();

  if (playerScore >= 10 || computerScore >= 10) {
    matchOver = true;
    choiceButtons.forEach((button) => {
      button.disabled = true;
    });
    resetBtn.hidden = false;

    setResult(
      playerScore >= 10
        ? "🎉 YOU WON THE MATCH!"
        : "🎉 COMPUTER WON THE MATCH!",
      `match-win ${playerScore >= 10 ? "player" : "computer"}`
    );
  }
}

playBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetMatch);

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  themeToggle.textContent = document.body.classList.contains("light-theme")
    ? "☀"
    : "☾";
});

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    play(button.dataset.choice);
  });
});

gameSection.hidden = true;
updateScoreboard();
