
// attr - set attribute value
// Example: $( selector ).attr( key, value );
vQuery.prototype.attr = function(key, value){
	_selected.setAttribute(key, value);
	return this;
};

// Classes

// addClass
vQuery.prototype.addClass = function(names){
	// check if string?
	var classes = names.split(' ');
	for( var name in classes ){
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
	for( var name in classes ){
		_selected.classList.toggle(name);
	}
	return this;
};
