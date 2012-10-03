$(document).on("ready", function(){
    $("#extra").htmlarea({
        toolbar: [
            ["html"],["bold", "italic", "underline", "|", "forecolor"],
            ['orderedlist', 'unorderedlist'],['indent','outdent'],
            ["p", "h2", "h3", "h4"],['justifyleft','justifycenter','justifyright'],
            ["link", "unlink", "|", "image"]

        ],
        loaded: function() {
            //
        }

    });

    $('#template').change(function(){
        if($(this).val() != ''){
            var html = $("#tpl_"+$(this).val()).html(); 

            $('#extra').val(html).htmlarea('updateHtmlArea');
        }
    });
});