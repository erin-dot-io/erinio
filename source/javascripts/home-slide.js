$(document).ready(function() {

  $.Velocity.RegisterUI('transition.flyUpIn', {
      defaultDuration: 600,
      calls: [
        [{ translateZ: 0, translateY: [ 0, '100px' ], opacity: 1}, 1, { easing: 'easeOutQuart' }]
      ]
  });
  $.Velocity.RegisterUI('transition.flyDownOut', {
      defaultDuration: 200,
      calls: [
        [{ translateY: [ '200px', 0 ], opacity: 0}, 1, { easing: 'easeInQuint' }]
      ]
  });
  $.Velocity.RegisterUI('transition.slideLeft', {
      defaultDuration: 400,
      calls: [
        [{ translateZ: 0, translateX: '-60px' }, 1, { easing: 'easeInOutCubic' }]
      ]
  });
  $.Velocity.RegisterUI('transition.slideRight', {
      defaultDuration: 400,
      calls: [
        [{ translateZ: 0, translateX: '60px' }, 1, { easing: 'easeInOutCubic' }]
      ]
  });
  $.Velocity.RegisterUI('transition.slideReset', {
      defaultDuration: 400,
      calls: [
        [{ translateZ: 0, translateX: '0px' }, 1, { easing: 'easeInOutCubic' }]
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
    slideItem = container.querySelector( '.slide-in-item' );

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

    if( reveal ) {
      if (!$(container).hasClass('modify')) {
        $('.slide-in-item')
          .velocity('transition.flyUpIn', {
            stagger: 100,
            delay: 400
        });
        $('#nav-social-links .social-links__left a')
          .velocity('transition.slideLeft', {
            stagger: '50ms'
        });
        $('#nav-social-links .social-links__right a')
          .velocity('transition.slideRight', {
            stagger: '50ms',
            backwards: true
        });
        $('#nav-logo')
          .velocity('transition.flyUpIn', {
            display: 'inline-block',
            delay: '250ms'
        });
      }
      classie.add( container, 'modify' );
    }
    else {
      noscroll = true;
      disable_scroll();
      classie.remove( container, 'modify' );
      classie.remove( container, 'modify-refresh' );
      $('.slide-in-item')
        .velocity('transition.flyDownOut');
      $('#nav-social-links .social-links__left a')
        .velocity('transition.slideReset', {
          delay: '200ms',
          stagger: '50ms',
          backwards: true
      });
      $('#nav-social-links .social-links__right a')
        .velocity('transition.slideReset', {
          delay: '200ms',
          stagger: '50ms'
      });
      $('#nav-logo')
        .velocity('transition.flyDownOut');
    }

    // simulating the end of the transition:
    setTimeout( function() {
      isRevealed = !isRevealed;
      isAnimating = false;
      if( reveal ) {
        noscroll = false;
        enable_scroll();
      }
    }, 600 );
  }

  // refreshing the page...
  var pageScroll = scrollY();
  noscroll = pageScroll === 0;

  disable_scroll();

  if( pageScroll ) {
    isRevealed = true;
    classie.add( container, 'notrans' );
    classie.add( container, 'modify' );
    classie.add( container, 'modify-refresh' );
    $('.slide-in-item')
      .velocity('transition.flyUpIn', {
        stagger: 100
    });
    $('#nav-social-links .social-links__left a')
      .velocity('transition.slideLeft', {
        stagger: '50ms'
    });
    $('#nav-social-links .social-links__right a')
      .velocity('transition.slideRight', {
        stagger: '50ms',
        backwards: true
    });
    $('#nav-logo')
      .velocity('transition.flyUpIn', {
        display: 'inline-block',
        delay: '250ms'
    });
  }

  window.addEventListener( 'scroll', scrollPage );
  trigger.addEventListener( 'click', function() { toggle( 'reveal' ); } );
  // console.log(trigger);
  triggerAlt.addEventListener( 'click', function() { toggle( 'reveal' ); } );
});