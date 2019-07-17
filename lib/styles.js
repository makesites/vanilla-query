// show
vQuery.prototype.show = function(){
	// prerequisite(s)
	if( !_selected ) return this;
	// multiple items
	if( Array.isArray(_selected) ){
		_selected.forEach(function( el ){
		  el.style.display = ''; // display = 'block
		});
	} else {
		var el = _selected;
		el.style.display = ''; // display = 'block
	}
	return this;
};

// hide
vQuery.prototype.hide = function(){
	// prerequisite(s)
	if( !_selected ) return this;
	// multiple items
	if( Array.isArray(_selected) ){
		_selected.forEach(function( el ){
		  el.style.display = 'none';
		});
	} else {
		var el = _selected;
		el.style.display = 'none';
	}
	return this;
};

// css
vQuery.prototype.css = function(key, value){
	// prerequisite(s)
	if( !isElement( _selected )  ) return this;
	//
	if( isString(key) ){
		_selected.style[ camelCase(key) ] = value;
	} else if( isObject(key) ){
		var styles = key;
		for( var k in styles ){
			var v = styles[k];
			_selected.style[ camelCase(k) ] = v;
		}
	} else {
		// return styles (check if element first?)
		return getComputedStyle( _selected );
	}
	return this;
};

vQuery.prototype.position = function(){
	if( !_selected ) return false;
	// expect one element
	return { left: _selected.offsetLeft, top: _selected.offsetTop };
};

vQuery.prototype.height = function(){
	if( !_selected ) return 0; // error log?
	var height = _selected.offsetHeight || 0;
	return height;
};

vQuery.prototype.width = function(){
	if( !_selected ) return 0; // error log?
	var width = _selected.offsetWidth || 0;
	return width;
};
