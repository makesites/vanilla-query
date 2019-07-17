
// attr - set attribute value
// Example: $( selector ).attr( key, value );
vQuery.prototype.attr = function(key, value){
	_selected.setAttribute(key, value);
	return this;
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


//

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
