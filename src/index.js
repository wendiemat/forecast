function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let humidityElement = document.querySelector("#condition-humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windElement = document.querySelector("#condition-wind");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  let date = new Date(response.data.time * 1000);

  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  //call api and update interface
  let apiKey = "bebdb91759t6f0a32a7b0d2b4b280oc5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "bebdb91759t6f0a32a7b0d2b4b280oc5";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let days = ["Thurs", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
      <div class="weather-forecast-date">${day}</div>
      <img
        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png"
        width="42px"
      />
      <div class="weather-forecast-temp">
        <span class="weather-forecast-temp-max">18°</span>
        <span class="weather-forecast-temp-min">12°</span>
      </div>
      </div>
    
`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFromElement = document.querySelector("#search-form");
searchFromElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
