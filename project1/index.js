let scoreMe = document.getElementById("score-me");
let scoreYou = document.getElementById("score-you");
let startBtn = document.getElementById("start-btn");
let resetBtn = document.getElementById("reset-btn");
let dices = document.getElementsByClassName("dice");
let time = 5000;
timeStr = "5s";
let turn = "me";
let score = 0;
startBtn.addEventListener("click", () => {
  let set = new Set();
  for (let i = 0; i < 3; i++) {
    let random = Math.floor(Math.random() * 6) + 1;
    set.add(random);
    score += random;
    dices[i].style.animation = "none";
    if (random === 1) {
      setTimeout(()=>{
        dices[i].style.animation = `rotate1 ${timeStr} ease-out forwards`;
      },10)
    } else if (random === 2) {
      setTimeout(()=>{
        dices[i].style.animation = `rotate2 ${timeStr} ease-out forwards`;
      },10)
    } else if (random === 3) {
      setTimeout(()=>{
        dices[i].style.animation = `rotate3 ${timeStr} ease-out forwards`;
      },10)
    } else if (random === 4) {
      setTimeout(()=>{
        dices[i].style.animation = `rotate4 ${timeStr} ease-out forwards`;
      },10)
    } else if (random === 5) {
      setTimeout(()=>{
        dices[i].style.animation = `rotate5 ${timeStr} ease-out forwards`;
      },10)
    } else if (random === 6) {
      setTimeout(()=>{
        dices[i].style.animation = `rotate6 ${timeStr} ease-out forwards`;
      },10)
    }
  }


  if (set.size === 1) score *= 10;
  setTimeout(() => {
    if (turn === "me") {
      score += +scoreMe.dataset.score;
      scoreMe.dataset.score = score;
      scoreMe.innerHTML = `Me: ${score}`;
      turn = "you";
    } else if (turn === "you") {
      score += +scoreYou.dataset.score;
      scoreYou.dataset.score = score;
      scoreYou.innerHTML = `You: ${score}`;
      turn = "me";
    }
    score = 0;
  },time)
  
  disableButton();
})

function disableButton() {
  startBtn.disabled = true;
  setTimeout(function () {
    startBtn.disabled = false;
  }, time);
}
resetBtn.addEventListener("click", () => {
  scoreMe.innerHTML = `Me: 0`;
  scoreYou.innerHTML = `You: 0`;
  scoreMe.dataset.score = "0";
  scoreYou.dataset.score = "0";
  turn = "me";
  for (let i = 0; i < dices.length; i++)
    dices[i].style.animation = "none";
  startBtn.disabled = false;
})