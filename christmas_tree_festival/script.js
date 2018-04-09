$(document).ready(function() {
    // navigation
    $('button.nav-mobile-btn').click(function() {
        $('.nav-menu').toggleClass('clicked');
        $('.nav-mobile-btn-bar').toggleClass('clicked');
    });
    $('.nav-menu').click(function() {
        $('.nav-menu').toggleClass('clicked');
        $('.nav-mobile-btn-bar').toggleClass('clicked');
    });

    var sticky = $(".nav-menu").offset().top;
    var $document = $(document);
    $document.scroll(function() {
        var navbar = $(".nav-menu");
        console.log($(".nav-menu").offset().top);
    if ($document.scrollTop() >= sticky) {
        $('.nav-menu').addClass('sticky');
    } else {
        $('.nav-menu').removeClass('sticky');
    }
    });
});
