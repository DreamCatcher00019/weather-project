function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-text-city");
  let city = document.querySelector("#cityName");
  city.innerHTML = `${cityInput.value}`;
  let apiKey = "f4f13ed40d6c9b1367a0c0fac17dc7c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function btnCity(position) {
  let apiKey = "f4f13ed40d6c9b1367a0c0fac17dc7c3";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showLocation);
}

function showLocation(response) {
  let cityCoord = response.data.name;
  let cityInput = document.querySelector("#search-text-city");
  let city = document.querySelector("#cityName");
  cityInput.value = "";
  city.innerHTML = `${cityCoord}`;
  let apiKey = "f4f13ed40d6c9b1367a0c0fac17dc7c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityCoord}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#tempNow");
  currentTemp.innerHTML = `${temp}°`;

  let tempMin = Math.round(response.data.main.temp_min);
  let currentTempMin = document.querySelector("#details-low");
  currentTempMin.innerHTML = `${tempMin}°`;

  let tempMax = Math.round(response.data.main.temp_max);
  let currentTempMax = document.querySelector("#details-high");
  currentTempMax.innerHTML = `${tempMax}°`;

  let humidity = Math.round(response.data.main.humidity);
  let currentHumidity = document.querySelector("#details-hum");
  currentHumidity.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#details-wind");
  currentWind.innerHTML = `${wind}m/s`;
}

function getLocation(event) {
  navigator.geolocation.getCurrentPosition(btnCity);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", enterCity);

let btn = document.querySelector("button");
btn.addEventListener("click", getLocation);

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = String(now.getHours()).padStart(2, "0");
let minutes = String(now.getMinutes()).padStart(2, "0");
let dayTime = document.querySelector("#dayTime");
dayTime.innerHTML = `${day} ${hours}:${minutes}`;
