/**
 * @name vanilla-query
 * Version: 0.5.1 (Thu, 04 May 2023 19:15:17 GMT)
 *
 * @author makesites
 * Homepage: http://makesites.org/projects/vanilla-query
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


// attr - set attribute value
// Example: $( selector ).attr( key, value );
vQuery.prototype.attr = function(key, value){
	if( !_selected ) return this;
	var nodes = ( isElement(_selected) && !isArray(_selected) ) ? [ _selected ] : _selected;
	var output = [];
	//
	nodes.forEach(function(el){
		if( key ){
			// set attributes
			if( value && isString(value) ){
				el.setAttribute(key, value);
				output = this; // change of type...
			} else if ( isObject(key) ){
				var props = key;
				for(var p in props){
					el.setAttribute(p, props[p]);
					output = this; // change of type...
				}
			} else if( isString(key) ){
				output.push(el.attributes[key].value);
			}
		} else {
			// return attributes
			var atts = {};
			el.attributes.forEach(function( property ){
				var name = camelCase( property.name );
				atts[name] = property.value;
			});
			output.push(atts);
		}
	});

	return output;
};

vQuery.prototype.removeAttr = function(attr){
	if( Array.isArray(_selected) ){
		_selected.forEach(function( el ){
			el.removeAttribute( attr );
		});
	} else {
		var el = _selected;
		el.removeAttribute( attr );
	}
	return this;
};


// Classes

// addClass
vQuery.prototype.addClass = function(names){
	// check if string?
	var classes = names.split(' ');
	for( var i in classes ){
		var name = classes[i];
		_selected.classList.add(name);
	}
	return this;
};

// hasClass
vQuery.prototype.hasClass = function(name) {
	//return new RegExp(' ' + name + ' ').test(' ' + _selected.className + ' ');
	return _selected.classList.contains( name );
};

// toggleClass
vQuery.prototype.toggleClass = function(names){
	// check if string?
	var classes = names.split(' ');
	for( var i in classes ){
		var name = classes[i];
		_selected.classList.toggle(name);
	}
	return this;
};

// toggleClass
vQuery.prototype.removeClass = function(names){
	// check if string?
	var classes = names.split(' ');
	for( var i in classes ){
		var name = classes[i];
		_selected.classList.remove(name);
	}
	return this;
};



vQuery.prototype.type = function( el ){
	el = el || _selected;
	return Object.prototype.toString.call( el ).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
};

vQuery.prototype.isEmptyObject = function(){
	if( !_selected ) return;
	return !_selected.hasChildNodes();
};

vQuery.prototype.isFunction = function( value ){
	return isFunction( value );
};

vQuery.prototype.isArray = function( value ){
	return isArray( value );
};

// Elements
vQuery.prototype.contains = function( el ){
	// check for a match
	return _selected.textContent.indexOf( el ) > -1;
};


vQuery.prototype.val = function( value ){
	if( isString(value) ){
		if( isArray(_selected) ){
			_selected.forEach(function(i){
				i.value = value;
			});
		} else {
			_selected.value = value;
		}
		return this;
	} else {
		return _selected.value || 0;
	}
};

//

vQuery.prototype.text = function( text ){
	text = text || "";
	var output = [];
	if( isArray(_selected) ){
		_selected.forEach(function( el ){
			if( !text ){
				output.push( el.textContent );
			} else {
				el.textContent = text;
			}
		});
	} else {
		var el = _selected;
		if( !text ){
			output.push( el.textContent );
		} else {
			el.textContent = text;
		}
	}
	return contents ? this : output;
};

// Event methods
vQuery.prototype.ready = function( callback ){
	if( callback && callback !== undefined && typeof callback === 'function' ){
		// special condition for Chrome
		//window.addEventListener('DOMFocusIn', callback, false);
		document.addEventListener('DOMContentLoaded', callback, false);
	} else {
		// output error
		console.log(".ready():", "Callback not valid");
	}
};

// click
vQuery.prototype.click = function( callback ){
	if( Array.isArray(_selected) && callback ){
		_selected.forEach(function( el ){
		  el.addEventListener('click', callback);
		});
	} else if( callback ) {
		var el = _selected;
		el.addEventListener('click', callback); // this.on('click', callback);
	} else {
		this.trigger('click');
	}
	return this;
};

// trigger
vQuery.prototype.trigger = function( event ){
	var el = _selected;
	if( el.fireEvent ){
		el.fireEvent('on' + event);
	} else {
		var e = document.createEvent('Events');
		e.initEvent(event, true, false);
		el.dispatchEvent(e);
	}
	return this;
};

vQuery.prototype.on = function( event, callback ){
	// prerequisite(s)
	if( !callback ) return this; // assume it's a function?
	//
	if( Array.isArray(_selected) ){
		_selected.forEach(function( el ){
		  el.addEventListener( event, callback );
		});
	} else {
		var el = _selected;
		el.addEventListener( event, callback );
	}
	return this;
};

vQuery.prototype.off = function( event, callback ){
	// prerequisite(s)
	if( !callback ) return this; // assume it's a function?
	//
	if( Array.isArray(_selected) ){
		_selected.forEach(function( el ){
		  el.removeEventListener( event, callback );
		});
	} else {
		var el = _selected;
		el.removeEventListener( event, callback );
	}
	return this;
};


// prepend
vQuery.prototype.prepend = function( node ){
	// prerequisite: check if node is an element?
	// multiple items
	if( Array.isArray(_selected) ){
		_selected.forEach(function( el ){
			el.insertBefore( node, el.firstChild );
		});
	} else {
		var el = _selected;
		el.insertBefore( node, el.firstChild );
	}
	return this;
};

// append
vQuery.prototype.append = function( node ){
	// prerequisite: check if node is an element?
	// multiple items
	if( Array.isArray(_selected) ){
		_selected.forEach(function( el ){
			el.append( node ); // appendChild(node);
		});
	} else {
		var el = _selected;
		el.append( node ); // appendChild(node);
	}
	return this;
};

vQuery.prototype.before = function( str ){
	// multiple items
	if( Array.isArray(_selected) ){
		_selected.forEach(function( el ){
			el.insertAdjacentHTML('beforebegin', str);
		});
	} else {
		var el = _selected;
		el.insertAdjacentHTML('beforebegin', str);
	}
	return this;
};

vQuery.prototype.after = function( str ){
	// multiple items
	if( Array.isArray(_selected) ){
		_selected.forEach(function( el ){
			el.insertAdjacentHTML('afterend', str);
		});
	} else {
		var el = _selected;
		el.insertAdjacentHTML('afterend', str);
	}
	return this;
};

vQuery.prototype.insertBefore = function( node ){
	// prerequisite(s)
	if( !_selected ) return this;
	// prerequisite: check if node is an element?
	// multiple items
	if( Array.isArray(_selected) ){
		_selected.forEach(function( el ){
		  node.parentNode.insertBefore(el, node.parentNode.firstChild);
		});
	} else {
		var el = _selected;
		node.parentNode.insertBefore(el, node.parentNode.firstChild);
	}
	return this;
};

vQuery.prototype.insertAfter = function( node ){
	// prerequisite(s)
	if( !_selected ) return this;
	// prerequisite: check if node is an element?
	// multiple items
	if( Array.isArray(_selected) ){
		_selected.forEach(function( el ){
		  node.parentNode.insertBefore(el, node.parentNode.nextSibling);
		});
	} else {
		var el = _selected;
		node.parentNode.insertBefore(el, node.parentNode.nextSibling);
	}
	return this;
};

vQuery.prototype.replaceWith = function( html ){
	// prerequisite(s)
	var replaced = [];
	if( Array.isArray(_selected) ){
		_selected.forEach(function( el ){
			replaced.push( el.outerHTML );
			el.outerHTML = html;
		});
	} else {
		var el = _selected;
		replaced.push( el.outerHTML );
		el.outerHTML = html;
	}
	return replaced;
};

// Feature not supported yet
/*
vQuery.prototype.wrap = function( tag ){
	// check tag
	if( Array.isArray(_selected) ){
		_selected.forEach(function( el ){
			el.outerHTML = `${tag.match(/<(.|\n)*?>/g)[0]}${el.outerHTML}`;
		});
	} else {
		var el = _selected;
		el.outerHTML = `${tag.match(/<(.|\n)*?>/g)[0]}${el.outerHTML}`;
	}
	return this;
};
*/


