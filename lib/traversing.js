// each
// Example: $("a").each(function( el ){ });
vQuery.prototype.each = function( a, b ){
	// check variables
	var el, callback;
	if( typeof a == "function"){
		callback = a;
		el = getEl();
	} else {
		el = a;
		callback = ( b ) ? b : function(){};
	}
	[].forEach.call(el, callback );
	//el.forEach( callback );
};

// parent
vQuery.prototype.parent = function( query ){
	return _selected.parentNode;
};

// is
vQuery.prototype.is = function( query ){
	var flag = false;
	switch( query ){
		case ":empty":
			flag = (!_selected.hasChildNodes());
		break;
	}
	return flag;
};

// next
vQuery.prototype.next = function(){
	return _selected.nextSibling; // .nextElementSibling
};

// prev
vQuery.prototype.prev = function(){
	return _selected.previousSibling; // .previousElementSibling
};

// filter (partial support)
vQuery.prototype.filter = function(key){
	if( key == ":first" ){
		return ( Array.isArray(_selected) ) ? _selected[0] : _selected;
	}
	//...
};
