$(function() {
	$('#switch').click(function() {
		$(this).html("<a href=''>Switch to Collections</a>");
		$('.add-link').css({'display':'none'});
		$('.add-link-expand').css({'display':'none'});
		$('.add-tweet-expand').css({'display':'none'});
		$('#main').css({'width':'30%','margin-left':'60%'})
		$('#storyline').css('display','block');
	})


	$('li.tweet-switch').click(function() {
		$('article').css('display','none');
		$('.add-link').css({'display':'none'});
		$('.add-link-expand').css({'display':'none'});

		$('.add-tweet-expand').css('display','block');

		$('#tweet').attr('fill','#D26091');
		$('#link').attr('fill','none');
	})

	$('li.link-switch').click(function() {
		$('#link').attr('fill','#00A4C5');
		$('#tweet').attr('fill','none');
	})



})