imgUrl = 'https://api.nasa.gov/planetary/apod?api_key=iJqafJbROElNaKRqqk24Ot5eN6WTYCqYFdteeYz5'
fetch(imgUrl)
    .then(response => response.json())
    .then(data => addBackGround(data));

function addBackGround(data) {
    imgUrl = data['hdurl']
    title = data['title']
    date = data['date']
    date = new Date(date);
    document.getElementById('date').innerText = date.toDateString()
    document.getElementById('title').innerText = title
    document.body.style.backgroundImage = "url('" + imgUrl + "')"
}

