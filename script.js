$(function() {
	$('#switch').click(function() {
		$(this).html("<a href=''>Switch to Collections</a>");
		$('.add-link').css({'display':'none'});
		$('.add-link-expand').css({'display':'none'});
		$('#main').css({'width':'30%','margin-left':'60%'})
		$('#storyline').css('display','block');
	})
})