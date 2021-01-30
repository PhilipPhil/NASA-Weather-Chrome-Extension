function setImage(dateDirection) {
    var currDate = new Date()
    currDate = new Date(currDate.toUTCString());
    currDate.setHours(currDate.getHours() - hourdelay);
    try {
        if (positionDate > currDate) {
            positionDate.setDate(positionDate.getDate() - 1);
            setImage(-1);
        } else {
            var ymd = positionDate.getFullYear() + "-" + (positionDate.getMonth() + 1) + "-" + positionDate.getDate();
            fetch(APIUrl + ymd + key)
                .then((response) => response.json())
                .then((data) => addBackGround(data, dateDirection));
        }
    } catch {
        if (positionDate > currDate) {
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
        var title = data["title"];
        var imgURL = "url('" + data["hdurl"] + "')";
        var imgdate = data["date"];
        var explanation = data["explanation"];
        var yy = positionDate.getFullYear().toString().substring(2, 4);
        var pad = "00";
        var mm = (positionDate.getMonth() + 1).toString();
        var mm = pad.substring(0, pad.length - mm.length) + mm;
        var dd = positionDate.getDate().toString();
        var dd = pad.substring(0, pad.length - dd.length) + dd;
        var apodURL = "https://apod.nasa.gov/apod/ap" + yy + mm + dd + ".html";

        var hdurl = data["hdurl"];

        document.getElementById("apodURL").href = apodURL;
        document.getElementById("modaltitle").innerText = title;
        document.getElementById("title").innerText = title;
        document.getElementById("modaldate").innerText = imgdate;
        document.getElementById("modaldescription").innerText = explanation;
        document.getElementById("modalimage").src = hdurl;
        document.getElementById("modalimage").alt = title;
        document.getElementById("modalhdurl").href = hdurl;
        document.body.style.backgroundImage = imgURL;

        if (posYMD != localStorage["lastupdYMD"]) {
            localStorage["apodURL"] = apodURL;
            localStorage["title"] = title;
            localStorage["imgdate"] = imgdate;
            localStorage["explanation"] = explanation;
            localStorage["hdurl"] = hdurl;
            localStorage["imgURL"] = imgURL;
            localStorage["lastupdYMD"] = posYMD;
        }
    } else {
        positionDate.setDate(positionDate.getDate() + dateDirection);
        setImage(dateDirection);
    }
}

const hourdelay = 4
const APIUrl = "https://api.nasa.gov/planetary/apod?date=";
const key = "&api_key=iJqafJbROElNaKRqqk24Ot5eN6WTYCqYFdteeYz5";

positionDate = new Date();
positionDate = new Date(positionDate.toUTCString());
positionDate.setHours(positionDate.getHours() - hourdelay);

const posYMD = positionDate.getFullYear() + "-" + (positionDate.getMonth() + 1) + "-" + positionDate.getDate();
document.getElementById("right").style.visibility = "hidden";
if (posYMD == localStorage["lastupdYMD"]) {
    document.getElementById("apodURL").href = localStorage["apodURL"];
    document.getElementById("modaltitle").innerText = localStorage["title"];
    document.getElementById("title").innerText = localStorage["title"];
    document.getElementById("modaldate").innerText = localStorage["imgdate"];
    document.getElementById("modaldescription").innerText =
        localStorage["explanation"];
    document.getElementById("modalimage").src = localStorage["hdurl"];
    document.getElementById("modalimage").alt = localStorage["title"];
    document.getElementById("modalhdurl").href = localStorage["hdurl"];
    document.body.style.backgroundImage = localStorage["imgURL"];
} else {
    setImage(-1);
}

document.getElementById("left").addEventListener("click", function (e) {
    document.getElementById("right").style.visibility = "visible";
    let dateDirection = -1;
    positionDate.setDate(positionDate.getDate() + dateDirection);
    setImage(dateDirection);
});

document.getElementById("right").addEventListener("click", function (e) {
    let dateDirection = 1;
    positionDate.setDate(positionDate.getDate() + dateDirection);
    let currDate = new Date()
    currDate = new Date(currDate.toUTCString());
    currDate.setHours(currDate.getHours() - hourdelay);

    if (positionDate > currDate) {
        positionDate.setDate(positionDate.getDate() - 1);
    } else {
        if (positionDate.getFullYear() == currDate.getFullYear() &&
            positionDate.getMonth() == currDate.getMonth() &&
            positionDate.getDate() == currDate.getDate()) {
            document.getElementById("right").style.visibility = "hidden";
        }
        setImage(dateDirection);
    }
});

document.addEventListener("keyup", function (event) {
    const key = event.key;
    switch (key) {
        case "ArrowRight":
            var dateDirection = 1;
            positionDate.setDate(positionDate.getDate() + dateDirection);
            var currDate = new Date()
            currDate = new Date(currDate.toUTCString());
            currDate.setHours(currDate.getHours() - hourdelay);
            if (positionDate > currDate) {
                positionDate.setDate(positionDate.getDate() - 1);
            } else {
                if (positionDate.getFullYear() == currDate.getFullYear() &&
                    positionDate.getMonth() == currDate.getMonth() &&
                    positionDate.getDate() == currDate.getDate()) {
                    document.getElementById("right").style.visibility = "hidden";
                }
                setImage(dateDirection);
            }
            break;
        case "ArrowLeft":
            document.getElementById("right").style.visibility = "visible";
            var dateDirection = -1;
            positionDate.setDate(positionDate.getDate() + dateDirection);
            setImage(dateDirection);
            break;
    }
});