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
    propiedadesTabla(data.length, "#articulosT");
    
}

function html_clientes(data){   
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
                "<td><a id='edit"+v.id+"'class='nwin editar' title='Editar Cliente' rev='700,400,center,true,iframe' href='accion.php?name=clientes&opcion=editarCliente&id="+ v.id+"'>Editar</a> | "+
                "<a id='delet"+v.id+"'class='nwin eliminar' title='Eliminar Cliente' rev='360,230,center,true,iframe' href='accion.php?name=clientes&opcion=eliminarCliente&id="+v.id+"'>Eliminar</a>"+
                "</td></tr>");
        });
    }else $("#contenedor tbody").append("<tr class='tr5'><td colspan='6'><b>Aun no hay Clientes cargados.</b></td></tr>");
    $(".cargando").hide("fast").remove();
    propiedadesTabla(data.length, "#clientesT");
}

function html_operadores(data){   
    if(data.length>0){
        $.each(data, function(i,v){
            $("#contenedor tbody").append("<tr id='id_"+ v.id +"'>"+
                "<td>" + v.id +"</td>"+
                "<td>" + v.nombre + "</td>"+
                "<td>" + v.user + "</td>"+
                "<td><a id='edit"+v.id+"'class='nwin editar' title='Editar Operador' rev='700,400,center,true,iframe' href='accion.php?name=operadores&opcion=editarOperador&id="+ v.id+"'>Editar</a> | "+
                "<a id='delet"+v.id+"'class='nwin eliminar' title='Eliminar Operador' rev='360,230,center,true,iframe' href='accion.php?name=operadores&opcion=eliminarOperador&id="+v.id+"'>Eliminar</a>"+
                "</td></tr>");
        });
    }else $("#contenedor tbody").append("<tr class='tr5'><td colspan='6'><b>Aun no hay Clientes cargados.</b></td></tr>");
    propiedadesTabla(data.length, "#clientesT");
}

function html_facturas(data){
    if(data.length>0){
        $.each(data, function(i,v){
            $("#contenedor tbody").append("<tr id='id_"+ v.id +"'>"+
                "<td>" + v.id +"</td>"+
                "<td>" + v.cliente + "</td>"+
                "<td>" + v.fecha + "</td>"+
                "<td><a id='edit"+v.id+"'class='nwin editar' title='Editar Factura' rev='700,400,center,true,iframe' href='accion.php?name=facturas&opcion=editarFactura&id="+ v.id+"'>Editar</a> | "+
                "<td><a id='ver"+v.id+"'class='nwin ver' title='Ver Factura' rev='700,400,center,true,iframe' href='accion.php?name=facturas&opcion=VerFactura&id="+ v.id+"'>Verr</a> | "+
                "<td><a id='imprimir"+v.id+"'class='nwin imprimir' title='Imprimir Factura' rev='700,400,center,true,iframe' href='accion.php?name=facturas&opcion=ImprimirFactura&id="+ v.id+"'>Imprimir</a> | "+
                "<a id='delet"+v.id+"'class='nwin eliminar' title='Eliminar Factura rev='360,230,center,true,iframe' href='accion.php?name=facturas&opcion=eliminaFactura&id="+v.id+"'>Eliminar</a>"+
                "</td></tr>");
        });
    }else $("#contenedor tbody").append("<tr class='tr5'><td colspan='6'><b>No existen Facturas</b></td></tr>");
    propiedadesTabla(data.length, "#facturasT");
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
        $.ajax({
            type: "GET", url: "templates/html/"+funcion+".html", dataType: "html",
            success: function(template){
                var template = $(template);
                $("nav.sub ul").html($("ul.menu", template).html());
                $("#contenedor").html($("div.cuerpo", template).html());
                $("#contenedor").show("fast");
                $("nav.sub ul").show("fast");
                $(".cargando").hide("fast").remove();
            }
        });
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