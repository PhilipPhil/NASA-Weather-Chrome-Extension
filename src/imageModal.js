var modal = document.getElementById("imageModal");

var img = document.getElementById("fullscreen");
img.onclick = function(){
  modal.style.display = "block";
//   modalImg.src = '';
  captionText.innerHTML = 'this.alt';
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}