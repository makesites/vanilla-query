
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
		  el.parentNode.insertBefore(i, node.parentNode.firstChild);
		});
	} else {
		var el = _selected;
		el.parentNode.insertBefore(i, node.parentNode.firstChild);
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
		  el.parentNode.insertBefore(i, node.parentNode.nextSibling);
		});
	} else {
		var el = _selected;
		el.parentNode.insertBefore(i, node.parentNode.nextSibling);
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
