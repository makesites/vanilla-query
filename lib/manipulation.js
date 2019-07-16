
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


// String manipulation

vQuery.prototype.trim = function( str ){
	if( !isString(str) ) return false;
	return str.trim();
};
