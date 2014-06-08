
(function($) {

	'use strict';

	$(document).ready(function() {
		var key = '98e2546778e44705aafadd065bcf1153';

		var template_story = '<article class="link"><h3><a class="story-link" href="lnk">title</a></h3>'
		+ '<div class="embedded-container"><div class="embedly-image"></div>'
		+ '<div class="embedly-summary"></div></div><p>notes... <a>Edit</a></p></article>'

		$('.link').each(function(){
			var $this = $(this);
			console.log($this);
			var link = $this.find('.story-link').attr('href');
			$.get('https://api.embed.ly/1/oembed?key='+key+'&url=' + link, function(data,err) {
				console.log(data);
				$this.find('h3 a').text(data.title);
				if(data.thumbnail_url) {
					$this.find('.embedly-image').css({
						'background-image': 'url(http://i.embed.ly/1/display/resize?height=90&width=90&url='+data.thumbnail_url+'&key=' + key+')'
					});
				}
				var description = data.description.length > 120 ? data.description.substr(0,120) + '...': data.description;
				$this.find('.embedly-summary').text(description);
			});
		});

		$('#submit-url').on('click', function(event) {
			event.preventDefault();
			var link = $('#urllink').val(),
				notes = $('#urlnotes').val();
			console.log(notes);
			var	new_url = template_story.replace('lnk', link).replace('notes', notes);
			console.log(new_url);
			$('#main').append(new_url);

			$.get('https://api.embed.ly/1/oembed?key='+key+'&url=' + link, function(data,err) {
				var $this = $('#main > .link:last-child');
				console.log($this);
				$this.find('h3 a').text(data.title);
				$this.find('.embedly-image').css({
					'background-image': 'url(http://i.embed.ly/1/display/resize?height=90&width=90&url='+data.thumbnail_url+'&key=' + key+')'
				});
				var description = data.description.length > 120 ? data.description.substr(0,120) + '...': data.description;
				$this.find('.embedly-summary').text(description);
			});
		});
		
		$('#switch').click(function() {
			$(this).html("<a href=''>Switch to Collections</a>");
			$('.add-link-expand').hide();
			$('.add-tweet-expand').hide();
			$('#main').css({'width':'30%','margin-left':'60%'})
			$('#storyline').css('display','block');

		})

		$('.add-link').on('click', function(event) {
			
		});



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
	});
	

})(jQuery);
