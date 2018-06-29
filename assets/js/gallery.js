$(document).ready(function() {
  // fetch and display data for photog gallery
  if($("#galleries-list").length > 0) {
    var flickr = new Flickr({
      api_key: 'c44dc9745574cf4db11bc5f3c182beb0'
    });

    flickr.people.getPublicPhotos({user_id: '32043573@N03', per_page: 20}, function(err, res) {
      if (err) {
        console.log('error getting photos :(')
      } else {
        var photos = res.photos.photo
        displayGallery(photos)
      }
    })
  }
})

/*galleryCard = function(gallery_id, image_src, title) {
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
}*/

displayGallery = function(photos) {
  $("#gallery-photos").empty();
  for (i=0; i<photos.length; i++) {
    $("#gallery-photos").append(photoCard(photos[i]));
  }
}

photoCard = function(photo) {
  return (
    `<a href='https://www.flickr.com/photos/${photo.owner}/${photo.id}/' target='_blank'>
      <div class='relative photoCard animated fadeIn'>
        <img src='https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg' />
        <h2 class='gallery-title'>${photo.title}</h2>
      </div>
    </a>`
    )
}

