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

    // Activate tooltips
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
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

    // Lazy Load Slideshow Slides
    // We load the first 3 slides on page load
    // remaining images are loaded dynamically 
    // whenever the slide changes either via
    // user click or the carousel timings
    $('#slideshow').on('slide.bs.carousel', function (e) {
        if (e.to > 0) {
            $('#slideshow-previous').show();
        }
        var lazyImg = jQuery('img[data-src]')[0];
        if (lazyImg) {
            if (e.to == 0) {
                $('#slideshow-previous').hide();
            }
            lazyImg.setAttribute('src', lazyImg.getAttribute('data-src'));
            lazyImg.onload = function() {
                lazyImg.removeAttribute('data-src');
            };
        }
    });

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
