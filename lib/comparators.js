

vQuery.prototype.type = function( el ){
	el = el || _selected;
	return Object.prototype.toString.call( el ).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
};

vQuery.prototype.isEmptyObject = function(){
	if( !_selected ) return;
	return !_selected.hasChildNodes();
};

vQuery.prototype.isFunction = function( value ){
	return isFunction( value );
};

vQuery.prototype.isArray = function( value ){
	return isArray( value );
};

// Elements
vQuery.prototype.contains = function( el ){
	// check for a match
	return _selected.textContent.indexOf( el ) > -1;
};
