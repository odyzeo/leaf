jQuery( function( $ ) {
	
	$(document).ready(function() {
		
		if($('#tg-mentor-search-result').length){
			$('#tg-mentor-search-result a.tg-show-more').click(function(e){
				var cover = $(this).closest('div.tg-desc');
				$(this).hide();
				cover.find('div.tg-more').slideDown('fast');
				cover.find('a.tg-show-less').show();
				e.preventDefault();
			});
			$('#tg-mentor-search-result a.tg-show-less').click(function(e){
				$(this).hide();
				var cover = $(this).closest('div.tg-desc');
				cover.find('div.tg-more').slideUp('fast');
				cover.find('a.tg-show-more').show();
				e.preventDefault();
			});
		}
		
	});
	
});