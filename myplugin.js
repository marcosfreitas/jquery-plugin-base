 /*!
 * jQuery PLugin Base v1.0
 * https://github.com/marcosfreitas/jquery-plugin-base/
 *
 * Copyright 2015, 2016 Marcos Freitas
 * Released under the MIT license
 */

;(function($) {
	'use strict'; // ecma script 5

	$.MyPlugin = function (nome_funcao, opcoes) {

		// objetos padrões
		var padrao = {
			'nome' : 'marcos',
			'sobrenome' : 'freitas',
			'idade' : 25
		},

		// mesclando opções aos valores padrão
		config = $.extend({}, padrao, opcoes),

		metodos = {

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

		eventos = {
			d : function (param) {
				console.log('--' + param)
			}
		};

		
		if (opcoes !== undefined && opcoes !== 'undefined') {

	    	try{
				// Array.prototype.slice não funciona até o IE 8 e no chrome 14
		        // http://stackoverflow.com/questions/7056925/how-does-array-prototype-slice-call-work
		        // se não for um array ele vai separar a string em letras
		        // para passar corretamente parâmetros para os métodos ou funçõesé preciso que opções seja um array,
		        // ou um array-like (um objeto com índices numéricos e uma propriedade 'length')
		        // repassa todos os elementos do array, mas depende de quantos a função está esperando receber
		        var array_argumentos = Array.prototype.slice.call(opcoes, 0);

		    } catch(err){

		        // lento mas funciona no IE
		        var array_argumentos = [],
		            length = opcoes.length;

		        for(var o=0; o < length; o++){
		            array_argumentos.push(opcoes[o]);
		        }
		    }
		};

		// as funções dos objetos de métodos e eventos podem ser retornadas com metodo['nome_metodo'] por exemplo
		if ( metodos[nome_funcao] ) {
			// O método apply() chama uma função com um dado valor this e arguments providos como array (ou um objeto array-like ).
			return metodos[nome_funcao].apply( this, array_argumentos);
	    }
	    else if ( eventos[nome_funcao] ) {
	    	return eventos[nome_funcao].apply( this, array_argumentos);
	    }
	    // não achou nenhum método e evento com o nome daquela função
	    // chama o método init passando opcoes se for um objeto
	    else if ( typeof opcoes === 'object' ) {
	    	return metodos.init.apply( this, opcoes );
	    }
	    // chama o método init passando o objeto jquery seletor
	    else if ( !opcoes ) {
	    	return metodos.init();
	    	// somente se a função do plugin for do do tipo $.fn 
	    	// return metodos.init(this);
	    }
	    else {
	    	$.error( 'O Metodo ou Evento "' +  opcoes + '" nao existe em guia.min.js' );
	    }

	};

})(jQuery);
