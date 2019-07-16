

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

var isFunction = function( fn ){
	return (fn instanceof Function);
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

var isString = function( value ){
	return typeof value === 'string' || value instanceof String;
};

var isObject = function( value ){
	return value && typeof value === 'object' && value.constructor === Object;
};
