function settime() {
    var dt = new Date()
    document.getElementById('time').innerText =  dt.toLocaleTimeString()
    document.getElementById('date').innerText = dt.toDateString()
}
settime()
setInterval(settime, 1)