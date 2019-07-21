// AJAX
vQuery.prototype.ajax = function(url, options){
	// prerequisite(s)
	if( !url ) return;
	// fallback(s)
	options = options || {};
	// variables
	var data;
	var method = options.method || 'get';
	var success = options.success || function(){};
	var error = options.error || function(){};

	// start request
	var request = new XMLHttpRequest();
	request.open(method, url, true);

	// use tpe specific methods ?
	if (method.toLowerCase() === 'get') {
		request.send();
	}
	if (method.toLowerCase() === 'post') {
		// Check if options.data is JSON, if not, send as application/x-www-form-urlencoded
		try {
			options.data = JSON.stringify(options.data);
			request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		} catch (e) {
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		}
		request.send(options.data);
	}
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			try {
				data = JSON.parse(request.responseText);
			} catch (e) {
				data = request.responseText;
			}
			success(data);
		} else {
			error();
		}
	};
	request.onerror = function(err) {
		 error(err);
	};
};

// GET
// Example: $.get('//example.com', function (data) { });
vQuery.prototype.get = function(url, callback){
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = callback;
	httpRequest.open('GET', url);
	httpRequest.send();
};

// POST
// Example: $.post('//example.com', { username: username }, function (data) { })
vQuery.prototype.post = function(url, data, callback){
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = callback;
	httpRequest.open('POST', url);
	httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	httpRequest.send( vQuery.param( data ) );
};

vQuery.prototype.load = function(url, data, callback){
	// prerequisite(s)
	if( !url ) return;
	// fallback(s)
	data = data || {};
	if( !isFunction(callback) ) callback = function(){};
	var nodes = ( !isArray(_selected) ) ? [_selected] : _selected;
	// ajax request
	this.ajax( url, {
		data: data,
		dataType: 'html', // what's returned from the server
		success: function( response ){
			//
			nodes.forEach(function(node){
				node.innerHTML = response;
			});
			// continue;
			callback();
		}
	});
	//
};

// JSONP
// Example: $.getJSON('//example.com', function (data) { })
vQuery.prototype.getJSON = function(url, callback){
	// save callback
	window._success = callback;
	var scr = document.createElement('script');
	scr.src = url + '?callback=_success';
	document.body.append(scr);
};

vQuery.prototype.parseJSON = function( str ){
	// prereqiusite(s)
	if( isObject(str) ) return str; /// already an object
	if( !isString(str) ) return false; // alert error?
	//
	try {
		var output = JSON.parse( str );
		return output;
	} catch (e) {
		// error:
		console.log("error", "JSON not valid");
	}
};

// Param - convert a JSON object to a string of URL params
// Example: $.param( obj )
vQuery.prototype.param = function(data){

	return Object.keys(data).map(function(k) {
		return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
	}).join('&');

};
