$(document).ready(function($){
	$('.lightbox').lightbox();

	$.get('/photos.json', function(data) {
		var list = '<% _.forEach(photos, function(photo) { %>' +
					'<li data-thumb="<%- photo.image_url %>">' +
						'<a href="<%- photo.href %>" class="lightbox" target="<%- photo.target %>"></a>' +
					'</li>' +
					'<% }); %>';

		$('#photo-grid').html(_.template(list, { 'photos': data.photos }));

		$("#demo").magicWall({
			maxItemWidth: 384,
			maxItemHeight: 270,
			delay: 1500,
			pauseOnHover: true
		});
	});

	$(".colorbox").colorbox({
		onOpen: function(){
			$(".magicwall").magicWall("stop");
		},
		
		onClosed: function(){
			$(".magicwall").magicWall("start");
		}
	});
});