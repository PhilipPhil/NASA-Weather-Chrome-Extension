function setImage(dateDirection) {
    try {
        ymd = positionDate.getFullYear() + "-" + (positionDate.getMonth() + 1) + "-" + positionDate.getDate();
        alert(APIUrl + ymd + key)
        fetch(APIUrl + ymd + key)
            .then((response) => response.json())
            .then((data) => addBackGround(data, dateDirection));
    } catch {
        if (positionDate >= new Date()) {
            positionDate.setDate(positionDate.getDate() - 1);
            setImage(-1);
        } else {
            positionDate.setDate(positionDate.getDate() + dateDirection);
            setImage(dateDirection);
        }
    }
}

function addBackGround(data, dateDirection) {
    if (data["media_type"] == "image") {
        title = data["title"];
        imgURL = "url('" + data["hdurl"] + "')";
        imgdate = data["date"]
        explanation = data["explanation"]
        yy = positionDate.getFullYear().toString().substring(0,2)
        pad = "00"
        mm = (positionDate.getMonth() + 1).toString()
        mm = pad.substring(0, pad.length - mm.length) + mm
        dd = positionDate.getDate().toString()
        dd = pad.substring(0, pad.length - dd.length) + dd
        apodURL = 'https://apod.nasa.gov/apod/ap'+yy+mm+dd+'.html'

        document.getElementById("apodURL").href = apodURL
        document.getElementById("modaltitle").innerText = title;
        document.getElementById("modaldate").innerText = imgdate;
        document.getElementById("modaldescription").innerText = explanation;
        document.getElementById("modalimage").src = data["hdurl"]
        document.getElementById("modalhdurl").href = data["hdurl"]

        document.getElementById("title").innerText = title;
        document.body.style.backgroundImage = imgURL;
    } else {
        positionDate.setDate(positionDate.getDate() + dateDirection);
        setImage(dateDirection);
    }
}

function initalImageLoad() {
    document.getElementById("right").style.visibility = "hidden";
    setImage(-1);
}

const APIUrl = "https://api.nasa.gov/planetary/apod?date=";
const key = '&api_key=iJqafJbROElNaKRqqk24Ot5eN6WTYCqYFdteeYz5'

var positionDate = new Date();
positionDate = new Date(positionDate.toUTCString());
positionDate.setHours(positionDate.getHours() - 8); // set to pacific time when they update the api

initalImageLoad()

document.getElementById("left").addEventListener("click", function (e) {
    document.getElementById("right").style.visibility = "visible";
    dateDirection = -1;
    positionDate.setDate(positionDate.getDate() + dateDirection);
    setImage(dateDirection);
});

document.getElementById("right").addEventListener("click", function (e) {
    dateDirection = 1;
    positionDate.setDate(positionDate.getDate() + dateDirection);
    currDate = new Date();
    if (positionDate.getFullYear() == currDate.getFullYear() &&
        positionDate.getMonth() == currDate.getMonth() &&
        positionDate.getDate() == currDate.getDate()) {
        document.getElementById("right").style.visibility = "hidden";
    }
    setImage(dateDirection);

});