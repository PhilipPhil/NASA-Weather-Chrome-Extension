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

function setData(lat, lon) {
    apikey = '3e7cd6048bd8114abedeee14fcc11575'
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apikey)
        .then(response => response.json())
        .then(data => getData(data));
}

function setImage(lat, lon) {
    document.getElementById('geoLocation').innerText = "Lat " + lat.toFixed(6) + ", Lon " + lon.toFixed(6)
    if (lat.toFixed(4) == localStorage.getItem('lat') && lat.toFixed(4) == localStorage.getItem('lat')) {
        document.getElementById('geoImage').src = localStorage.getItem("geoImage")
    } else {
        apikey = 'iJqafJbROElNaKRqqk24Ot5eN6WTYCqYFdteeYz5'
        imgURL = 'https://api.nasa.gov/planetary/earth/imagery?lon=' + lon + '&lat=' + lat + '&dim=0.1&api_key=' + apikey
        document.getElementById('geoImage').src = imgURL
        localStorage.setItem("lat", lat.toFixed(4))
        localStorage.setItem("lon", lon.toFixed(4))
        localStorage.setItem("geoImage", imgURL)
    }


}

function getData(data) {
    celsius = Math.round(data["main"]["temp"] - 273.15)
    cel = Math.round(data["main"]["temp"] - 273.15) + "°C"
    far = Math.round((data["main"]["temp"] - 273.15) * 9 / 5 + 32) + "°F"
    sunrise = "Sunrise " + getDateString(data["sys"]["sunrise"] * 1000);
    sunset = "Sunset " + getDateString(data["sys"]["sunset"] * 1000);
    city = data["name"]
    description = data["weather"][0]['description']
    description = description.charAt(0).toUpperCase() + description.slice(1)
    data = { "cel": cel, "far": far, "sunrise": sunrise, "sunset": sunset, "city": city, "description": description }
    localStorage["newData"] = JSON.stringify(data)
    document.getElementById('description').innerText = description
    document.getElementById('cel').innerText = cel
    document.getElementById('far').innerText = far
    document.getElementById('sunrise').innerText = sunrise
    document.getElementById('sunset').innerText = sunset
    document.getElementById('city').innerText = city;
}

navigator.geolocation.getCurrentPosition(showMap);

