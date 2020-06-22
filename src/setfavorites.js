function setNewHtml(url, index) {
  i = url.indexOf('/', 1 + url.indexOf('/', 1 + url.indexOf('/')));
  websitedomain = url.substring(0, i);
  websitedomain = websitedomain.split('://')[1]
  var parsed = psl.parse(websitedomain);
  websitename = websitedomain.split('.' + parsed.tld)[0]
  websitename = websitename.replace('www.', '')
  websitedomain = parsed.domain
  iconurl = "https://logo.clearbit.com/" + websitedomain
  current = {index, url, iconurl, websitename}
  
  setFav(current)
  setAdd(1)
  setAdd(8)
}

function setAdd(index) {
    id = 'fav' + index
    addHTML = `
    <a class="hoverdarken" href="#"
    style="text-decoration: none;">
    <div class="aboutfav">
      <span class="hoversee" style="display: none;">&nbsp;&nbsp;<i class="fa fa-ellipsis-v"></i>&nbsp;&nbsp;</span>
    </div>
  </a>
  <a style="text-decoration: none;" data-toggle="modal" data-target="#favoriteModalCenter" href="#" data-favi=${id}>
    <div class="favorite" >
        <div>
            <i style="border-radius: 50%; width: 50px; height: 50px;"
            class="fa fa-plus-circle fa-2x"></i>
        </div>
        <p>Add shortcut</p>
    </div>
  </a>
  `
  document.getElementById(id).innerHTML = addHTML
}

function setFav({index, url, iconurl, websitename}){

  id = 'fav' + index
  favHTML = `
      <a class="hoverdarken" data-toggle="modal" data-target="#favoriteModalCenter"
          style="text-decoration: none;" data-favi=${id}>
          <div class="aboutfav">
            <span class="hoversee">&nbsp;&nbsp;<i class="fa fa-ellipsis-v"></i>&nbsp;&nbsp;</span>
          </div>
      </a>
      <a href="${url}" style="text-decoration: none;">
          <div class="favorite">
              <div>
                  <img style="border-radius: 50%; width: 50px; height: 50px; display: inline;" src=${iconurl}>
              </div>
              <p style='word-wrap: break-word;'>${websitename}</p>
          </div>
      </a>
  `
  document.getElementById(id).innerHTML = favHTML
}


index = 1

document.addEventListener('DOMContentLoaded', function () {
  chrome.topSites.get(function (urls) {
    urls.forEach(function ({ url }) {
      if (index <= 8) {
        setNewHtml(url, index)
        index++
      }
    })
  });
});

$('#favoriteModalCenter').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) 
  var favi = button.data('favi')
  var modal = $(this)
  modal.find('#inputID').val(favi)
})