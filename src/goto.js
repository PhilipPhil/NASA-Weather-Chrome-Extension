document.getElementById('goToApps').addEventListener('click', function(e) {
    chrome.tabs.create({"url":"chrome://apps"})

})
document.getElementById('goToDefault').addEventListener('click', function(e) {
    chrome.tabs.create({"url":"chrome-search://local-ntp/local-ntp.html"})
})