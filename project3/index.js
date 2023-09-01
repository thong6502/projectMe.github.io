//Random quotes api
const url = "https://api.quotable.io/random?minLength=80&maxLength=100"; 
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");

let time = 60;
let timer = "";
let mistakes = 0;

fetch(url)
  .then(response => response.json())
  .then(data => {
    let quote = data.content;
    quote = quote.split("").map(char => {
      return `<span class="quote-char">${char}</span>`
    })
    quoteSection.innerHTML = quote.join("");
  })

userInput.addEventListener("input", () => {
  let quoteChars = document.querySelectorAll(".quote-char");
  quoteChars = Array.from(quoteChars);
  let userInputChars = userInput.value.split("");
  quoteChars.forEach((char, index) => {
    if (char.innerText === userInputChars[index]) {
      char.classList.add("success");
    } else if (userInputChars[index] == null) {
      if (char.classList.contains("success")) {
        char.classList.remove("success");
      } else {
        char.classList.remove("fail")
      }
    } else {
      if (!char.classList.contains("fail")) {
        mistakes++;
        char.classList.add("fail");
      }
      document.getElementById("mistakes").innerText = mistakes;
    }

    let check = quoteChars.every(element => {
      return element.classList.contains("success");
    })

    if (check) {
      displayResult();
    }

  })
})

function updateTimer() {
  if(time === 0) {
    displayResult();
  } else {
    document.getElementById("timer").innerText = --time + "s";
  }
}

const timeReduce = () => {
  time = 60;
  timer = setInterval(updateTimer,1000)
}

function displayResult() {
  document.querySelector(".result").style.display = "block";
  document.getElementById("stop-test").style.display = "none";

  clearInterval(timer);
  userInput.disabled = true;
  let timeTaken = 1;
  if (time != 0) {
    timeTaken = (60 - time) / 60;
  }
  document.getElementById("wpm").innerText =
    (userInput.value.length / 5 / timeTaken).toFixed(2) + "wpm";
  document.getElementById("accuracy").innerText =
    Math.round(
      ((userInput.value.length - mistakes) / userInput.value.length) * 100
    ) + "%";
}

function startTest() {
  mistakes = 0;
  timer = null;
  userInput.disabled = false;
  timeReduce();
  document.getElementById("start-test").style.display = "none";
  document.getElementById("stop-test").style.display = "block";
}

window.onload = () => {
  userInput.value = "";
  userInput.disabled = true;
  document.getElementById("start-test").style.display = "block";
  document.getElementById("stop-test").style.display = "none";
}