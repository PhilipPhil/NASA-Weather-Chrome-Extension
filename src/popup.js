function getTime(dt) {
    time = dt.toLocaleTimeString().split(":")[0] + ":" + dt.toLocaleTimeString().split(":")[1] + ' ' + dt.toLocaleTimeString().split(" ")[1]
    return time
}

function showMap(position) {
    lat = position.coords.latitude
    lon = position.coords.longitude
    setCurrent(lat, lon)
    setList(lat, lon)
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
    day = weekday[dt.getDay()];
    time = getTime(dt);
    currentweathericon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    celsius = Math.round(data.main.temp - 273.15)
    sunrise = getTime(new Date(data.sys.sunrise * 1000))
    sunset = getTime(new Date(data.sys.sunset * 1000))
    humidity = data.main.humidity
    windspeed = (data.wind.speed * 3.6).toFixed(1)
    city = data.name

    document.getElementById('current-weather-description').innerText = day + ', ' + time + ', ' + description
    document.getElementById('current-weather-icon').src = currentweathericon
    document.getElementById('current-temp').innerText = celsius
    document.getElementById('current-sunrise').innerText = sunrise
    document.getElementById('current-sunset').innerText = sunset
    document.getElementById('current-humidity').innerText = humidity
    document.getElementById('current-windspeed').innerText = windspeed
    document.getElementById('city').innerText = city
}

function setList(lat, lon) {
    apikey = '3e7cd6048bd8114abedeee14fcc11575'
    const urlapi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${apikey}`
    fetch(urlapi)
        .then(response => response.json())
        .then(data => getList(data));
}

function getList(data){

    day = data.daily[0]
    min = Math.round(day.temp.min - 273.15)
    max = Math.round(day.temp.max - 273.15)
    currentweathericon = `http://openweathermap.org/img/w/${day.weather[0].icon}.png`

    document.getElementById('current-min').innerText = min
    document.getElementById('current-max').innerText = max
    document.getElementById('day-weather-icon').src = currentweathericon

    for(i = 1; i < 7; i++){
        day = data.daily[i]

        min = Math.round(day.temp.min - 273.15)
        max = Math.round(day.temp.max - 273.15)
        currentweathericon = `http://openweathermap.org/img/w/${day.weather[0].icon}.png`
        daystring = weekday[(new Date(day.dt * 1000)).getDay()]
        dayi = 'day' + i
        mini = 'min' + i
        maxi = 'max' + i
        imgi = 'img' + i
        document.getElementById(dayi).innerText = daystring
        document.getElementById(mini).innerText = min
        document.getElementById(maxi).innerText = max
        document.getElementById(imgi).src = currentweathericon
    }

 
}

var weekday=new Array(7);
weekday[0]="Sunday";
weekday[1]="Monday";
weekday[2]="Tuesday";
weekday[3]="Wednesday";
weekday[4]="Thursday";
weekday[5]="Friday";
weekday[6]="Saturday";

navigator.geolocation.getCurrentPosition(showMap);

document.getElementById('togglebutton').addEventListener('click', function(e){
    text = document.getElementById('togglebutton').innerText
    if(text == 'Expand'){
        document.getElementById('togglebutton').innerText = 'Collapse'
    } else {
        document.getElementById('togglebutton').innerText = 'Expand'
    }
})