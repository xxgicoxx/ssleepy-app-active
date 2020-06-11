$(document).ready(function() {
	let page = null;
	let pageid = null;
	
	let lastPosX = null;
	let lastPosY = null;
	
	let onMovement = false;
	let moved = false;

	let socket = io.connect(ip(), { transports: ['websocket'] });
	
	document.addEventListener('touchstart', function(e) {
		socket.sendBuffer = [];
		
		moved = false;
	});
	
	document.addEventListener('touchmove', function(e) {
		socket.sendBuffer = [];
		
		moved = true;
		
		if(!onMovement) {
			page = document.getElementsByClassName('ui-page-active')[0];
			pageid = page ? page.id : '';
			
			lastPosX = lastPosX || e.touches[0].clientX;
			lastPosY = lastPosY || e.touches[0].clientY;
			
			if(pageid === 'mouse') {
				onMovement = true;
				
				socket.emit('movemouse', {
					x: e.touches[0].clientX - lastPosX, 
					y: e.touches[0].clientY - lastPosY
				});
				
				lastPosX = e.touches[0].clientX;
				lastPosY = e.touches[0].clientY;
				
				onMovement = false;
			}
		}
	});
	
	document.addEventListener('touchend', function(e) {
		socket.sendBuffer = [];
		
		page = document.getElementsByClassName('ui-page-active')[0];
		pageid = page ? page.id : '';
		
		if(pageid === 'mouse') {
			if(moved) {
				lastPosX = null;
				lastPosY = null;
			} else if(!moved && e.changedTouches[0].clientX <= (screen.width / 2)) {
				leftClick();
			} else if(!moved && e.changedTouches[0].clientX > (screen.width / 2)) {
				rightClick();
			}
		}
	});
});

function leftClick() {
	post('/leftclick/');
}

function rightClick() {
	post('/rightclick/');
}