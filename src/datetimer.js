
function setdate() {
    var dt = new Date()
    document.getElementById('date').innerText = dt.toDateString()
}

function settime() {
    var dt = new Date()
    document.getElementById('time').innerText =  dt.toLocaleTimeString()
}


settime()
setdate()

setInterval(settime, 1)
setInterval(setdate, 1000*60)