// clone
vQuery.prototype.clone = function( callback ){
	return _selected.cloneNode(true); // also replace _selected with cloned?
};

vQuery.prototype.remove = function(){
	if( Array.isArray(_selected) ){
		_selected.forEach(function( el ){
		  el.parentNode.removeChild(el);
		});
	} else {
		var el = _selected;
		el.parentNode.removeChild(el);
	}
	return this;
};

// empty
vQuery.prototype.empty = function( callback ){
	while(_selected.firstChild){ _selected.removeChild(_selected.firstChild); } // or: el.innerHTML = '';
};

vQuery.prototype.unique = function( items ){
	var array = items || _selected || null;
	var unique = Array.from( new Set( array ) );
	if( items ){
		return unique;
	} else {
		_selected = unique;
		return this;
	}
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

vQuery.prototype.parseHTML = function( str ){
	var html = document.implementation.createHTMLDocument();
	html.body.innerHTML =  str ;
	return html.body.children;
};


// Array manipulation

vQuery.prototype.map = function( cb ){
	// prerequisite(s)
	if( !isFunction(cb) || !_selected ) return this;
	Array.prototype.map.call( _selected, cb );
	return this;
};


// String manipulation

vQuery.prototype.trim = function( str ){
	if( !isString(str) ) return false;
	return str.trim();
};

// internal selector method
var selector = function( query, root ){
	// fallbacks
	if( !root || !isElement(root) ) root = document;
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
		el = root.getElementById( id );
	} else {
		// run a basic query
		el = root.querySelectorAll(query);
	}
	// save element(s) for chaining commands
	_selected = el;
	return this;

};

