
// attr - set attribute value
// Example: $( selector ).attr( key, value );
vQuery.prototype.attr = function(key, value){
	if( !_selected ) return this;
	var nodes = ( isElement(_selected) && !isArray(_selected) ) ? [ _selected ] : _selected;
	var output = [];
	//
	nodes.forEach(function(el){
		if( key ){
			// set attributes
			if( value && isString(value) ){
				el.setAttribute(key, value);
				output = this; // change of type...
			} else if ( isObject(key) ){
				var props = key;
				for(var p in props){
					el.setAttribute(p, props[p]);
					output = this; // change of type...
				}
			} else if( isString(key) ){
				output.push(el.attributes[key].value);
			}
		} else {
			// return attributes
			var atts = {};
			el.attributes.forEach(function( property ){
				var name = camelCase( property.name );
				atts[name] = property.value;
			});
			output.push(atts);
		}
	});

	return output;
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
