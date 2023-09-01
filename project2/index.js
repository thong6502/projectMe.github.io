const citys = document.querySelector("#citys");
const container = document.querySelector(".container");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");


citys.addEventListener("change", weather);
function weather() {
  const APIKey = "a8aad2beb7627b2bc1b9de8f16b7ecfb";
  const city = citys.value;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }
      error404.style.display = "none";
      error404.classList.remove = "fadeIn";

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.scr = "./images/clear.png";
          break;
        case "Clouds":
          image.src = "./images/cloud.png";
          break;
        case "Snow":
          image.src = "./images/snow.png";
          break;
        case "Rain":
          image.src = "./images/rain.png";
          break;
        default:
          image.src = "";
      }

      temperature.innerHTML = `${
        parseInt(json.main.temp) - 273.5
      }<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.classList.remove("fadeIn");
      weatherDetails.classList.remove("fadeIn");

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      setTimeout(() => {
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
      },10)
      
    });
}

window.addEventListener("load", weather);