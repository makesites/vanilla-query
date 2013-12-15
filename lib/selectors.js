// internal selector method
var selector = function( query ){
	var el = null;
	// check if it's a tag
	if( isTag(query) ){
		var tag = query.substring(1, query.length-1);
		el = document.createElement( tag );
	} else if( isId(query) ){
		// check if it's an id
		var id = query.substr(1);
		el = document.getElementById( id );
	} else {
		// run a basic query
		el = document.querySelectorAll(query);
	}
	// save element(s) for chaining commands
	_selected = el;
	return this;

};
/*
$('img').filter(':first')

// Vanilla
document.querySelector('img')
*/