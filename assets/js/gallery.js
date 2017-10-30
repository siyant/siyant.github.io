$(document).ready(function() {
  // fetch and display data for photog gallery
  if($("#galleries-list").length > 0) {
    _500px.init({
      sdk_key: 'c05562552532e685ce126f553f266817dd9f1664'
    });

    _500px.api('/users/22764323/galleries', function (response) {
      galleries = response.data.galleries;
      displayGalleryList(galleries);
    });
  }
})

galleryCard = function(gallery_id, image_src, title) {
  return (
    `<div class='gallery-thumb relative animated fadeIn' id='${gallery_id}'>
      <img class='500px' src='${image_src}' />
      <h2 class='gallery-title'>${title}</h2>
    </div>`
  )
}

displayGalleryList = function(galleries) {
  $("#galleries-list").before("<h2>Galleries (click to view)</h2>");
  for (i=0; i<galleries.length; i++) {
    g = galleries[i];
    if (g.items_count == 0) continue;
    $("#galleries-list").append(galleryCard(g.id, g.thumbnail_photos[0].image_url, g.name));
    $('#'+g.id).click(function(e){ fetchGallery(e.currentTarget.id) });
  }
}

fetchGallery = function(id) {
  $(".gallery-thumb").css("opacity", 0.5);
  $("#"+id).css("opacity", 1);
  $(".photoCard").removeClass("fadeIn").addClass("fadeOut");
  _500px.api('/users/22764323/galleries/'+id+'/items', {image_size: 4}, function (response) {
    photos = response.data.photos;
    displayGallery(photos);
  });
}

displayGallery = function(photos) {
  console.log($("#photosText"));
  if ($("#photosText").length == 0) {
    $("#gallery-photos").before("<h2 class='animated fadeIn' id='photosText'>Photos</h2>");
  }
  $("#gallery-photos").empty();
  for (i=0; i<photos.length; i++) {
    p = photos[i];
    $("#gallery-photos").append(photoCard(p.id, p.image_url, p.url));
  }
}

photoCard = function(gallery_id, image_src, image_url) {
  return (
    `<a href="https://500px.com${image_url}" target="_blank">
      <div class='relative photoCard animated fadeIn'>
        <img class='500px' src='${image_src}' />
      </div>
    </a>`
  )
}
