const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const hightScoreElement = document.querySelector(".hight-score");
const controls = document.querySelectorAll(".controls i");
const selectLevels = document.querySelector(".select-levels");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY=5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;
let speed = 150;

let hightScore = localStorage.getItem("hight-score") || 0;
hightScoreElement.innerText = hightScore;

function updateFoodPosition() {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
}

function handleGameover() {
  clearInterval(setIntervalId);
  alert("Game Over! Press OK to replay...");
  location.reload();
}

selectLevels.addEventListener("change", (e) => {
  speed = e.target.value === "easy" ? 150 : e.target.value === "medium" ? 100 : 50;
  clearInterval(setIntervalId);
  setIntervalId = setInterval(initGame, speed);
});

function changeDirection(e) {
  if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  } else if (e.key === "ArrowUp" && velocityY != 1) {
    velocityY = -1;
    velocityX = 0;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityY = 1;
    velocityX = 0;
  }
  selectLevels.disabled = true;
}

controls.forEach(button => {
  button.addEventListener("click", () => {
    changeDirection({ key: button.dataset.key });
  })
})

function initGame() {
  if (gameOver) return handleGameover();
  let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`

  if (snakeX === foodX && snakeY === foodY) {
    updateFoodPosition();
    snakeBody.push([foodY, foodX]);
    score++;
    hightScore = score >= hightScore ? score : hightScore;
    localStorage.setItem("hight-score", hightScore);
    scoreElement.innerText = score;
    hightScoreElement.innerText = hightScore;
  }  

  snakeX += velocityX;
  snakeY += velocityY;

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  snakeBody[0] = [snakeX, snakeY];

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    return (gameOver = true);
  }
  
  for (let i = 0; i < snakeBody.length; i++) {
    // Adding a div for each part of the snake's body
    if (i == 0) {
      html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    } else if (i == snakeBody.length - 1) {
      html += `<div class="tail" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    } else {
      html += `<div class="body" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    }
    // Checking if the snake head hit the body, if so set gameOver to true
    if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
      gameOver = true;
    }
  }
  playBoard.innerHTML = html;
}
updateFoodPosition();
setIntervalId = setInterval(initGame, speed);
document.addEventListener("keydown", changeDirection);