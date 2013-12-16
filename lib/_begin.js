/**
 * @name {{name}}
 * Version: {{version}} ({{build_date}})
 *
 * @author {{author}}
 * Homepage: {{homepage}}
 * @license {{#license licenses}}{{/license}}
 */

 // stop processing if $ is already part of the namespace
//if( !$ )
(function(window, document) {

var vQuery = function(){
	var self = this;
	var $ = function( query ){
		// find the el if passed a query
		selector(query);
		return self;
	};
	// copy methods from class
	for(var i in this ){
		$[i] = this[i];
	}
	return $;
};

// internal variables
var _selected = {};
