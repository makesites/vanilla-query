/**
 * @name vanilla-query
 * Version: 0.2.0 (Sun, 30 Jun 2019 14:56:40 GMT)
 *
 * @author makesites
 * Homepage: http://github.com/makesites/vanilla-query
 * @license Apache License, Version 2.0
 */

 // stop processing if $ is already part of the namespace
//if( !$ )
(function(window, document) {

var vQuery = function(){
	var self = this;
	var $ = function( query ){
		// find the el if passed a query
		selector(query);
		return self;
	};
	// copy methods from class
	for(var i in this ){
		$[i] = this[i];
	}
	return $;
};

// internal variables
var _selected = {};

// AJAX
vQuery.prototype.ajax = function(url, options){
	// prerequisite(s)
	if( !url ) return;
	// fallback(s)
	options = options || {};
	// variables
	var data;
	var type = options.dataType || 'get';
	var success = options.success || function(){};
	var error = options.error || function(){};

	// start request
	var request = new XMLHttpRequest();
	request.open(type, url, true);

	// use tpe specific methods ?
	if (type.toLowerCase() === 'get') {
		request.send();
	}
	if (type.toLowerCase() === 'post') {
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
	httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	httpRequest.open('POST', url);
	httpRequest.send( vQuery.param( data ) );
};

// JSONP
// Example: $.getJSON('//example.com', function (data) { })
vQuery.prototype.getJSON = function(url, callback){
	// save callback
	window._success = callback;
	var scr = document.createElement('script');
	scr.src = url + '?callback=_success';
	document.body.appendChild(scr);
};

// Param - convert a JSON object to a string of URL params
// Example: $.param( obj )
vQuery.prototype.param = function(data){

	return Object.keys(data).map(function(k) {
		return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
	}).join('&');

};


// attr - set attribute value
// Example: $( selector ).attr( key, value );
vQuery.prototype.attr = function(key, value){
	_selected.setAttribute(key, value);
	return this;
};

// Classes

// addClass
vQuery.prototype.addClass = function(name){
	_selected.classList.add(name);
	return this;
};

// toggleClass
vQuery.prototype.hasClass = function(name) {
	return new RegExp(' ' + name + ' ').test(' ' + _selected.className + ' ');
};

// toggleClass
vQuery.prototype.toggleClass = function(name){
	_selected.classList.toggle(name);
	return this;
};

// jQuery
vQuery.prototype.ready = function( callback ){
	// special condition for Chrome
	//window.addEventListener('DOMFocusIn', callback, false);
	document.addEventListener('DOMContentLoaded', callback, false);
};

// click
vQuery.prototype.click = function( callback ){
	if( Array.isArray(_selected) ){
		[].forEach.call(_selected, function(el) {
		  el.addEventListener('click', callback);
		});
	} else {
		var el = _selected;
		el.addEventListener('click', callback);
	}
	return this;
};

// append
vQuery.prototype.append = function( el ){
	_selected.appendChild( el );
};

// clone
vQuery.prototype.clone = function( callback ){
	return _selected.cloneNode(true);
};

// empty
vQuery.prototype.empty = function( callback ){
	while(_selected.firstChild){  _selected.removeChild(_selected.firstChild); }
};

// html
vQuery.prototype.html = function( html ){
	var el = getEl();
	// two states
	if( html ){
		el.innerHTML = html;
		return this;
	} else {
		return el.innerHTML;
	}
};

// internal selector method
var selector = function( query ){
	var el = null;
	// first off if it's not a string assume it's already an element
	if( typeof query !== "string" ){
		el = query;
	} else if( isTag(query) ){
		// check if it's a tag
		var tag = query.substring(1, query.length-1);
		el = document.createElement( tag );
	} else if( isId(query) ){
		// check if it's an id
		var id = query.substr(1);
		el = document.getElementById( id );
	} else {
		// run a basic query
		el = document.querySelectorAll(query);
	}
	// save element(s) for chaining commands
	_selected = el;
	return this;

};

// show
vQuery.prototype.show = function(){
	_selected.style.display = '';
	return this;
};

// hide
vQuery.prototype.hide = function(){
	_selected.style.display = 'none';
	return this;
};

// css
vQuery.prototype.css = function(key, value){
	_selected.style[ camelCase(key) ] = value;
	return this;
};

// each
// Example: $("a").each(function( el ){ });
vQuery.prototype.each = function( a, b ){
	// check variables
	var el, callback;
	if( typeof a == "function"){
		callback = a;
		el = getEl();
	} else {
		el = a;
		callback = ( b ) ? b : function(){};
	}
	[].forEach.call(el, callback );
};

// parent
vQuery.prototype.parent = function( query ){
	return _selected.parentNode;
};

// is
vQuery.prototype.is = function( query ){
	var flag = false;
	switch( query ){
		case ":empty":
			flag = (!_selected.hasChildNodes());
		break;
	}
	return flag;
};

// next
vQuery.prototype.next = function(){
	return _selected.nextSibling;
};

// filter (partial support)
vQuery.prototype.filter = function(key){
	if( key == ":first" ){
		return ( Array.isArray(_selected) ) ? _selected[0] : _selected;
	}
	//...
};



// Utils
// Underscore Mixin: camelCase()
// Source: https://gist.github.com/tracend/5530356
var camelCase = function( string ){
	return  string.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
};


var isTag = function( string ){
	return string.search(/^<\w+>$/) === 0;
};

var isId = function( string ){
	return string.search(/^#\w+$/) === 0;
};

// return one item from the _selected stack
var getEl = function( i ){
	i = i || 0;
	// more sophisticated logic here?
	return _selected[i] || _selected;
};


// Common.js extend method: https://github.com/commons/common.js
var extend = function(destination, source) {
	for (var property in source) {
		if (source[property] && source[property].constructor && source[property].constructor === Object) {
			destination[property] = destination[property] || {};
			arguments.callee(destination[property], source[property]);
		} else {
			destination[property] = source[property];
		}
	}
	return destination;
};



	window.vQuery = new vQuery();
	// condition the attachment to the $
	window.$ = window.vQuery;

})(this.window, this.document);
