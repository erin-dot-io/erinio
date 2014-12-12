$(document).ready(function() {
  var overlayNav = $('.cd-overlay-nav'),
    overlayContent = $('.cd-overlay-content'),
    toggleNav = $('.cd-nav-trigger'),
    navigation = $('.cd-primary-nav');

  //inizialize navigation and content layers
  layerInit();
  $(window).on('resize', function(){
    window.requestAnimationFrame(layerInit);
  });

  //open & close the menu and cover layers
  toggleNav.on('click', function(){
    if(!toggleNav.hasClass('close-nav')) {
      //animate menu icon into a cross icon
      toggleNav.addClass('close-nav');
      //animate the navigation layer
      overlayNav.children('span').velocity({
        translateZ: 0,
        scaleX: 1,
        scaleY: 1,
      }, 500, 'easeInCubic', function(){
        //show navigation
        navigation.addClass('fade-in');
      });
    } else {
      //animate cross icon into a menu icon
      toggleNav.removeClass('close-nav');
      //animate the content layer
      overlayContent.children('span').velocity({
        translateZ: 0,
        scaleX: 1,
        scaleY: 1,
      }, 500, 'easeInCubic', function(){
        //hide navigation
        navigation.removeClass('fade-in');
        //scale to zero the navigation layer
        overlayNav.children('span').velocity({
          translateZ: 0,
          scaleX: 0,
          scaleY: 0,
        }, 0);
        //reduce to opacity of the content layer with the is-hidden class
        overlayContent.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
          //wait for the end of the transition and scale to zero the content layer
          overlayContent.children('span').velocity({
            translateZ: 0,
            scaleX: 0,
            scaleY: 0,
          }, 0, function(){overlayContent.removeClass('is-hidden');});
        });
      });
    }
  });

  function layerInit(){
    var diameterValue = (Math.sqrt( Math.pow($(window).height(), 2) + Math.pow($(window).width(), 2))*2);
    overlayNav.children('span').velocity({
      scaleX: 0,
      scaleY: 0,
      translateZ: 0,
    }, 50).velocity({
      height : diameterValue+'px',
      width : diameterValue+'px',
      top : -(diameterValue/2)+'px',
      left : -(diameterValue/2)+'px',
    }, 0);

    overlayContent.children('span').velocity({
      scaleX: 0,
      scaleY: 0,
      translateZ: 0,
    }, 50).velocity({
      height : diameterValue+'px',
      width : diameterValue+'px',
      top : -(diameterValue/2)+'px',
      left : -(diameterValue/2)+'px',
    }, 0);
  }

});