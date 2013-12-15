// each
// Example: $("a").each(function( el ){ });
vQuery.prototype.each = function( callback ){
	[].forEach.call(_selected, callback );
};

// parent
vQuery.prototype.parent = function( query ){
	return _selected.parentNode;
};

// is
vQuery.prototype.is = function( query ){

	switch( query ){
		case ":empty":
			return (!_selected.hasChildNodes());
		break;

	}
};

// next
vQuery.prototype.next = function(){
	return _selected.nextSibling;
};
