const wordLetter = document.querySelector(".word-letter");
const wordDisplay = document.querySelector(".word-display");
const playAgainBtn = document.querySelector(".play-again");
const img = document.querySelector(".box-img img");
const gameModal = document.querySelector(".game-modal");
var letterTop = [];
var letterBottom = [];
var maxGuesses = 6;
var countGuess = 0;
var dataWord = null;
var draggedElement = null;

async function randomQuestion() {
  resetGame();
  fetch("./word-list.json")
    .then((response) => response.json())
    .then((data) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomItem = data[randomIndex];
      dataWord = randomItem;
      document.querySelector(".question b").innerText = dataWord.question;

      wordLetter.innerHTML = dataWord.rdLetter
        .split("")
        .map(
          (char) => `<li class="letter-bottom" draggable="true">${char}</li>`
        )
        .join("");

      wordDisplay.innerHTML = dataWord.rdLetter
        .split("")
        .map(() => `<li class="letter-top" draggable="false"></li>`)
        .join("");

      addEventDragItems();
    });
}

function addEventDragItems() {
  letterTop = document.querySelectorAll(".letter-top");
  letterBottom = document.querySelectorAll(".letter-bottom");
  letterTop.forEach((item) => {
    item.addEventListener("dragstart", startDragging);
    item.addEventListener("dragend", endDragging);
    item.addEventListener("dragover", draggingOver);
    item.addEventListener("dragleave", draggingLeave);
    item.addEventListener("drop", handleDrop);
  });
  letterBottom.forEach((item) => {
    item.addEventListener("dragstart", startDragging);
    item.addEventListener("dragend", endDragging);
  });
}

function startDragging(e) {
  this.style.opacity = "0.4";
  draggedElement = this;
}
function draggingOver(e) {
  e.preventDefault();
  this.classList.add("drag");
}
function draggingLeave(e) {
  this.classList.remove("drag");
}
function endDragging(e) {
  this.style.opacity = "1";
  letterTop.forEach((item) => {
    item.classList.remove("drag");
  });
}

function handleDrop(e) {
  e.preventDefault();

  // Khi phần tử đang kéo là letter-bottom
  if (draggedElement.classList.contains("letter-bottom") &&!this.classList.contains("guessed")) {
    this.classList.add("guessed");
    this.draggable = true;
    this.innerText = draggedElement.innerText;
    draggedElement.parentNode.removeChild(draggedElement);
    checkWord();
  }

  // Hoán đổi vị trí của các element trong class word-display
  // Khi phần tử đang kéo có class là letter-top
  if (draggedElement !== this &&draggedElement.classList.contains("letter-top")) {
    const tempElement = document.createElement("li");
    tempElement.className = "letter-top";

    this.parentNode.replaceChild(tempElement, this);
    draggedElement.parentNode.replaceChild(this, draggedElement);
    tempElement.parentNode.replaceChild(draggedElement, tempElement);
    checkWord();
    handleImg();
  }
  draggedElement = null;
}
function handleImg() {
  countGuess++;
  document.querySelector(".guess-text span").innerText = `${countGuess} / ${maxGuesses}`;
  img.src = `./images/hangman-${countGuess}.svg`;
  if (countGuess >= 6) {
    handleGameOver(false);
  }
}

function checkWord() {
  letterTop = document.querySelectorAll(".letter-top");
  let string = "";
  let stringJson = dataWord.word.split(" ").join("");
  letterTop.forEach(char => {
    if (char !== "") {
      string += char.innerText;
    }
  })
  string = string.toLowerCase();
  console.log(string);
  if (string === stringJson) handleGameOver(true);
}

function handleGameOver(isVictory) {
  gameModal.querySelector("p").innerHTML = isVictory
    ? `Bạn đã tìm thấy từ: <b>${dataWord.word}</b>`
    : `Từ đúng là: <b>${dataWord.word}</b>`;
  gameModal.querySelector("img").src = `./images/${isVictory ? "victory" : "lost"}.gif`;
  gameModal.querySelector("h4").innerText = isVictory
    ? "You Win!"
    : "Game Over!";
  gameModal.classList.add("show");
}
function resetGame() {
  gameModal.classList.remove("show");
  countGuess = 0;
  dataWord = null;
  img.src = `./images/hangman-${countGuess}.svg`;
  document.querySelector(".guess-text span").innerText = `${countGuess} / ${maxGuesses}`;
}
playAgainBtn.addEventListener("click", randomQuestion);
randomQuestion();
