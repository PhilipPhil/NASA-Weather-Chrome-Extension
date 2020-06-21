function getTime(dt) {
    time = dt.toLocaleTimeString().split(":")[0] + ":" + dt.toLocaleTimeString().split(":")[1] + ' ' + dt.toLocaleTimeString().split(" ")[1]
    return time
}

function showMap(position) {
    lat = position.coords.latitude
    lon = position.coords.longitude
    setCurrent(lat, lon)
}

function setCurrent(lat, lon) {
    apikey = '3e7cd6048bd8114abedeee14fcc11575'
    const urlapi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=${apikey}`
    fetch(urlapi)
        .then(response => response.json())
        .then(data => getCurrent(data));
}

function getCurrent(data) {
    dt = new Date()
    description = data.weather[0].description.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    day = dt.toString().split(' ')[0];
    time = getTime(dt)
    currentweathericon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
    celsius = Math.round(data.main.temp - 273.15)
    sunrise = (new Date(data.sys.sunrise * 1000)).toLocaleTimeString()
    sunset = (new Date(data.sys.sunset * 1000)).toLocaleTimeString()
    humidity = data.main.humidity
    windspeed = data.wind.speed
    city = data.name
    min = Math.round(data.main.temp_min - 273.15)
    max = Math.round(data.main.temp_max - 273.15)

    document.getElementById('current-weather-description').innerText = day + ', ' + time + ', ' + description
    document.getElementById('current-weather-icon').src = currentweathericon
    document.getElementById('current-temp').innerText = celsius
    document.getElementById('current-sunrise').innerText = sunrise
    document.getElementById('current-sunset').innerText = sunset
    document.getElementById('current-humidity').innerText = humidity
    document.getElementById('current-windspeed').innerText = windspeed
    document.getElementById('city').innerText = city
    document.getElementById('current-min').innerText = min
    document.getElementById('current-max').innerText = max
}




navigator.geolocation.getCurrentPosition(showMap);