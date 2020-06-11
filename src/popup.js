function getDateString(unixTime) {
    date = new Date(unixTime);
    hours = date.getHours();
    minutes = "0" + date.getMinutes();
    if (hours > 12) {
        hours = hours - 12
        unixTime = hours + ':' + minutes.substr(-2) + " p.m.";
    } else {
        unixTime = hours + ':' + minutes.substr(-2) + " a.m.";
    }
    return unixTime
}

function showMap(position) {
    lat = position.coords.latitude
    lon = position.coords.longitude
    setImage(lat, lon)
    setData(lat, lon)
}

function setImage(lat, lon) {
    document.getElementById('geoLocation').innerText = "Lat " + lat.toFixed(6) + ", Lon " + lon.toFixed(6)
    apikey = 'iJqafJbROElNaKRqqk24Ot5eN6WTYCqYFdteeYz5'
    imgURL = 'https://api.nasa.gov/planetary/earth/imagery?lon=' + lon + '&lat=' + lat + '&dim=0.1&api_key=' + apikey
    document.getElementById('geoImage').src = imgURL

}

function setData(lat, lon) {
    apikey = '3e7cd6048bd8114abedeee14fcc11575'
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apikey)
        .then(response => response.json())
        .then(data => getData(data));
}

function getData(data) {
    description = data["weather"][0]['description']
    description = description.charAt(0).toUpperCase() + description.slice(1)
    city = data["name"]
    cel = Math.round(data["main"]["temp"] - 273.15) + "°C"
    far = Math.round((data["main"]["temp"] - 273.15) * 9 / 5 + 32) + "°F"
    sunrise = "Sunrise " + getDateString(data["sys"]["sunrise"] * 1000);
    sunset = "Sunset " + getDateString(data["sys"]["sunset"] * 1000);
    document.getElementById('city').innerText = city;
    document.getElementById('description').innerText = description
    document.getElementById('cel').innerText = cel
    document.getElementById('far').innerText = far
    document.getElementById('sunrise').innerText = sunrise
    document.getElementById('sunset').innerText = sunset
}

navigator.geolocation.getCurrentPosition(showMap);

