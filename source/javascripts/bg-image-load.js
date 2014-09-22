$(document).ready(function() {

  // $.Velocity.RegisterUI('transition.zoomIn', {
  //     defaultDuration: 1000,
  //     calls: [
  //       [{ translateZ: 0, scale: [ 1, 1.05 ], opacity: 1}, 1, { easing: 'ease' }]
  //     ]
  // });


  $('.fade-bg-canvas').waitForImages(function() {
      // All descendant images have loaded, now slide up.
      $(this).addClass('fade-bg-canvas-loaded');
      $('.fade-with-bg').addClass('fade-with-bg-loaded');
  });
});