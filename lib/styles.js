// show
vQuery.prototype.show = function(){
	_selected.style.display = '';
	return this;
};

// hide
vQuery.prototype.hide = function(){
	_selected.style.display = 'none';
	return this;
};

// css
vQuery.prototype.css = function(key, value){
	_selected.style[ camelCase(key) ] = value;
	return this;
};
