function formateDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let currentDateTime = `${day} ${hour}:${minute}`;

  let dateTime = document.querySelector(".date-time");
  dateTime.innerHTML = `${currentDateTime}`;

  return currentDateTime;
}

formateDate();

function changeCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
    
  let city = document.querySelector(".city");
  city.innerHTML = `${input.value}`;
    
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
    
  let apiKey = "82f43b0671f2tb328187o7be4ab620aa";
  let cityName = document.querySelector("#city-input").value;
  let url = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
    
  axios.get(url).then(changeCurrentWeather);
}
let form = document.querySelector("#city-search");
form.addEventListener("submit", changeCity);
  
let currentTemperature = document.querySelector(".current-temperature");

function changeCurrentWeather(response) {
  let currentTemp = Math.round(response.data.temperature.current);
  currentTemperature.innerHTML = currentTemp;

  celsiusTemp = response.data.temperature.current;

  let condition = document.querySelector(".current-condition");
  condition.innerHTML = response.data.condition.description;

  let humidity = document.querySelector(".humidity");
  let currentHumidity = response.data.temperature.humidity;
  humidity.innerHTML = `${currentHumidity}%`;
  
  let wind = document.querySelector(".wind");
  let currentWind = response.data.wind.speed;
  wind.innerHTML = `${currentWind}km/h`;
  
  let currentEmoji = document.querySelector("#current-emoji");
  currentEmoji.setAttribute("src" , `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);

  getFiveDay(response.data.city);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemp);
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  currentTemperature.innerHTML = Math.round(celsiusTemp);
}


let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", convertToCelsius);	

function formatDateForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]

  return days[day];
}

function changeFiveDay(response) {
  let fiveDayForecast = response.data.daily;
  let fiveDay = document.querySelector(".five-day");
  let fiveDayHTML =`<div class="row">`;
fiveDayForecast.slice(0, 5).forEach(function(forecastDay) {
    fiveDayHTML += `
    <div class="col">
      <div class="card">
        <div class="card-body">
          <div class="day">
            <strong>${formatDateForecast(forecastDay.time)}</strong>
          </div>
          <img src="${forecastDay.condition.icon_url}" alt="weather-icon" id="five-day-emoji"></img>
          <div class="high-low">
            <div class="five-day-high">
              <strong>
              ${Math.round(forecastDay.temperature.maximum)}°
              </strong>
            </div>
            <div class="five-day-low">
            ${Math.round(forecastDay.temperature.minimum)}°
            </div>
          </div>
        </div>
      </div>
    </div>`
    ;
  });
  fiveDay.innerHTML = fiveDayHTML;  
}
function getFiveDay(city) {
  let apiKey = "82f43b0671f2tb328187o7be4ab620aa";
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(url).then(changeFiveDay);
}

getFiveDay("Tokyo");
axios.get(`https://api.shecodes.io/weather/v1/current?query=Tokyo&key=82f43b0671f2tb328187o7be4ab620aa&units=metric`).then(changeCurrentWeather);