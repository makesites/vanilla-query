

vQuery.prototype.type = function( el ){
	el = el || _selected;
	return Object.prototype.toString.call( el ).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
};
