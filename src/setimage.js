var imgUrl = 'https://api.nasa.gov/planetary/apod?api_key=iJqafJbROElNaKRqqk24Ot5eN6WTYCqYFdteeYz5'

fetch(imgUrl)
    .then(response => response.json())
    .then(data => addBackGround(data));

function addBackGround(data) {
    imgUrl = data['hdurl']
    title = data['title']
    date = new Date();
    document.getElementById('date').innerText = date.toDateString()
    if (data["media_type"] == "image") {
        document.getElementById('title').innerText = title
        document.body.style.backgroundImage = "url('" + imgUrl + "')"
    } else {
        document.getElementById('imagelink').href = "https://apod.nasa.gov/apod/ap200606.html"
        document.body.style.backgroundImage = "url('img//misc/CometPanSTARRsandtheGalaxies.jpg')"
    }
}