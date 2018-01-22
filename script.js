$(function() {
    'use strict';

    // Activate smooth scrolling on DOMContentLoaded
    // With Hash based History Support
    var offset = -($('#navbar').height() + 15);

    // Bind the hashchange event listener
    $(window).bind('hashchange', function(event) {
      $.smoothScroll({
        // Replace '#/' with '#' to go to the correct target
        scrollTarget: location.hash.replace(/^\#\/?/, '#'),
        offset: offset
      });
    });

    $('a.nav-link, a[href="#home"]')
    .bind('click', function(event) {
      // Remove '#' from the hash.
      var hash = this.hash.replace(/^#/, '')

      if (this.pathname === location.pathname && hash) {
        event.preventDefault();

        // Change '#' (removed above) to '#/' so it doesn't jump without the smooth scrolling
        location.hash = '#/' + hash;
      }
    });

    // Trigger hashchange event on page load if there is a hash in the URL.
    if (location.hash) {
      $(window).trigger('hashchange');
    }
  
    // Handle Crest Resizing upon scrolling and window resizing
    var $c = $('#crest');
    var initCrestTop = $c.offset().top;

    resizeCrest();

    $(window).resize(handleResize);
    $(window).scroll(resizeCrest);

    function resizeCrest() {
        var documentTop = $(document).scrollTop();
        var crestTop = $c.offset().top;
        crestTop = crestTop < initCrestTop ? crestTop : initCrestTop;

        if (documentTop > crestTop && !$c.hasClass('shrink')) {
            $c.addClass('shrink');
        } else if (documentTop < crestTop && $c.hasClass('shrink')) {
            $c.removeClass('shrink');
        }
    }

    function handleResize() {
        initCrestTop = $c.offset().top;
        resizeCrest();
    }
});
