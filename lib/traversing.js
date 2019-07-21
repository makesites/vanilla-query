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

vQuery.prototype.find = function(query){
	if( !isElement(query) ){
		if( query.indexOf(',') > -1 ){
			var _query = query.split(',');
			var nodes = [];
			_query.forEach(function(i){
				var subset = [];
				if(nodes.length){
					nodes.forEach(function( node ){
						subset = selector(i, node);
						subset.forEach(function(m){
							nodes.push(m);
						});
					});
				} else {
					subset = selector(i, _selected);
					subset.forEach(function(n){
						nodes.push(n);
					});
				}
			});
			_selected = nodes;
		} else {
			_selected = selector(query, _selected);
		}
	} else {
		// replace selected
		_selected = query;
	}
	return this;
};

vQuery.prototype.get = function(i){
	return ( isArray(_selected) ) ? _selected[i] : null;
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

vQuery.prototype.siblings = function(){
	var nodes = _selected.parentNode.children;
	var siblings = Array.prototype.filter.call(nodes, function ( child ){
		return child !== _selected;
	});
	var _selected = siblings;
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
vQuery.prototype.filter = function( query ){
	if( query == ":first" ){
		return ( Array.isArray(_selected) ) ? _selected[0] : _selected;
	}
	// test if element(s)
	if( isFunction( query ) ){
		var el = Array.prototype.filter.call(_selected, query);
		_selected = el; // update selected?
	}
	return this;
};
