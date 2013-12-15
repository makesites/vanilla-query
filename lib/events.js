// jQuery
vQuery.prototype.ready = function( callback ){
	// special condition for Chrome
	//window.addEventListener('DOMFocusIn', callback, false);
	document.addEventListener('DOMContentLoaded', callback, false);
};

// click
vQuery.prototype.click = function( callback ){
	var el = _selected;
	el.addEventListener('click', callback);
	return el;
};
