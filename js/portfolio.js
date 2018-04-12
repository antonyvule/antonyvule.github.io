(function($) {

	$('.page-scroll a').on('click', function(e) {
		e.preventDefault();
		$('html, body').stop().animate({
			scrollTop: $($(this).attr('href')).offset().top - 56
		}, 1286, 'easeInOutExpo');
	});

})(jQuery);