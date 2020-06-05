$(document).ready(function() {
	$(document).on('click', '#playpause', function(e) {
		$.post({
            url: (localStorage.getItem("ip") || "http://192.168.0.1:1905") + "/playpause/",
            contentType: "application/json",
            dataType: "json",
            success: function(data) { console.log("Success") },
            error: function(data) { console.log(data) }
        });
	});
	
	$(document).on('click', '#next', function(e) {
		$.post({
            url: (localStorage.getItem("ip") || "http://192.168.0.1:1905") + "/next/",
            contentType: "application/json",
            dataType: "json",
            success: function(data) { console.log("Success") },
            error: function(data) { console.log(data) }
        });
	});
	
	$(document).on('click', '#prev', function(e) {
		$.post({
            url: (localStorage.getItem("ip") || "http://192.168.0.1:1905") + "/prev/",
            contentType: "application/json",
            dataType: "json",
            success: function(data) { console.log("Success") },
            error: function(data) { console.log(data) }
        });
	});
	
	$(document).on('click', '#volumeup', function(e) {
		$.post({
            url: (localStorage.getItem("ip") || "http://192.168.0.1:1905") + "/volumeup/",
            contentType: "application/json",
            dataType: "json",
            success: function(data) { console.log("Success") },
            error: function(data) { console.log(data) }
        });
	});
	
	$(document).on('click', '#volumedown', function(e) {
		$.post({
            url: (localStorage.getItem("ip") || "http://192.168.0.1:1905") + "/volumedown/",
            contentType: "application/json",
            dataType: "json",
            success: function(data) { console.log("Success") },
            error: function(data) { console.log(data) }
        });
	});
	
	$(document).on('click', '#mute', function(e) {
		$.post({
            url: (localStorage.getItem("ip") || "http://192.168.0.1:1905") + "/mute/",
            contentType: "application/json",
            dataType: "json",
            success: function(data) { console.log("Success") },
            error: function(data) { console.log(data) }
        });
	});
	
	$(document).on('click', '#fullscreen', function(e) {
		$.post({
            url: (localStorage.getItem("ip") || "http://192.168.0.1:1905") + "/fullscreen/",
            contentType: "application/json",
            dataType: "json",
            success: function(data) { console.log("Success") },
            error: function(data) { console.log(data) }
        });
	});
	
	$(document).on('click', '#shutdown', function(e) {
		$.post({
            url: (localStorage.getItem("ip") || "http://192.168.0.1:1905") + "/shutdown/",
            contentType: "application/json",
            dataType: "json",
            success: function(data) { console.log("Success") },
            error: function(data) { console.log(data) }
        });
	});
	
	$(document).on('click', '#restart', function(e) {
		$.post({
            url: (localStorage.getItem("ip") || "http://192.168.0.1:1905") + "/restart/",
            contentType: "application/json",
            dataType: "json",
            success: function(data) { console.log("Success") },
            error: function(data) { console.log(data) }
        });
	});
});