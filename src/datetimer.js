
function setdatetime() {
    dt = new Date()
    document.getElementById('date').innerText = dt.toDateString() + ' ' + dt.toLocaleTimeString()
}

setdatetime()
setInterval(setdatetime, 1)