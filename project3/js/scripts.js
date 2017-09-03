$(document).ready(function() {
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        navContainer: '.controllers',
        navText: ["<i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i>","<i class=\"fa fa-chevron-right\" aria-hidden=\"true\">"],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })
});
