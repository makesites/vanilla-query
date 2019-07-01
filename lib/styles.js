// show
vQuery.prototype.show = function(){
	_selected.style.display = ''; // display = 'block';
	return this;
};

// hide
vQuery.prototype.hide = function(){
	_selected.style.display = 'none';
	return this;
};

// css
vQuery.prototype.css = function(key, value){
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
