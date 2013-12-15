
// attr - set attribute value
// Example: $( selector ).attr( key, value );
vQuery.prototype.attr = function(key, value){
	_selected.setAttribute(key, value);
	return this;
};

// Classes

// addClass
vQuery.prototype.addClass = function(name){
	_selected.classList.add(name);
	return this;
};

// toggleClass
vQuery.prototype.toggleClass = function(name){
	_selected.classList.toggle(name);
	return this;
};
