function active(linkActive){
    $("nav a").each(function(){
        if(this == linkActive)
            $(this).addClass("active");
        else 
            $(this).removeClass("active");
    });
}
/* ************************************************************************************/

function html_articulos(data){
    var menu = $('<li><a href="accion.php?name=articulos&opcion=nuevoArticulo" class="nwin" id="nuevoArticulo" title="Nuevo Articulo" rev="700,400,center,true,iframe">Nuevo Articulo</a></li>');
    $("nav.sub ul").html(menu);
    var cabecera = $("<h1>Articulos</h1> "+
                        "<table width='100%' cellspacing='0' cellpadding='0' id='users'>" +
                        "<thead><tr><th>id</th><th>Codigo</th><th>Nombre</th><th>Stock</th><th></th></tr></thead>"+
                        "<tbody></tbody>"+
                        "</table>");
    $("#contenedor").html(cabecera);  
    if(data.length>0){
        $.each(data, function(i,v){
            $("#contenedor tbody").append("<tr id='id_"+ v.id +"'>"+
                                "<td>" + v.id +"</td>"+
                                "<td>" + v.codigo + "</td>"+
                                "<td>" + v.nombre + "</td>"+
                                "<td>" + v.disponible + "</td><td style='width: 35px !important;'>"+
                                "<a id='edit"+v.id+"'class='nwin editar' title='Editar Articulo' rev='700,400,center,true,iframe' href='accion.php?name=articulos&opcion=editarArticulo&id="+ v.id+"'>Editar</a> | "+
                                "<a id='delet"+v.id+"'class='nwin eliminar' title='Eliminar Articulo' rev='360,230,center,true,iframe' href='accion.php?name=articulos&opcion=eliminarArticulo&id="+v.id+"'>Eliminar</a>"+
                                "</td></tr>");
        });
    }else $("#contenedor tbody").append("<tr class='tr5'><td colspan='6'><b>Aun no hay Articulos cargados.</b></td></tr>");
    $("#contenedor").show("fast");
    $("nav.sub ul").show("fast");
    propiedadesTabla(data.length, "#users");
    $(".nuevo").button();
    $(".cargando").hide("fast").remove();
}

function html_clientes(data){
    var menu = $('<li><a href="accion.php?name=clientes&opcion=nuevoCliente" class="nwin" id="nuevoCliente" title="Nuevo Cliente" rev="700,400,center,true,iframe">Nuevo Cliente</a></li>');
    $("nav.sub ul").html(menu);
    var cabecera = $("<h1>Clientes</h1> "+
                        "<table width='100%' cellspacing='0' cellpadding='0' id='users'>" +
                        "<thead><tr><th>id</th><th>Codigo</th><th>Nombre</th><th>Stock</th><th></th></tr></thead>"+
                        "<tbody></tbody>"+
                        "</table>");
    $("#contenedor").html(cabecera);  
    if(data.length>0){
        $.each(data, function(i,v){
            $("#contenedor tbody").append("<tr id='id_"+ v.id +"'>"+
                                "<td>" + v.id +"</td>"+
                                "<td>" + v.nombre + "</td>"+
                                "<td>" + v.direccion + "</td>"+
                                "<td>" + v.telefono + "</td>"+
                                "<td>" + v.celular + "</td>"+
                                "<td>" + v.provincia + "</td>"+
                                "<td>" + v.localidad + "</td>"+
                                "<td>" + v.cuit + "</td>"+
                                "<a id='edit"+v.id+"'class='nwin editar' title='Editar Cliente' rev='700,400,center,true,iframe' href='accion.php?name=clientes&opcion=editarCliente&id="+ v.id+"'>Editar</a> | "+
                                "<a id='delet"+v.id+"'class='nwin eliminar' title='Eliminar Cliente' rev='360,230,center,true,iframe' href='accion.php?name=clientes&opcion=eliminarCliente&id="+v.id+"'>Eliminar</a>"+
                                "</td></tr>");
        });
    }else $("#contenedor tbody").append("<tr class='tr5'><td colspan='6'><b>Aun no hay Clientes cargados.</b></td></tr>");
    $("#contenedor").show("fast");
    $("nav.sub ul").show("fast");
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
	
    $("nav a").click(function(){
       active(this); 
    });
    $("a.json_request").click(function(e){
        e.preventDefault();
        $("<span class=\"cargando\"> Cargando...</span>").appendTo("#content").show("fast");
        $('#contenedor').hide();
        $('nav.sub ul').hide();
        funcion = "html_"+$(this).attr("href");
        $.getJSON("accion.php?name=" + $(this).attr('href'), {}, eval(funcion)); 
    });
    $("a.ajax_request").click(function(e){
        e.preventDefault();
        $('#contenedor').hide();
        $('nav.sub ul').hide();
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

    $("nav ul li:first-child a").trigger('click');

          
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