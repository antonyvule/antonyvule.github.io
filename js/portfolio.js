(function($) {

	$window = $(window);

	$('.page-scroll a').on('click', function(e) {
		e.preventDefault();
		$('html, body').stop().animate({
			scrollTop: $($(this).attr('href')).offset().top - 56
		}, 1286, 'easeInOutExpo');
	});

    $window.scroll(function(){
        $('.fadein').each(function(){
        	var $this = $(this);
            var bottom_of_object = $this.offset().top + $this.outerHeight();
            var bottom_of_window = $window.scrollTop() + $window.height();
            
            if(bottom_of_window > bottom_of_object){
                $this.animate({'opacity': '1'}, 786);
            }
        });
    });

})(jQuery);