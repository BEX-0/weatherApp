function formateDate() {
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
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let currentDateTime = `${day} ${hour}:${minute}`;

  let dateTime = document.querySelector(".dateTime");
  dateTime.innerHTML = `${currentDateTime}`;

  return currentDateTime;
  return days[day];
}

formateDate();

function changeCity(event) {
  event.preventDefault();
  let input = document.querySelector("#cityInput");
    
  let city = document.querySelector(".city");
  city.innerHTML = `${input.value}`;
    
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
    
  let apiKey = "82f43b0671f2tb328187o7be4ab620aa";
  let cityName = document.querySelector("#cityInput").value;
  let url = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
    
  axios.get(url).then(changeCurrentWeather);
}
let form = document.querySelector("#citySearch");
form.addEventListener("submit", changeCity);
  
let currentTemperature = document.querySelector(".currentTemperature");

function changeCurrentWeather(response) {
  let currentTemp = Math.round(response.data.temperature.current);
  currentTemperature.innerHTML = currentTemp;

  celsiusTemp = response.data.temperature.current;

  let condition = document.querySelector(".currentCondition");
  condition.innerHTML = response.data.condition.description;

  let humidity = document.querySelector(".humidity");
  let currentHumidity = response.data.temperature.humidity;
  humidity.innerHTML = `${currentHumidity}%`;
  
  let wind = document.querySelector(".wind");
  let currentWind = response.data.wind.speed;
  wind.innerHTML = `${currentWind}km/h`;
  
  let currentEmoji = document.querySelector("#currentEmoji");
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

function changeFiveDay(response) {
  console.log(response.data.daily);
    
  let fiveDayForecast = response.data.daily;
  let fiveDay = document.querySelector(".five-day");
  let fiveDayHTML =`<div class="row">`;
  fiveDayForecast.forEach(forecastDay => {
    let forecastHigh = Math.round(forecastDay.temperature.maximum);
    let forecastLow = Math.round(forecastDay.temperature.minimum);
    fiveDayHTML = fiveDayHTML + `
    <div class="col">
      <div class="card">
        <div class="card-body">
          <div class="day">
          <strong>${formateDate(forecastDay.dt)}</strong>
          </div>
          <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-day.png"" alt="weather-icon" id="five-day-emoji">
          <div class="highLow">
            <div class="five-day-high">
              <strong>
              ${forecastHigh}°
              </strong>
            </div>
            <div class="five-day-low">
            ${forecastLow}°
            </div
          </div>
        </div>
      </div>
    </div>
    `;
    fiveDayHTML = fiveDayHTML + `</div>`;
    fiveDay.innerHTML = fiveDayHTML;
  });
}  

function getFiveDay(city) {
  let apiKey = "82f43b0671f2tb328187o7be4ab620aa";
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(url).then(changeFiveDay);
  console.log(city);
}