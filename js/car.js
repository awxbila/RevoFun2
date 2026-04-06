const game = document.getElementById("game");
const road = document.getElementById("road");
const startBtn = document.getElementById("startBtn");
const scoreEl = document.getElementById("score");
const titlePanel = document.getElementById("titlePanel");
const homeBtn = document.getElementById("homeBtn");

const CAR_IMAGES = {
  player: "../assets/cars/playercar.png",
  enemies: [
    "../assets/cars/enemycar1.png",
    "../assets/cars/enemycar2.png",
    "../assets/cars/enemycar3.png",
  ],
};

let player,
  speed = 5,
  keys = {},
  score = 0;
let enemies = [];
let gameActive = false;
let animationFrameId = null;
let currentLaneIndex = 1;
let targetPlayerLeft = 0;

function getCarSize(type = "enemy") {
  const laneWidth = road.offsetWidth / 4;
  const width = Math.round(
    Math.max(type === "player" ? 84 : 76, Math.min(laneWidth * 0.5, 98))
  );

  return {
    width,
    height: Math.round(width * 1.65),
  };
}

function updateScore() {
  scoreEl.innerText = "Score: " + score;
}

function getLanePositions(type = "player") {
  const laneCount = 4;
  const carWidth = getCarSize(type).width;
  const laneWidth = road.offsetWidth / laneCount;

  return Array.from({ length: laneCount }, (_, index) => {
    return Math.round(index * laneWidth + (laneWidth - carWidth) / 2);
  });
}

function getRandomLaneLeft(type = "enemy") {
  const lanes = getLanePositions(type);
  return lanes[Math.floor(Math.random() * lanes.length)] + "px";
}

function setPlayerLane(nextLaneIndex) {
  const lanes = getLanePositions("player");

  currentLaneIndex = Math.max(0, Math.min(lanes.length - 1, nextLaneIndex));
  targetPlayerLeft = lanes[currentLaneIndex];
}

function getRandomEnemyImage() {
  const availableEnemyImages = CAR_IMAGES.enemies.filter(Boolean);

  if (availableEnemyImages.length === 0) {
    return "";
  }

  return availableEnemyImages[
    Math.floor(Math.random() * availableEnemyImages.length)
  ];
}

function applyCarImage(carElement, imagePath, type = "enemy") {
  const size = getCarSize(type);

  carElement.style.width = `${size.width}px`;
  carElement.style.height = `${size.height}px`;

  let sprite = carElement.querySelector(".car-sprite");

  if (!imagePath) {
    carElement.classList.remove("use-image");
    if (sprite) {
      sprite.remove();
    }
    return;
  }

  if (!sprite) {
    sprite = document.createElement("img");
    sprite.className = "car-sprite";
    sprite.alt = "";
    sprite.draggable = false;
    carElement.appendChild(sprite);
  }

  sprite.onload = () => {
    carElement.classList.add("use-image");
  };

  sprite.onerror = () => {
    carElement.classList.remove("use-image");
    sprite.remove();
  };

  sprite.src = imagePath;
}

function startGame() {
  cancelAnimationFrame(animationFrameId);
  road.innerHTML = "";
  startBtn.style.display = "none";
  homeBtn.style.display = "none";
  titlePanel.classList.add("hidden");
  startBtn.textContent = "Start";
  score = 0;
  speed = 5;
  enemies = [];
  keys = {};
  gameActive = true;
  updateScore();

  player = document.createElement("div");
  player.classList.add("car");
  player.id = "player";
  road.appendChild(player);
  currentLaneIndex = 1;
  setPlayerLane(currentLaneIndex);
  player.style.left = targetPlayerLeft + "px";
  applyCarImage(player, CAR_IMAGES.player, "player");

  // lines
  const laneMarkers = [25, 50, 75];
  for (let i = 0; i < 8; i++) {
    laneMarkers.forEach((marker) => {
      let line = document.createElement("div");
      line.classList.add("line");
      line.y = i * 110;
      line.style.top = line.y + "px";
      line.style.left = marker + "%";
      road.appendChild(line);
    });
  }

  // enemies
  for (let i = 0; i < 3; i++) {
    let enemy = document.createElement("div");
    enemy.classList.add("car", "enemy");
    enemy.y = (i + 1) * -300;
    enemy.style.top = enemy.y + "px";
    enemy.style.left = getRandomLaneLeft("enemy");
    applyCarImage(enemy, getRandomEnemyImage(), "enemy");
    road.appendChild(enemy);
    enemies.push(enemy);
  }

  animationFrameId = requestAnimationFrame(gameLoop);
}

