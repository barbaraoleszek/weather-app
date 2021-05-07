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
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
dayDate.innerHTML = `${weekday}, ${hours}:${minutes}`;

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
  celciusTemperature = response.data.main.temp;
  weatherDescription.innerText = response.data.weather[0].description;
  mainIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" style="width: 82px;"/>`;
  getWind.innerText = response.data.wind.speed;
 getHumidity.innerText = response.data.main.humidity;

 getForecast(response.data.coord);
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
  
  spanDayTemp.innerText = Math.round(response.data.main.temp);
  weatherDescription.innerText = response.data.weather[0].description;
  celciusTemperature = response.data.main.temp;
  mainIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" />`;
  getWind.innerText = response.data.wind.speed;
  getHumidity.innerText = response.data.main.humidity;

 getForecast(response.data.coord);


}
// Forecast
function getForecast(coords) {
  axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`).
  then(displayForecast);

}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDt, index) {
if (index < 6 ) {
  forecastHTML = forecastHTML + `<div class="row p-2 justify-content-center first">
        <div class="col p-2 col-sm-2 day">${new Date(forecastDt.dt *1000).toLocaleString("default", { weekday: "long" })}</div>
        <div class="col p-2 col-sm-2 icon"><img src="http://openweathermap.org/img/wn/${forecastDt.weather[0].icon}@2x.png" style="width: 45px;"/></div>
        <div class="col p-2 col-sm-2 temperature">${Math.round(forecastDt.temp.max)}°/${Math.round(forecastDt.temp.min)}°</div>
      </div>`;
    }
    
  })
  
  forecastElement.innerHTML = forecastHTML;
      
}







