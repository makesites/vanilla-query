
vQuery.prototype.val = function( value ){
	if( isString(value) ){
		if( isArray(_selected) ){
			_selected.forEach(function(i){
				i.value = value;
			});
		} else {
			_selected.value = value;
		}
		return this;
	} else {
		return _selected.value || 0;
	}
};
