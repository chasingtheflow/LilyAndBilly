$(function() {
    'use strict';

    // Activate smooth scrolling on DOMContentLoaded
    $('a .nav-link').smoothScroll({offset: -($('#navbar').height() + 15)});

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
