function active(linkActive){
    $("ul.nav a").each(function(){
        if(this == linkActive)
            $(this).addClass("active");
        else 
            $(this).removeClass("active");
    });
}
/* ************************************************************************************/

function html_users(data){
    var cabecera = $("<h1>Usuarios</h1> "+
                        "<div class='menu'><a rev='700,400,center,true,iframe' title='Nuevo Usuario' class='nwin nuevo' href='accion.php?name=users&opcion=nuevoUser'>nuevo</a></div>"+
                        "<table width='100%' cellspacing='0' cellpadding='0' id='users'>" +
                        "<thead><tr class='head'><th>id</th><th>Nombre</th><th>username</th><th>Email</th><th></th></tr></thead>"+
                        "<tbody></tbody>"+
                        "</table>");
    $("#contenedor").html(cabecera);  
    if(data.length>0){
        $.each(data, function(i,v){
            $("#contenedor tbody").append("<tr id='id_"+ v.id +"'>"+
                                "<td>" + v.id +"</td>"+
                                "<td>" + v.nombre + "</td>"+
                                "<td>" + v.user + "</td>"+
                                "<td>" + v.email + "</td><td style='width: 35px !important;'>"+
                                "<a id='ver"+v.id+"'class='nwin ver' title='Ver Usuario' rev='700,400,center,false,iframe' href='accion.php?name=users&opcion=verUser&id=" + v.id+"'>&nbsp;</a>"+
                                "<a id='edit"+v.id+"'class='nwin editar' title='Editar Usuario' rev='700,400,center,true,iframe' href='accion.php?name=users&opcion=editarUser&id="+ v.id+"'>&nbsp;</a>"+
                                "<a id='delet"+v.id+"'class='nwin eliminar' title='Eliminar Usuario' rev='360,230,center,true,iframe' href='accion.php?name=users&opcion=eliminarUser&id="+v.id+"'>&nbsp;</a>"+
                                "</td></tr>");
        });
    }else $("#contenedor tbody").append("<tr class='tr5'><td colspan='6'><b>Aun no hay Usuarios cargados.</b></td></tr>");
    $("#contenedor").show("fast");
    propiedadesTabla(data.length, "#users");
    $(".nuevo").button();
    $(".cargando").hide("fast").remove();
}


function propiedadesTabla(num, tabla){
    if(num>0){
        $(tabla).dataTable({
            "bJQueryUI": true,
            "iDisplayLength": 18,
            //"sPaginationType": "full_numbers",
            "oLanguage": {
                "sLengthMenu": "_MENU_ por pagina",
                "sZeroRecords": "Nothing found - sorry",
                "sInfo": "Mostrando _START_ a _END_ de _TOTAL_",
                "sInfoEmpty": "Mostrando 0 a 0 de 0",
                "sInfoFiltered": "(filtered from _MAX_ total records)"
            }
        });
    }    
}

$(document).ready(function(){   
	
    $("ul.nav a").click(function(){
       active(this); 
    });
    $("a.json_request").click(function(e){
        e.preventDefault();
        $("<span class=\"cargando\"> Cargando...</span>").appendTo("#content").show("fast");
        $('#contenedor').hide();
        funcion = "html_"+$(this).attr("href");
        $.getJSON("accion.php?name=" + $(this).attr('href'), {}, eval(funcion)); 
    });
    $("a.ajax_request").click(function(e){
        e.preventDefault();
        $('#contenedor').hide();
        $.ajax({
            type: "GET",
            url: "accion.php?name="+$(this).attr('href'),
            dataType: "html",
            beforeSend: function(){
                $("<span class=\"cargando\"> Cargando...</span>").appendTo("#content").show("fast");
            }, 
            complete: function(){ $(".cargando").hide("fast").remove();},
            success: function(html){
                $("#contenedor").html(html);
                $("#contenedor").show("fold"); 
                if ($("#importar_csv").length) ajaxFileUpload();
                if ($("#mapa").length) mapa();
                $(".chzn-select").chosen({allow_single_deselect:true});
            }
        });
    });
    $("#preload").hide().remove();

    $("ul.nav li:first-child a").trigger('click');

          
    $('#contenedor tr').live('click', function () { 
        if(!$(this).hasClass("selected"))
            $(this).addClass("selected");
        else
            $(this).removeClass("selected");
    });

    $('#contenedor tr').live('hover', function () { 
        if(!$(this).hasClass("hover"))
            $(this).addClass("hover");
        else
            $(this).removeClass("hover");
    });
    winModal();
});