// append
vQuery.prototype.append = function( el ){
	_selected.append( el );
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


// clone
vQuery.prototype.clone = function( callback ){
	return _selected.cloneNode(true);
};

// empty
vQuery.prototype.empty = function( callback ){
	while(_selected.firstChild){ _selected.removeChild(_selected.firstChild); }
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


// String manipulation

vQuery.prototype.trim = function( str ){
	if( !isString(str) ) return false;
	return str.trim();
};
