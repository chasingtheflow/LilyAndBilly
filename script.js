// Activate smooth scrolling on DOMContentLoaded
$(function() {
    $('a').smoothScroll({offset: -($('#navbar').height() + 15)});
});
