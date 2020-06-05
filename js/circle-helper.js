(function (tau) {
	if (tau.support.shape.circle) {
		document.addEventListener("pagebeforeshow", function (event) {
			var page, list;

			page = event.target;
			
			if (page.id !== "page-snaplistview" && page.id !== "page-swipelist" && page.id !== "page-marquee-list") {
				list = page.querySelector(".ui-listview");
				if (list) {
					tau.widget.ArcListview(list);
				}
			}
		});
	}
}(tau));
