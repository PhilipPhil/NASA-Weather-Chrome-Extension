function setImage(dt) {
    try{
        ymd = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()
        fetch(APIUrl + ymd + key)
            .then(response => response.json())
            .then(data => addBackGround(data, dt));
    } catch {
        dt.setDate(dt.getDate() - 1);
        setImage(dt)
    }

}

function addBackGround(data, dt) {
    if (data["media_type"] == "image") {
        document.getElementById('title').innerText = data['title']
        document.body.style.backgroundImage = "url('" + data['hdurl'] + "')"
        localStorage.setItem("APOD", "url('" + data['hdurl'] + "')");
    } else {
        dt.setDate(dt.getDate() - 1);
        setImage(dt)
    }
}

var APIUrl = 'https://api.nasa.gov/planetary/apod?date='
var key = '&api_key=iJqafJbROElNaKRqqk24Ot5eN6WTYCqYFdteeYz5'
dt = new Date()
document.getElementById('date').innerText = dt.toDateString()
currentDMY = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()
if (currentDMY == localStorage.getItem('lastDMY')) {
    document.getElementById('title').innerText = localStorage.getItem('lastDMY')
    document.body.style.backgroundImage = localStorage.getItem('APOD')
} else {
    setImage(dt)
    localStorage.setItem('lastDMY',currentDMY)
}