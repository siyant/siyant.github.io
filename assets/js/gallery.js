$(document).ready(function() {
  // fetch and display data for photog gallery
  if($("#photoggallery").length > 0) {
    _500px.init({
      sdk_key: 'c05562552532e685ce126f553f266817dd9f1664'
    });

    _500px.api('/users/22764323/galleries', function (response) {
      galleries = response.data.galleries;
      displayGallery(galleries);
    });
  }
})

createCard = function(image_url, title) {
  return "<div class='relative'><img class='100px' src='"+image_url+"' /><h2 class='gallery-title'>"+title+"</h2></div>"
}

displayGallery = function(photos) {
  for (i=0; i<photos.length; i++) {
    if (photos[i].items_count == 0) continue;
    $("#photoggallery").append(createCard(photos[i].thumbnail_photos[0].image_url, photos[i].name));
  }
}