// show
vQuery.prototype.show = function(){
	// prerequisite(s)
	if( !_selected ) return this;
	// multiple items
	if( Array.isArray(_selected) ){
		_selected.forEach(function( el ){
		  el.style.display = ''; // display = 'block
		});
	} else {
		var el = _selected;
		el.style.display = ''; // display = 'block
	}
	return this;
};

// hide
vQuery.prototype.hide = function(){
	// prerequisite(s)
	if( !_selected ) return this;
	// multiple items
	if( Array.isArray(_selected) ){
		_selected.forEach(function( el ){
		  el.style.display = 'none';
		});
	} else {
		var el = _selected;
		el.style.display = 'none';
	}
	return this;
};

// toggle
vQuery.prototype.toggle = function (elem) {
	// prerequisite(s)
	if( !_selected ) return this;
	var self = this;
	// multiple items
	if( Array.isArray(_selected) ){
		_selected.forEach(function( el ){
			// If the element is visible, hide it
			if( window.getComputedStyle(el).display === 'block' ){
				self.hide();
			} else {
				self.show();
			}
		});
	} else {
		var el = _selected;
		// If the element is visible, hide it
		if( window.getComputedStyle(el).display === 'block' ){
			self.hide();
		} else {
			self.show();
		}
	}
	return this;

};

// css
vQuery.prototype.css = function(key, value){
	// prerequisite(s)
	if( !isElement( _selected )  ) return this;
	//
	if( isString(key) ){
		_selected.style[ camelCase(key) ] = value;
	} else if( isObject(key) ){
		var styles = key;
		for( var k in styles ){
			var v = styles[k];
			_selected.style[ camelCase(k) ] = v;
		}
	} else {
		// return styles (check if element first?)
		return getComputedStyle( _selected );
	}
	return this;
};

vQuery.prototype.position = function(){
	if( !_selected ) return false;
	// expect one element
	return { left: _selected.offsetLeft, top: _selected.offsetTop };
};

vQuery.prototype.height = function(){
	if( !_selected ) return 0; // error log?
	var height = _selected.offsetHeight || 0;
	return height;
};

vQuery.prototype.width = function(){
	if( !_selected ) return 0; // error log?
	var width = _selected.offsetWidth || 0;
	return width;
};

vQuery.prototype.offset = function(){
	var pos = _selected.getBoundingClientRect();
	var offset = {
		top: pos.top + document.body.scrollTop,
		left: pos.left + document.body.scrollLeft
	};
	return offset;
};

