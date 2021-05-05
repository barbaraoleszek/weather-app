let apiKey = "6c4290abd5648abaf091c539d72478db";
let currentLocation = document.querySelector("#currentCity");
let spanDayTemp = document.querySelector("#day-temp");
let getWind = document.querySelector("#get-wind");
let getHumidity = document.querySelector("#get-humidity");
let weatherDescription = document.querySelector("#weather-description");
let mainIcon = document.querySelector("#main-icon");

// Date and time

let now = new Date();
let dayDate = document.querySelector("#day-date");
let weekday = now.toLocaleString("default", { weekday: "long" });

dayDate.innerHTML = `${weekday}, ${now.getHours()}:${now.getMinutes()}`;

// On Load Location

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    )
    .then(getTempInLocation);
}
function getTempInLocation(response) {

  currentLocation.innerText = `${response.data.name}`; 
  spanDayTemp.innerText = Math.round(response.data.main.temp);
  weatherDescription.innerText = response.data.weather[0].description;
  mainIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" />`;
  getWind.innerText = response.data.wind.speed;
 getHumidity.innerText = response.data.main.humidity;
}

  navigator.geolocation.getCurrentPosition(handlePosition);



//Search Engine

function handleKeyword(event) {
  event.preventDefault();

  currentCity.innerHTML = `${newCity.value}`;

  getTemp();
}
let newCity = document.querySelector("#search");
let currentCity = document.querySelector("#currentCity");
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleKeyword);

// get city temperature


function getTemp(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showDayInfo);
}

function showDayInfo(response) {
  let spanDayTemp = document.querySelector("#day-temp");
  spanDayTemp.innerText = Math.round(response.data.main.temp);
  weatherDescription.innerText = response.data.weather[0].description;
  mainIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" />`;
 getWind.innerText = response.data.wind.speed;
 getHumidity.innerText = response.data.main.humidity;

 


}


// Celsius to Fahrenheit

function changeToCelsius() {
  dayTemp.innerText = `${Math.round((dayTemp.innerText - 32) / 1.8)}`;

//  nightTemp.innerText = `${Math.round((nightTemp.innerText - 32) / 1.8)}`;
}

function changetoFahrenheit() {
  dayTemp.innerText = `${Math.round(dayTemp.innerText * 1.8 + 32)}`;

//  nightTemp.innerText = `${Math.round(nightTemp.innerText * 1.8 + 32)}`;
}

let dayTemp = document.querySelector("#day-temp");

let nightTemp = document.querySelector("#night-temp");

let celcius = document.querySelector("#celsius");
celcius.addEventListener("click", changeToCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changetoFahrenheit);
