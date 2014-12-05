$(document).ready(function() {

  $('.slide-in-item').hide();

  $.Velocity.RegisterUI('transition.flyUpIn', {
      defaultDuration: 600,
      calls: [
        [{ translateZ: 0, translateY: [ 0, '80px' ], opacity: 1}, 1, { easing: 'easeOutQuart' }]
      ]
  });
  $.Velocity.RegisterUI('transition.flyDownOut', {
      defaultDuration: 200,
      calls: [
        [{ translateY: [ '60px', 0 ], opacity: 0}, 1, { easing: 'easeInQuint' }]
      ]
  });
  $.Velocity.RegisterUI('transition.slideLeft', {
      defaultDuration: 400,
      calls: [
        [{ translateZ: 0, translateX: [ '-100%', 0 ] }, 1, { easing: 'easeInOutCubic' }]
      ]
  });
  $.Velocity.RegisterUI('transition.slideRight', {
      defaultDuration: 400,
      calls: [
        [{ translateZ: 0, translateX: [ '100%', 0 ] }, 1, { easing: 'easeInOutCubic' }]
      ]
  });
  $.Velocity.RegisterUI('transition.slideLeftReset', {
      defaultDuration: 600,
      calls: [
        [{ translateZ: 0, translateX: [ 0, '-100%' ] }, 1, { easing: 'easeInOutCubic' }]
      ]
  });
  $.Velocity.RegisterUI('transition.slideRightReset', {
      defaultDuration: 600,
      calls: [
        [{ translateZ: 0, translateX: [ 0, '100%' ] }, 1, { easing: 'easeInOutCubic' }]
      ]
  });

  // detect if IE : from http://stackoverflow.com/a/16657946
  var ie = (function(){
    var undef,rv = -1; // Return value assumes failure.
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');

    if (msie > 0) {
      // IE 10 or older => return version number
      rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    } else if (trident > 0) {
      // IE 11 (or newer) => return version number
      var rvNum = ua.indexOf('rv:');
      rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
    }

    return ((rv > -1) ? rv : undef);
  }());

  var swipeEl = document.body;
  var mc = new Hammer(swipeEl);
  mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

  // disable/enable scroll (mousewheel and keys) from http://stackoverflow.com/a/4770179
  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = [32, 37, 38, 39, 40], wheelIter = 0;

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
    e.preventDefault();
    e.returnValue = false;
  }

  function keydown(e) {
    for (var i = keys.length; i--;) {
      if (e.keyCode === keys[i]) {
        preventDefault(e);
        return;
      }
    }
  }

  function touchmove(e) {
    preventDefault(e);
  }

  function wheel(e) {
    // for IE
    if( ie ) {
      preventDefault(e);
    }
  }

  function disable_scroll() {
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
    document.body.ontouchmove = touchmove;
  }

  function enable_scroll() {
    window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;
  }

  var docElem = window.document.documentElement,
    scrollVal,
    isRevealed,
    noscroll,
    isAnimating,
    container = document.getElementById( 'top-container' ),
    trigger = container.querySelector( '.slide-trigger' ),
    triggerAlt = container.querySelector( '.splash-logo' ),
    slideItem = $('.slide-in-item');
    linksLeft = $('#nav-social-links .social-links__left a');
    linksRight = $('#nav-social-links .social-links__right a');
    navLogo = $('#nav-logo');
    canvasMask = $('.bg-canvas__mask');

  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }

  function scrollPage() {
    scrollVal = scrollY();

    if( noscroll && !ie ) {
      if( scrollVal < 0 ) return false;
      // keep it that way
      window.scrollTo( 0, 0 );
    }

    if( classie.has( container, 'notrans' ) ) {
      classie.remove( container, 'notrans' );
      console.log('removed notrans');
      return false;
    }

    if( isAnimating ) {
      return false;
    }

    if( scrollVal <= 0 && isRevealed ) {
      toggle(0);
    }
    else if( scrollVal > 0 && !isRevealed ){
      toggle(1);
    }
  }

  function toggle( reveal ) {
    isAnimating = true;

    if ( reveal ) {
      if(!( classie.has( container, 'modify' ) )) {
        classie.add( container, 'modify' );
        mc.get('swipe').set({ enable: false });
        if(!( classie.has( container, 'notrans' ) )) {
          if(!($('html').hasClass('touch'))) {
            $(slideItem)
              .velocity('transition.flyUpIn', {
                stagger: 40,
                delay: 400
            });
            $(linksLeft)
              .velocity('transition.slideLeft', {
                stagger: '50ms'
            });
            $(linksRight)
              .velocity('transition.slideRight', {
                stagger: '50ms',
                backwards: true
            });
            $(navLogo)
              .velocity('transition.flyUpIn', {
                display: 'inline-block',
                delay: '250ms'
            });
            $(canvasMask)
              .velocity('transition.flyUpIn', {
                display: 'block',
                delay: '200ms'
            });
          } else {
            $(slideItem)
              .velocity('transition.flyUpIn', {
                delay: 400
            });
            $(linksLeft)
              .velocity('transition.slideLeft', {
                stagger: '50ms'
            });
            $(linksRight)
              .velocity('transition.slideRight', {
                stagger: '50ms',
                backwards: true
            });
            $(navLogo)
              .velocity('transition.flyUpIn', {
                display: 'inline-block',
                delay: '250ms'
            });
            $(canvasMask)
              .velocity('transition.flyUpIn', {
                display: 'block',
                delay: '200ms'
            });
          }
        }
      }
    }
    else {
      noscroll = true;
      disable_scroll();
      classie.remove( container, 'modify' );
      mc.get('swipe').set({ enable: true });
      $(slideItem)
        .velocity('transition.flyDownOut');
      $(linksLeft)
        .velocity('transition.slideLeftReset', {
          // delay: '200ms',
          stagger: '50ms',
          backwards: true
      });
      $(linksRight)
        .velocity('transition.slideRightReset', {
          // delay: '200ms',
          stagger: '50ms'
      });
      $(navLogo)
        .velocity('transition.flyDownOut', {
          complete: function() {
            $('.header-nav').removeClass('final-state');
          }
      });
      $(canvasMask)
        .velocity('transition.flyDownOut', {
          display: 'none'
      });
    }

    // $('#toggle-up').mousedown(function() {
    //   noscroll = true;
    //   disable_scroll();
    //   classie.remove( container, 'modify' );
    //   $(slideItem)
    //     .velocity('transition.flyDownOut');
    //   $('#nav-social-links .social-links__left a')
    //     .velocity('transition.slideLeftReset', {
    //       // delay: '200ms',
    //       stagger: '50ms',
    //       backwards: true
    //   });
    //   $(linksRight)
    //     .velocity('transition.slideRightReset', {
    //       // delay: '200ms',
    //       stagger: '50ms'
    //   });
    //   $(navLogo)
    //     .velocity('transition.flyDownOut');
    // });

    // simulating the end of the transition:
    setTimeout( function() {
      isRevealed = !isRevealed;
      isAnimating = false;
      if( reveal ) {
        noscroll = false;
        enable_scroll();
      }
    }, 1000 );
  }

  // refreshing the page...
  var pageScroll = scrollY();
  noscroll = pageScroll === 0;

  disable_scroll();

  if( pageScroll ) {
    isRevealed = true;
    classie.add( container, 'notrans' );
    console.log('added notrans');
    classie.add( container, 'modify' );
    $(slideItem).show();
    $('.header-nav').addClass('final-state');
    mc.get('swipe').set({ enable: false });
    // classie.add( container, 'modify-refresh' );
    // if (!(container.hasClass('notrans'))) {
    //   $(slideItem)
    //     .velocity('transition.flyUpIn', {
    //       stagger: 100
    //   });
    //   $('#nav-social-links .social-links__left a')
    //     .velocity('transition.slideLeft', {
    //       stagger: '50ms'
    //   });
    //   $(linksRight)
    //     .velocity('transition.slideRight', {
    //       stagger: '50ms',
    //       backwards: true
    //   });
    //   $(navLogo)
    //     .velocity('transition.flyUpIn', {
    //       display: 'inline-block',
    //       delay: '250ms'
    //   });
    // }
  }

  window.addEventListener( 'scroll', scrollPage );
  trigger.addEventListener( 'click', function() { toggle( 'reveal' ); } );
  // console.log(trigger);
  triggerAlt.addEventListener( 'click', function() { toggle( 'reveal' ); } );
  mc.on("swipeup", function() { toggle( 'reveal' ); } );

});