vQuery.prototype.offsetParent = function(){
	if( !_selected ) return false; // error log?
	return _selected.offsetParent;
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
	//el.forEach( callback );
};

vQuery.prototype.find = function(query){
	if( !isElement(query) ){
		if( query.indexOf(',') > -1 ){
			var _query = query.split(',');
			var nodes = [];
			_query.forEach(function(i){
				var subset = [];
				if(nodes.length){
					nodes.forEach(function( node ){
						subset = selector(i, node);
						subset.forEach(function(m){
							nodes.push(m);
						});
					});
				} else {
					subset = selector(i, _selected);
					subset.forEach(function(n){
						nodes.push(n);
					});
				}
			});
			_selected = nodes;
		} else {
			_selected = selector(query, _selected);
		}
	} else {
		// replace selected
		_selected = query;
	}
	return this;
};

vQuery.prototype.get = function(i){
	return ( isArray(_selected) ) ? _selected[i] : null;
};


// parent
vQuery.prototype.parent = function( query ){
	return _selected.parentNode;
};

vQuery.prototype.parents = function( el ){
	var parent = _selected.parentNode;
	var parents = [];
	//
	while( parent ){
		parents.unshift(parent);
		parent = parent.parentNode;
	}
	if( el ){
		var parents_with_el = [];
		var valid_parents = [];
		parents.forEach(function( node ){
			parents_with_el = slice( node.querySelectorAll( el ) ); // query());
			parents_with_el.forEach(function( p ){
				valid_parents.push( p );
			});
		});
		_selected = this.unique( valid_parents );
	} else {
		_selected = parents;
	}
	return this;
};

vQuery.prototype.children = function(el){

	var children = slice( _selected.children ); //
	if (el) {
		var children_with_el = [];
		var valid_children = [];
		children.forEach(function( node ){
			children_with_el = slice( node.querySelectorAll( el ) ); // query()
			children_with_el.forEach(function( p ){
				valid_children.push( p );
			});
		});
		_selected = this.unique( valid_children );
	} else {
		_selected = children;
	}
	return this;
};

vQuery.prototype.siblings = function(){
	var nodes = _selected.parentNode.children;
	var siblings = Array.prototype.filter.call(nodes, function ( child ){
		return child !== _selected;
	});
	var _selected = siblings;
	return this;
};

// is
vQuery.prototype.is = function( query ){
	// flags
	var flag = null;
	switch( query ){
		case ":empty":
			flag = (!_selected.hasChildNodes());
		break;
		// more flags...
	}
	// check query
	if( _selected && query && flag ===  null ){
		var el = selector( query );
		flag = (el === _selected);
	}
	return flag;
};

// next
vQuery.prototype.next = function(){
	return _selected.nextSibling; // .nextElementSibling
};

// prev
vQuery.prototype.prev = function(){
	return _selected.previousSibling; // .previousElementSibling
};

// filter (partial support)
vQuery.prototype.filter = function( query ){
	if( query == ":first" ){
		return ( Array.isArray(_selected) ) ? _selected[0] : _selected;
	}
	// test if element(s)
	if( isFunction( query ) ){
		var el = Array.prototype.filter.call(_selected, query);
		_selected = el; // update selected?
	}
	return this;
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

var isElement = function( el ){
	return el instanceof Element || el[0] instanceof Element;
};


// return one item from the _selected stack
var getEl = function( i ){
	i = i || 0;
	// more sophisticated logic here?
	return _selected[i] || _selected;
};

// find an element in the dom
var findEl = function( element ){
 return isElement(element) ? element : document.querySelectorAll( element)[0];
};

var slice = function( nodes ){
	return Array.prototype.slice.call( nodes );
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

// Types

var isArray = function( value ){
	return Array.isArray( value );
};

var isFunction = function( fn ){
	return (fn instanceof Function);
};

var isObject = function( value ){
	return value && typeof value === 'object' && value.constructor === Object;
};

var isString = function( value ){
	return typeof value === 'string' || value instanceof String;
};


	window.vQuery = new vQuery();
	// condition the attachment to the $
	window.$ = window.vQuery;

})(this.window, this.document);
