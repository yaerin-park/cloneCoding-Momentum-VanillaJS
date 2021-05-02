const domTemperature = document.querySelector(".js-temperature"),
      domWeatherIcon = document.querySelector(".js-weather>img"),
      domPlace       = document.querySelector(".js-place");

const WT_API_KEY = 'ab97559accf2fd18b547d7e7c01829c9';
const COORDS = 'coords';    //coordinate(co-ordinate) : 좌표

function getWeather(lat, lon) { 
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WT_API_KEY}&units=metric`).then(function(response) {
        return response.json();
    }).then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        const weatherIcon = json.weather[0].icon;
        const weatherDes = json.weather[0].description;

        domTemperature.innerText = `${Math.floor(temperature)}°`;
        domWeatherIcon.src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
        domWeatherIcon.alt = weatherDes;
        domPlace.innerText = place;
        
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,       //= latitude: latitude 와 같은 의미     → key 가 변수명과 같을 때는 이렇게 쓸 수 있음.
        longitude       //= longitude: longitude 와 같은 의미
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();