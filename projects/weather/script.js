async function getWeather(){

  let city =
  document.getElementById("city").value;

  let apiKey = "1d0a21fac1244296ac473241262005";

  let url =
  `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  let response = await fetch(url);

  let data = await response.json();

  document.getElementById("temp").innerHTML =
  data.current.temp_c + "°C";

  document.getElementById("condition").innerHTML =
  data.current.condition.text;

  document.getElementById("humidity").innerHTML =
  "Humidity: " + data.current.humidity + "%";

  document.getElementById("wind").innerHTML =
  "Wind: " + data.current.wind_kph + " kph";

  document.getElementById("time").innerHTML =
  data.location.localtime;

  document.getElementById("icon").src =
  data.current.condition.icon;
}
