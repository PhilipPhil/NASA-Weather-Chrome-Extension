function getWebSiteInformation(url, name) {
  var i = url.indexOf('/', 1 + url.indexOf('/', 1 + url.indexOf('/')));
  var websitedomain = url.substring(0, i);
  websitedomain = websitedomain.split('://')[1]
  var parsed = psl.parse(websitedomain);
  var iconurl = "https://logo.clearbit.com/" + websitedomain

  var websitename = websitedomain.split('.' + parsed.tld)[0]
  websitename = websitename.replace('www.', '')

  websitedomain = parsed.domain
  if (name) {
    websitename = name
    var current = { url, iconurl, websitename }
  } else {
    var current = { url, iconurl, websitename }
  }

  return current
}

function setAdd(id) {
  var addHTML = `
      <a class="hoverdarken" href="#"
      style="text-decoration: none;">
      <div class="aboutfav">
        <span class="hoversee" style="display: none;">&nbsp;&nbsp;<i class="fa fa-ellipsis-v"></i>&nbsp;&nbsp;</span>
      </div>
    </a>
    <a style="text-decoration: none;" data-toggle="modal" data-target="#favoriteModalCenter" 
      href="#" data-favi='${id}' data-url='' data-websitename='' data-title='Add shortcut'>
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

function setFav({ url, iconurl, websitename }, id) {
  var favHTML = `
      <a class="hoverdarken" data-toggle="modal" data-target="#favoriteModalCenter"
          style="text-decoration: none;" data-favi='${id}' data-url='${url}' data-websitename='${websitename}' data-title='Edit shortcut'>
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

document.addEventListener('DOMContentLoaded', function () {
  chrome.topSites.get(function (urls) {
    
    if( !localStorage['setInitialFavorites'] ) {
      for(var index=1; index<8; index++){
        let id = 'fav' + index
        try {
          let url = urls[index-1].url
          let cur = getWebSiteInformation(url)
          localStorage.setItem(id, JSON.stringify(cur));
          localStorage['setInitialFavorites'] = true
        } catch {
          setAdd(id)
        }

      }
    }

    for(var index=1; index<=8; index++){
      let id = 'fav' + index
      let curr = JSON.parse(localStorage.getItem(id))
      if( curr ){
        setFav(JSON.parse(localStorage.getItem(id)), id)
      } else {
        setAdd(id)
      }
    }

  });
});

$('#favoriteModalCenter').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget)
  var favi = button.data('favi')
  var websitename = button.data('websitename')
  alert(websitename)
  var url = button.data('url')
  var title = button.data('title')

  var modal = $(this)
  modal.find('#inputID').val(favi)
  modal.find('#inputName').val(websitename)
  modal.find('#inputURL').val(url)
  modal.find('#mTshortcut').text(title)
})


document.getElementById('indexform').onsubmit = function (e) {
  e.preventDefault();
  var id = document.getElementById('inputID').value
  var websitename = document.getElementById('inputName').value
  var url = document.getElementById('inputURL').value
  var cur = getWebSiteInformation(url, websitename)
  localStorage.setItem(id, JSON.stringify(cur));
  setFav(cur, id)
  document.getElementById("indexform").reset();
  $('#favoriteModalCenter').modal('toggle')
};

document.getElementById('removeIndex').addEventListener('click', function (e) {
  var id = document.getElementById('inputID').value
  localStorage.removeItem(id)
  setAdd(id)
  document.getElementById("indexform").reset();
  $('#favoriteModalCenter').modal('toggle')
  e.preventDefault();
}
)