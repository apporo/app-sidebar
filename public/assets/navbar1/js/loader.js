Zepto(function($) {
  $(".micejs-sidebar .btn-nav").on("click tap", function() {
    $(".micejs-sidebar .nav-container").toggleClass("show-nav hide-nav").removeClass("hidden");
    $(this).toggleClass("animated");
  });
});