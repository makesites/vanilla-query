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
