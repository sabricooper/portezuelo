function winModal(){
    $("a.nwin").live('click', function(event){
        event.preventDefault();
        var vars = $(this).attr("rev").split(",");
        var item = {
            id: "win"+$(this).attr("id"),
            title: $(this).attr("title"),
            url: $(this).attr("href"),
            width: vars[0],
            height: vars[1],
            position: vars[2],
            modal: (vars[3]=="true") ? true:false

        };
        
        if(vars[4]!= 'html'){
            var modal = $("<div id='"+item.id+"' title='"+ item.title +"'>"
                    + "<iframe align='middle' width='100%' height='100%' frameborder='0' marginwidth='0' marginheight='0' id='adpiframe' name='adpiframe' "
                    + "src='"+ item.url +"'></iframe></div>");                   
            
            $("body").append(modal);
            var winModal = $("#"+item.id);
        } else {
            var winModal = $("#"+item.url);
        }


        winModal.dialog({
            autoOpen: false,
            height: item.height,
            width: item.width,
            modal: item.modal,
            draggable: item.drag,
            resizable: false,
            position: item.position,
            close: function(event, ui) { 
                $(this).dialog("destroy");
                if(vars[4]!= 'html')
                    $(this).remove();
            }
        });
        if(item.position == "item"){
            var x = $(this).position().left + $(this).outerWidth();
            var y = $(this).position().top - $(document).scrollTop();
            winModal.dialog('option', 'position', [x,y]);
        }
        winModal.dialog( "widget" ).addClass("winModalWidget");
        winModal.dialog("open");

        return false;
        //$(".winModalWidget .ui-dialog-titlebar-close").addClass("ui-dialog-close-hover");
    });
    
}
