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
}

formateDate();

function changeCity(event) {
  event.preventDefault();
  let input = document.querySelector("#cityInput");

  let city = document.querySelector(".city");
  city.innerHTML = `${input.value}`;

  let apiKey = "82f43b0671f2tb328187o7be4ab620aa";
  let cityName = document.querySelector("#cityInput").value;
  let url = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
  axios.get(url).then(changeCurrentTemp);
  axios.get(url).then(changeCondition);
  axios.get(url).then(changeHumidity);
  axios.get(url).then(changeWind);
  axios.get(url).then(changeEmoji);
}
let form = document.querySelector("#citySearch");
form.addEventListener("submit", changeCity);

function changeCurrentTemp(response) {
  let currentTemp = Math.round(response.data.temperature.current);
  let currentTemperature = document.querySelector(".currentTemperature");
  currentTemperature.innerHTML = `${currentTemp}`;

  celsiusTemp = response.data.temperature.current;
}

function changeCondition(response) {
  console.log(response.data)
  let condition = document.querySelector(".currentCondition");
  condition.innerHTML = response.data.condition.description;
}

function changeHumidity(response) {
  let humidity = document.querySelector(".humidity");
  let currentHumidity = response.data.temperature.humidity;
  humidity.innerHTML = `${currentHumidity}%`;
}

function changeWind(response) {
  let wind = document.querySelector(".wind");
  let currentWind = response.data.wind.speed;
  wind.innerHTML = `${currentWind}km/h`;
}

function changeEmoji(response) {
  let currentEmoji = document.querySelector("#currentEmoji");
  currentEmoji.setAttribute("src" , `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector(".currentTemperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemp);

}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector(".currentTemperature");
  currentTemperature.innerHTML = Math.round(celsiusTemp);
}


let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", convertToCelsius);