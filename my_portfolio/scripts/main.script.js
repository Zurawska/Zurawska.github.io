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

    // add shadow to navigation when scroll
    var $document = $(document);
    $document.scroll(function() {
    if ($document.scrollTop() >= 50) {
        $('.nav-menu').addClass('shadow');
    } else {
        $('.nav-menu').removeClass('shadow');
    }
    });

    // setting max height for divs in slider
    function setMaxHeightForDivsInSlider(){
        $('.fade').height('');
        var elementHeights = $('.fade').map(function() {
            return $(this).height();
        }).get();
        var maxHeight = Math.max.apply(null, elementHeights);
        $('.fade').height(maxHeight);
        console.log(maxHeight);
    }
    setMaxHeightForDivsInSlider();

    // slider
    var slideIndex = 1;
        showSlides(slideIndex);
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    function showSlides(n) {
        var i;
        var slides = $('.mySlides').css('display', 'none');
        if (n > slides.length) {slideIndex = 1;}
        if (n < 1) {slideIndex = slides.length;}
        slides.eq(slideIndex-1).css('display', 'block');
    }
    $('.prev').click(function() {
        plusSlides(-1);
    });
    $('.next').click(function() {
        plusSlides(1);
    });

    // flip
    var cardHeight;
    // Sets the height of the back of the card to match the image in front
    function setBackHeight() {
        cardHeight = $('.card .front').height();
        $('.card .back').height(cardHeight);
    }
    //Swap behavior of hover with click on touch devices
	if (Modernizr.touch){
		$('.card').on('click', function() {
            $(this).toggleClass('not-flipped');
		});
	} else {
		$('.card').hover(function() {
			$(this).toggleClass('not-flipped');
		});
	}
    // On window change, recalculate the size of the box
    window.onresize = function(){
        console.log("resize");
        setBackHeight();
        setMaxHeightForDivsInSlider();
    };
    setBackHeight();

    // section animation
    function sectionAnimation(section) {
        var $window = $(window);
        $window.on('scroll load', function() {
            var pad = Math.max(0, $window.height() - 50);
            var scrollTop = $window.scrollTop();

            if (!section.hasClass('section_animation') && $window.scrollTop() + pad > section.offset().top) {
              section.addClass('section_animation');
              return;
            }
        });
    }
    sectionAnimation($('#works'));
    sectionAnimation($('#skills'));
    sectionAnimation($('#contact'));
});
