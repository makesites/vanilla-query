
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

//

vQuery.prototype.text = function( text ){
	text = text || "";
	var output = [];
	if( isArray(_selected) ){
		_selected.forEach(function( el ){
			if( !text ){
				output.push( el.textContent );
			} else {
				el.textContent = text;
			}
		});
	} else {
		var el = _selected;
		if( !text ){
			output.push( el.textContent );
		} else {
			el.textContent = text;
		}
	}
	return contents ? this : output;
};
