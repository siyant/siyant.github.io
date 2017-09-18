window.onunload = function() {};

$(document).ready(function() {
  // zoom in/zoom out animations
  if ($(".content-block").hasClass('fadeOut')) {
    $(".content-block").removeClass("fadeOut").addClass("fadeIn");
  }
  $(".navbtn").click(function() {
    $(".content-block").removeClass("fadeIn").addClass("fadeOut");
  });
});