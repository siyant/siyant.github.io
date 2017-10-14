window.onunload = function() {};

$(document).ready(function() {
  // zoom in/zoom out animations
  if ($(".content-block").hasClass('fadeOut')) {
    $(".content-block").removeClass("fadeOut").addClass("fadeIn");
  }
  $(".navbtn").click(function(e) {
    if (e.metaKey || e.ctrlKey) return;   // prevent fade out for cmd/ctrl+click
    $(".content-block").removeClass("fadeIn").addClass("fadeOut");
  });
});
