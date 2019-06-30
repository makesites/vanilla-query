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
