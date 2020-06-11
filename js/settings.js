$(document).ready(function() {
	$(document).on('keyup', '#ip', function(e) {
		if(e.keyCode === 13) {
			localStorage.setItem('ip', $(this).val());
		}
	});
	
	$(document).on('focus', '#ip', function(e) {
		$('#ip').val(ip());
	});
});