function moveLines() {
  const roadHeight = road.offsetHeight;

  document.querySelectorAll(".line").forEach((line) => {
    line.y += speed;
    if (line.y > roadHeight) {
      line.y = -60;
    }
    line.style.top = line.y + "px";
  });
}

function moveEnemies() {
  const roadHeight = road.offsetHeight;

  enemies.forEach((enemy) => {
    enemy.y += speed + 1.5;
    if (enemy.y > roadHeight) {
      enemy.y = -300;
      enemy.style.left = getRandomLaneLeft("enemy");
      applyCarImage(enemy, getRandomEnemyImage(), "enemy");
    }
    enemy.style.top = enemy.y + "px";

    if (gameActive && isCollide(player, enemy)) {
      endGame();
    }
  });
}

function isCollide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();

  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function gameLoop() {
  if (!gameActive) {
    return;
  }

  moveLines();
  moveEnemies();

  if (!gameActive) {
    return;
  }

  const playerLeft = player.offsetLeft;
  const distanceToLane = targetPlayerLeft - playerLeft;

  if (Math.abs(distanceToLane) > 1) {
    const step = Math.sign(distanceToLane) * Math.min(14, Math.abs(distanceToLane));
    player.style.left = playerLeft + step + "px";
  } else {
    player.style.left = targetPlayerLeft + "px";
  }

  score++;
  speed = 5 + Math.min(8, Math.floor(score / 200));
  updateScore();

  animationFrameId = requestAnimationFrame(gameLoop);
}

function endGame() {
  if (!gameActive) {
    return;
  }

  gameActive = false;
  cancelAnimationFrame(animationFrameId);
  startBtn.style.display = "block";
  homeBtn.style.display = "block";
  startBtn.textContent = "Start Again";
  titlePanel.classList.remove("hidden");
  enemies = [];

  alert("Game Over! Score: " + score);
}

document.addEventListener("keydown", (e) => {
  if (!["ArrowLeft", "ArrowRight"].includes(e.key)) {
    return;
  }

  e.preventDefault();

  if (keys[e.key]) {
    return;
  }

  keys[e.key] = true;

  if (!gameActive || !player) {
    return;
  }

  if (e.key === "ArrowLeft") {
    setPlayerLane(currentLaneIndex - 1);
  }

  if (e.key === "ArrowRight") {
    setPlayerLane(currentLaneIndex + 1);
  }
});

document.addEventListener("keyup", (e) => {
  if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
    keys[e.key] = false;
  }
});

// Mobile control
game.addEventListener(
  "touchmove",
  (e) => {
    if (!gameActive || !player) {
      return;
    }

    const touchX = e.touches[0].clientX;
    const roadRect = road.getBoundingClientRect();
    const desiredLeft = touchX - roadRect.left - player.offsetWidth / 2;
    const lanes = getLanePositions("player");

    let nearestLaneIndex = 0;
    let nearestDistance = Infinity;

    lanes.forEach((laneLeft, index) => {
      const distance = Math.abs(laneLeft - desiredLeft);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestLaneIndex = index;
      }
    });

    setPlayerLane(nearestLaneIndex);
    e.preventDefault();
  },
  { passive: false },
);

startBtn.addEventListener("click", startGame);
