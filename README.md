# jQuery plugin base

Contains the basic structure for build a jQuery plugin. The internal methods and events accept parameters from the plugin instance.
The internal functions only accepts arguments if they be a Array or a Array-like Object (Array-like objects look like arrays. They have various numbered elements and a length property.) 


## Examples

The instance: 
> $.MyPLugin('do_not_exists', {'name':'marcos freitas'});

the 'init' method will be called when a method or event not found and will try print the params:
The output: 
> undefined

> $.MyPlugin('init', {'0':'marcos', '1':'freitas', length:2});

will call the 'init' method and they will output the 2 first params. This only works because this argument is a array-like object.

> $.MyPlugin('b', Array('jesus', 'cristo')); 

will found the method 'b' and output only 'jesus' because the scope of 'b' function declares only 1 parameter.

