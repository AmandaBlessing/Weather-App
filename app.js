function todaysDate(timestamp){
    let date = new Date();
    let hours = date.getHours();
    if(hours < 10){
        hours = `0${hours}`
    }
    let minutes = date.getMinutes();
    if(minutes < 10){
        minutes = `0${minutes}`
    }
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"]
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`


}



function displayTemperature(response){
    console.log(response.data)
    console.log(response.data.main.temp);
    let temperature = document.querySelector("#temperature-degree");
    temperature.innerHTML= Math.round(response.data.main.temp);
    let cityName = document.querySelector("#city-name");
    cityName.innerHTML = response.data.name;
    let descriptionOfTheWeather = document.querySelector("#description");
    descriptionOfTheWeather.innerHTML = response.data.weather[0].description;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity
    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(response.data.wind.speed);
    let date = document.querySelector("#date");
    date.innerHTML = todaysDate(response.data.dt * 1000);
    let icon = document.querySelector("#icon");
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
}
function search(city){
    let apiKey ="4bb43cad5562faf3e233d2f3dedb71c4";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);

}

function submit(event){
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit",submit);
function showPosition(position) {
    console.log('Structure of position object:', position);
    const reverseGeocodingURL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=YOUR_OPENWEATHERMAP_API_KEY`;

  fetch(reverseGeocodingURL)
      .then(response => response.json())
      .then(data => {
        if (data[0]) {
          const locationName = data[0].name;
          let h1 = document.querySelector("#city-input");
          h1.innerHTML = `Your location is ${locationName}`;
        } else {
          console.error('Unable to fetch location name from reverse geocoding.');
        }
      })
      .catch(error => {
        console.error('Error fetching location name:', error);
      });
  }

  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  let currentLocation = document.querySelector("#current-location");
  currentLocation.addEventListener("click", getCurrentPosition);
