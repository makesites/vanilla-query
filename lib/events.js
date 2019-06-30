// jQuery
vQuery.prototype.ready = function( callback ){
	if( callback && callback !== undefined && typeof callback === 'function' ){
		// special condition for Chrome
		//window.addEventListener('DOMFocusIn', callback, false);
		document.addEventListener('DOMContentLoaded', callback, false);
	} else {
		// output error
	}
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
