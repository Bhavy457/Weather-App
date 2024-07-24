// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const locationIcon = document.querySelector(".location-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
// Get the input field
var input = document.getElementById("search");
let city = "";
let latitude = 0.0;
let longitude = 0.0;
// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    city = input.value;
    getSearchWeather(city);
    console.log(city);
  }
});
// App data
const weather = {};
weather.temperature = {
  unit: "celsius",
};
// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "b8946f440b89108412a9559cc9e0707b";
// CHECK IF BROWSER SUPPORTS GEOLOCATION
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}
// SET USER'S POSITION
function setPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}
locationIcon.addEventListener("click", function(event) {
  console.log("hi");
  getWeather(latitude, longitude);
});
// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}
// SEARCH FOR WEATHER CONDITIONS IN THE USER INPUTTED LOCATION
function getSearchWeather(city) {
  let api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  fetch(api)
    .then(function(response) {
      let data = response.json();
      return data;
    })
    .then(function(data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function() {
      displayWeather();
    });
}
// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  fetch(api)
    .then(function(response) {
      let data = response.json();
      return data;
    })
    .then(function(data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function() {
      displayWeather();
    });
}
// DISPLAY WEATHER TO UI
function displayWeather() {
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}
