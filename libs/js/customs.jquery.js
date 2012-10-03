/**
 * jQuery Cookie plugins
 */
$.cookie = function (key, value, options) {
    var cookie_encode = function(string){
        var decoded = encodeURIComponent(string);
        return decoded.replace(/(%7B|%7D|%3A|%22|%23|%5B|%5D)/g,function(charater){return decodeURIComponent(charater);});
        
    }
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);
        if (value === null || value === undefined) {
            options.expires = -1;
        }
        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }
        value = String(value);
        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : cookie_encode(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};
/**
 * jQuery Custom autocomplete
 
$.ui.autocomplete.prototype._renderItem = function (ul, item) {    
    var quest = this.term.toLowerCase();
    var label = item.label.substring(0,quest.length).toLowerCase();
    var reemplazar = function(text, val){
        return text.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(val) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
    }
    if(quest == label){
        item.label = reemplazar(item.label, this.term);
        if($("li.pri",ul).length)
            return $("li.pri:last",ul).after($("<li class='pri'><a>" + item.label + "</a></li>")
            .data("item.autocomplete", item));
        else
            return $(ul).prepend($("<li class='pri'><a>" + item.label + "</a></li>")
            .data("item.autocomplete", item));
    }else{
        item.label = reemplazar(item.label,this.term);
        return $(ul).append($("<li><a>" + item.label + "</a></li>")
            .data("item.autocomplete", item));
    }
};*/