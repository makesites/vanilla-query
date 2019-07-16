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

vQuery.prototype.parents = function( el ){
	var parent = _selected.parentNode;
	var parents = [];
	//
	while( parent ){
		parents.unshift(parent);
		parent = parent.parentNode;
	}
	if( el ){
		var parents_with_el = [];
		var valid_parents = [];
		parents.forEach(function( node ){
			parents_with_el = slice( node.querySelectorAll( el ) ); // query());
			parents_with_el.forEach(function( p ){
				valid_parents.push( p );
			});
		});
		_selected = this.unique( valid_parents );
	} else {
		_selected = parents;
	}
	return this;
};

vQuery.prototype.children = function(el){

	var children = slice( _selected.children ); //
	if (el) {
		var children_with_el = [];
		var valid_children = [];
		children.forEach(function( node ){
			children_with_el = slice( node.querySelectorAll( el ) ); // query()
			children_with_el.forEach(function( p ){
				valid_children.push( p );
			});
		});
		_selected = this.unique( valid_children );
	} else {
		_selected = children;
	}
	return this;
};

// is
vQuery.prototype.is = function( query ){
	// flags
	var flag = null;
	switch( query ){
		case ":empty":
			flag = (!_selected.hasChildNodes());
		break;
		// more flags...
	}
	// check query
	if( _selected && query && flag ===  null ){
		var el = selector( query );
		flag = (el === _selected);
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
