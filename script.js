
(function($) {

	'use strict';

	$(document).ready(function() {
		var key = '98e2546778e44705aafadd065bcf1153';
		var collections = false;
		var template_story = '<article class="link"><h3><a class="story-link" href="lnk">title</a></h3>'
		+ '<div class="embedded-container"><div class="embedly-image"></div>'
		+ '<div class="embedly-summary"></div></div><p>notes... <a>Edit</a></p></article>';

		var tab_template = "<div class='storyline-block'><div class='storyline-block-title'>ttl</div><div class='edit'><a>Edit</a></div></div>";

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
			$('.add-link-expand').after(new_url);

			$.get('https://api.embed.ly/1/oembed?key='+key+'&url=' + link, function(data,err) {
				var $this = $('#main > .link').first();
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
			$('.add-picture-expand').hide();
			$('#main').css({'width':'30%','margin-left':'60%'})
			$('#storyline').css('display','block');
			collections = !collections;
			console.log($('.link'));
			$('.content').each(function(index,element) {
				$(element).draggable({
					revert: true
				});
			});

			$('.add-block').droppable({
				accept: '.content',
				drop: function(event,ui) {
					console.log(ui.draggable);
					var clone = ui.draggable.clone().css ({
						left: 0,
						top: 0,
					});
					$('#add-content').append(clone);

			}});

			$('#add-block').on('click',function(){
				$('#add-content').html("");
				var new_title = $('.add-block input').val();
				$('.add-block input').val('');
				$('.add-block textarea').val('');
				new_title = tab_template.replace('ttl', new_title);
				$('#storyline-tabs').prepend(new_title);
			});
		})

		$('.add-link').on('click', function(event) {
			
		});



		$('li.tweet-switch').click(function() {

			$('article').css('display','none');
			$('.add').css({'display':'none'});
			$('.add-tweet-expand').css('display','block');

			$('.dots').attr('fill','none');
			$('#tweet').attr('fill','#D26091');

			$('.image-content').css({'display':'none'});
			if ($('#storyline').css('display')!='none')
			{
				$('.add-tweet-expand').css('display','none');
			}

		})

		$('li.link-switch').click(function() {
			$('.add').css('display','none');
			$('.add-link-expand').css({'display':'block'});
			$('article').css('display','block');
			$('.dots').attr('fill','none');
			$('#link').attr('fill','#00A4C5');
			$('.image-content').css({'display':'none'});

			if ($('#storyline').css('display')!='none')
			{
				$('.add-link-expand').css('display','none');
			}


		})


		$('li.picture-switch').click(function() {
			$('.add').css('display','none');
			$('.add-picture-expand').css({'display':'block'});
			$('article').css('display','none');
			$('.dots').attr('fill','none');
			$('#picture').attr('fill','#DDC85C');
			$('.image-content').css({'display':'block'});

			if ($('#storyline').css('display')!='none')
			{
				$('.add-picture-expand').css('display','none');
			}


		})


		$('li.video-switch').click(function() {
			$('.dots').attr('fill','none');
			$('#video').attr('fill','#6D6E71');


		})

		$('li.data-switch').click(function() {
			$('.dots').attr('fill','none');
			$('#data').attr('fill','#5b5492');



		})


	});
	

})(jQuery);
