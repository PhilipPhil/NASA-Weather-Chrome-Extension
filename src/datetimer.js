
function setdate() {
    dt = new Date()
    document.getElementById('date').innerText = dt.toDateString()
}

function settime() {
    dt = new Date()
    document.getElementById('time').innerText =  dt.toLocaleTimeString()
}


settime()
setdate()

setInterval(settime, 1)
setInterval(setdate, 1000)