$(document).ready(function($){
	$('.lightbox').lightbox();

	var $photos = $("#ashley-photo-wall");

	$.get('/photos.json', function(data) {
		var list = '<% _.forEach(photos, function(photo) { %>' +
					'<li data-thumb="<%- photo.image_url %>">' +
						'<a href="<%- photo.href %>" class="lightbox" target="<%- photo.target %>"></a>' +
					'</li>' +
					'<% }); %>';

		$('#photo-grid').html(_.template(list, { 'photos': data.photos }));

		$photos.magicWall({
			maxItemWidth: 384,
			maxItemHeight: 270,
			delay: 1000,
			pauseOnHover: true,
			preloadBeforeSwitch: true
		});

		$photos.magicWall("stop");

		_.forEach(_.range(20), function(idx){
			setTimeout(function(){
				$photos.magicWall("switchItem", idx, '-flipX', 1000, "easeInOutCubic");
			}, idx*200);
		});
	});

	$(".colorbox").colorbox({
		onOpen: function(){
			$("#ashley-photo-wall").magicWall("stop");
		},
		
		onClosed: function(){
			$("#ashley-photo-wall").magicWall("start");
		}
	});
});