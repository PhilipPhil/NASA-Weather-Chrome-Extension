function getTime(dte) {
    let time = dte.toLocaleTimeString().split(":")[0] + ":" + dte.toLocaleTimeString().split(":")[1] + ' ' + dte.toLocaleTimeString().split(" ")[1]
    return time
}

function showMap(position) {
    var lat = position.coords.latitude
    var lon = position.coords.longitude
    setCurrent(lat, lon)
    setList(lat, lon)
}

function setCurrent(lat, lon) {
    let apikey = '3e7cd6048bd8114abedeee14fcc11575'
    const urlapi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=${apikey}`
    fetch(urlapi)
        .then(response => response.json())
        .then(data => getCurrent(data));
}

function getCurrent(data) {
    var dt = new Date()
    var description = data.weather[0].description.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    var day = weekday[dt.getDay()];
    var time = getTime(dt);
    var celsius = Math.round(data.main.temp - 273.15)
    var sunrise = getTime(new Date(data.sys.sunrise * 1000))
    var sunset = getTime(new Date(data.sys.sunset * 1000))
    var humidity = data.main.humidity
    var windspeed = (data.wind.speed * 3.6).toFixed(1)
    var city = data.name

    document.getElementById('current-weather-description').innerText = day + ', ' + time + ', ' + description
    document.getElementById('current-temp').innerText = celsius
    document.getElementById('current-sunrise').innerText = sunrise
    document.getElementById('current-sunset').innerText = sunset
    document.getElementById('current-humidity').innerText = humidity
    document.getElementById('current-windspeed').innerText = windspeed
    document.getElementById('city').innerText = city
}

function setList(lat, lon) {
    let apikey = '3e7cd6048bd8114abedeee14fcc11575'
    const urlapi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${apikey}`
    fetch(urlapi)
        .then(response => response.json())
        .then(data => getList(data));
}

function getList(data){

    let day = data.daily[0]
    let min = Math.round(day.temp.min - 273.15)
    let max = Math.round(day.temp.max - 273.15)
    let currentweathericon = `http://openweathermap.org/img/w/${day.weather[0].icon}.png`
    document.getElementById('current-min').innerText = min
    document.getElementById('current-max').innerText = max
    document.getElementById('day-weather-icon').src = currentweathericon

    for(var i = 1; i < 7; i++){
        let day = data.daily[i]
        let min = Math.round(day.temp.min - 273.15)
        let max = Math.round(day.temp.max - 273.15)
        let currentweathericon = `http://openweathermap.org/img/w/${day.weather[0].icon}.png`
        let daystring = weekday[(new Date(day.dt * 1000)).getDay()]
        let dayi = 'day' + i
        let mini = 'min' + i
        let maxi = 'max' + i
        let imgi = 'img' + i
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
    var text = document.getElementById('togglebutton').innerText
    if(text == 'Expand'){
        document.getElementById('togglebutton').innerText = 'Collapse'
    } else {
        document.getElementById('togglebutton').innerText = 'Expand'
    }
})