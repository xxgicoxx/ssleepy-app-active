(function() {
	window.addEventListener('tizenhwkey', function(ev) {
		if(ev.keyName === 'back') {
			let page = document.getElementsByClassName('ui-page-active')[0],
			pageid = page ? page.id : '';
			
			if(pageid === 'hsectionchangerPage') {
				tizen.application.getCurrentApplication().exit();
			} else {
				window.history.back();
			}
		}
	});
}());