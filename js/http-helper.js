function post(uri) {
	$.post({
        url: ip() + uri,
        contentType: 'application/json',
        dataType: 'json',
        success: function() { 
        	console.log('Success');
        },
        error: function() { 
        	console.log('Error') ;
        }
    });
}

function ip() {
	return (localStorage.getItem('ip') || 'http://192.168.0.1:1905');
}