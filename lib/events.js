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
	if( Array.isArray(_selected) && callback ){
		[].forEach.call(_selected, function(el) {
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
