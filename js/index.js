$(document).ready(function() {
	$(document).on('click', '#playpause', function(e) {
		post('/playpause/');
	});
	
	$(document).on('click', '#next', function(e) {
		post('/next/');
	});
	
	$(document).on('click', '#previous', function(e) {
		post('/previous/');
	});
	
	$(document).on('click', '#volumeup', function(e) {
		post('/volumeup/');
	});
	
	$(document).on('click', '#volumedown', function(e) {
		post('/volumedown/');
	});
	
	$(document).on('click', '#mute', function(e) {
		post('/mute/');
	});
	
	$(document).on('click', '#close', function(e) {
		post('/close/');
	});
	
	$(document).on('click', '#fullscreen', function(e) {
		post('/fullscreen/');
	});
	
	$(document).on('click', '#shutdown', function(e) {
		post('/shutdown/');
	});
	
	$(document).on('click', '#restart', function(e) {
		post('/restart/');
	});
});