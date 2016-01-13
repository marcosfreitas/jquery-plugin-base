 /*!
 * jQuery PLugin Base v1.2
 * https://github.com/marcosfreitas/jquery-plugin-base/
 *
 * Copyright 2015, 2016 Marcos Freitas
 * Released under the MIT license
 */

;(function($) {
	'use strict'; // ecma script 5

	// the __function is a method or event's name
	$.MyPlugin = function (__function, options) {

		/*! default properties */
		
		var __default = {
			'name' : 'marcos',
			'lastname' : 'freitas',
			'yearold' : 25
		},

		// merging new properties to default
		config = $.extend({}, __default, options),

		/*! private properties */

		priv = {
			'ajax' : {
				'interval_requests' : 3000,
				'method' : 'GET'
			}
		},

		/*! global vars */
		
		// a counter used on private.recursive
		recursive_cron = 0,
		// an object to store the values on global way like:  database.user = {name="marcos"}
		database = {},

		

		/*! private methods, they can't be calling from instances */
		privates = {

			// call the function recursively until the limit and turn to success or error of requests
			recursive : function (callback) {
				
				
				if (priv.ajax.interval_requests/1000 <= 15) {
					console.warn('waiting '+priv.ajax.interval_requests+' seconds...');
					recursive_cron = 
						setInterval(function() {

							priv.ajax.interval_requests += 3000;
							clearInterval(recursive_cron);
							// call the function passed
							callback();

						}, priv.ajax.interval_requests)
					;
				} else {
					priv.ajax.interval_requests = 3000;
					clearInterval(recursive_cron);
					return false ;
				}


				return true;
			},

			// make all the ajax request and return a promise
			// jsonp_callback is optional, he define the cross-domain and o dataType as jsonp
			get : function (url, jsonp_callback) {

				try {

					var o = {};

					// request's parameters
					o.cache  = false;
					o.timeout = 10000;
					o.url    = url;
					o.method = priv.ajax.method;

					if (typeof jsonp_callback !== 'undefined') {
						o.crossDomain = true;
						o.jsonpCallback = jsonp_callback;
						o.dataType      = 'jsonp';
					} else {
						o.dataType = 'json';
					}
					return $.ajax(o);

				} catch (e) {
					console.error('I couldn\'t do this...');
				}
			},
		},

		methods = {

			init : function (param) {
				console.log(param);			
			},

			b : function (param, param2) {
				console.log(param, param2);
			},

			/*! a example for a method what do a request to a api */
			fake : function(url) {
				
				if (typeof url === 'undefined') {
					url = 'http://www.mocky.io/v2/56969c1125000012061affbb';
				}

				var _fake = privates.get(url);

				// Promises running after _fake respond
				$.when(_fake).then(
					// the number of parameters to this function is in accord with number of variables (requests) previously defined like '_fake'
					// will receive a json
					function __resultado(json) {
						// here is the code executed on .done() of $.ajax()
						if (typeof json === 'object') {

							console.info(json);
							events.onLoad();

						} else {
							// calling recursively, after many attempts trigger a error
							if (!privates.recursive(methods.fake)) {
								$.error('The request has been failed')
							}
						}

						// here put what you need to now...

					},
					// trigger error because the request has been failed
					function __erro(e) {
						$.error(e);
					}
				);
			}
		},

		events = {
			// you can organizze this like you want
			onClick: function() {},
			onHover: function() {},
			onLoad: function() { console.log('this don\'t represent the "on load" of the browser, but the load after any task what you has been defined, like a ajax request...') }
		};



		/*! Modify this only if you understand, be careful */
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
	    	$.error( 'The method or event "' +  __func + '" don not exists on MyPLugin.js' );
	    }

	};

})(jQuery);
