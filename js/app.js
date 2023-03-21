(function() {
	window.addEventListener('tizenhwkey', function(ev) {
		if(ev.keyName === 'back') {
			const page = document.getElementsByClassName('ui-page-active')[0];
			const pageId = page ? page.id : '';
			
			if(pageId === 'hsectionchangerPage') {
				tizen.application.getCurrentApplication().exit();
			} else {
				window.history.back();
			}
		}
	});
}());