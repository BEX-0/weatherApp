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

  let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  let cityName = document.querySelector("#cityInput").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(url).then(changeCurrentTemp);
  axios.get(url).then(changeCondition);
  axios.get(url).then(changeHumidity);
}
let form = document.querySelector("#citySearch");
form.addEventListener("submit", changeCity);

function changeCurrentTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector(".currentTemperature");
  currentTemperature.innerHTML = `${currentTemp}°C`;
}

function changeCondition(response) {
  console.log(response.data)
  let condition = document.querySelector(".currentCondition");
  condition.innerHTML = response.data.weather[0].main;
}

function changeHumidity(response) {
  let humidity = document.querySelector(".humidity");
  let currentHumidity = response.data.main.humidity;
  humidity.innerHTML = `${currentHumidity}%`;
}