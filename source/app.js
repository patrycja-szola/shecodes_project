let heading = document.querySelector("h3");
let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekday = days[currentTime.getDay()];
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
heading.innerHTML = `${weekday}, ${hours}:${minutes}`;

// Geolocation & Weather API

let apiKey = "1a503fb7a97ad8050479d85fae658043";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=${units}&appid=${apiKey}`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = temperature;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  console.log(lat);
  console.log(lon);
  axios.get(`${apiUrl}&lat=${lat}&lon=${lon}`).then(showTemperature);

  let newApiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;

  let newCity2 = document.querySelector("#choosen-city");
  let currentLocation = axios.get(newApiUrl);
  console.log(currentLocation.value);
  newCity2.innerHTML = `${currentLocation.value}`;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function findAlert(event) {
  event.preventDefault();
  let city = document.querySelector("#selected-city");
  let newCity = document.querySelector("#choosen-city");
  newCity.innerHTML = `${city.value}`;
  axios.get(`${apiUrl}&q=${city.value}`).then(showTemperature);
}

let citySearch = document.querySelector("#findButton");
citySearch.addEventListener("click", findAlert);

let locationButton = document.querySelector("#currentLocationButton");
locationButton.addEventListener("click", getCurrentPosition);
