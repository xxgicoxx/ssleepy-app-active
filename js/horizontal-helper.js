(function () {
	const page = document.getElementById('hsectionchangerPage');
	const changer = document.getElementById('hsectionchanger');
	const sectionLength = document.querySelectorAll('section').length;
	const elPageIndicator = document.getElementById('pageIndicator');
	
	let sectionChanger;
	let pageIndicator;
	let pageIndicatorHandler;

	page.addEventListener('pagebeforeshow', function () {
		pageIndicator = tau.widget.PageIndicator(elPageIndicator, {
			numberOfPages: sectionLength
		});
		
		$("div section").removeClass("ui-section-active");
		$(".main-section").addClass("ui-section-active");
		
		pageIndicator.setActive(2);
		
		sectionChanger = tau.widget.SectionChanger(changer, {
			circular: true,
			orientation: 'horizontal',
			useBouncingEffect: true
		});
	});

	page.addEventListener('pagehide', function () {
		sectionChanger.destroy();
	});

	pageIndicatorHandler = function (e) {
		pageIndicator.setActive(e.detail.active);
	};

	changer.addEventListener('sectionchange', pageIndicatorHandler, false);
}());
