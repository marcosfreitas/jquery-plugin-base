 /*!
 * jQuery PLugin Base v1.0
 * https://github.com/marcosfreitas/jquery-plugin-base/
 *
 * Copyright 2015, 2016 Marcos Freitas
 * Released under the MIT license
 */

;(function($) {
	'use strict'; // ecma script 5

	// the __function is a method or event's name
	$.fn.MyPlugin = function (__function, options) {

		// default properties
		var __default = {
			'name' : 'marcos',
			'lastname' : 'freitas',
			'yearold' : 25
		},

		// merging new properties to default
		config = $.extend({}, __default, options),

		methods = {

			init : function (param, param2) {
				console.info(param);
				console.info(param2);
			},

			b : function (param) {
				console.warn(param);
			},

			c : function (param) {
				console.error(param);
			}

		},

		events = {
			d : function (param) {
				console.log('--' + param)
			},
			onClick: function() {},
			onHover: function() {},
			onLoad: function() {}
		};

	   // call the methods or events
	   var arr_options = Array();

	    if (typeof options !== 'undefined') {
	    	try {
			// Array.prototype.slice não funciona até o IE 8 e no chrome 14
		        // http://stackoverflow.com/questions/7056925/how-does-array-prototype-slice-call-work
		        // se não for um array ele vai separar a string em letras
		        // para passar corretamente parâmetros para os métodos ou funçõesé preciso que opções seja um array,
		        // ou um array-like (um objeto com índices numéricos e uma propriedade 'length')
		        // repassa todos os elementos do array, mas depende de quantos a função está esperando receber
		        arr_options = Array.prototype.slice.call(opcoes, 0);
		} catch(err){
		        // slow but works on IE
		            arr_options = [];
		        var length = options.length;
		        for(var o=0; o < length; o++){
		            arr_options.push(options[o]);
		        }
		    }
	    }

	    // the functions at methods and events can be "returned" calling methods['onload'] by example
	    if ( methods[__function] ) {
		// the apply() method call the function with a value (this) and arguments provided like an array (or a object "array-like").
		return methods[__function].apply( this, arr_options);
	    }
	    else if ( events[__function] ) {
	    	return events[__function].apply( this, arr_options);
	    }
	    // don't found anything, method or event, with that name (__func)
	    // so call the init method passing the options if this is a object
	    else if ( typeof options === 'object' ) {
	    	return methods.init.apply( this, options );
	    }
	    // finaly call the method init passing the selector object jquery or not
	    else if ( typeof __function === 'undefined' && typeof options === 'undefined' ) {
	    	 // if only the plugin is for the type $.fn 
	    	 return methods.init(this);
	    	 //return methods.init();
	    }
	    else {
	    	$.error( 'The method or event "' +  nome_funcao + '" don not exists on MyPLugin.js' );
	    }

	};

})(jQuery);
