function active(linkActive){
    $("ul.nav a").each(function(){
        if(this == linkActive)
            $(this).addClass("active");
        else 
            $(this).removeClass("active");
    });
}
/* ************************************************************************************/
function html_marcas(data){
    var tipos ='';
    $.each(data.tipos, function(i,v){
        if(data.activo == v.id)
            tipos += '<a href="marcas&tipo='+v.id+'" class="json_tipo active">'+v.descripcion+'</a> ';
        else
            tipos += '<a href="marcas&tipo='+v.id+'" class="json_tipo">'+v.descripcion+'</a> ';
    });
    var cabecera = $("<h1>Ubicaciones</h1> "+
                        "<div class='tipos'>"+tipos+"</div>"+
                        "<div class='menu'><a rev='800,600,top,true,iframe' title='Nueva Ubicacion' class='nwin nuevo' href='accion.php?name=marcas&opcion=nuevaMarca'>nuevo</a></div>"+
                        "<table width='100%' cellspacing='0' cellpadding='0' id='marcas_"+data.activo+"'>" +
                        "<thead><tr class='head'><th>Nombre</th><th>Latitud</th><th>Longitud</th><th>Acciones</th></tr></thead>"+
                        "<tbody></tbody>"+
                        "</table>");
    $("#contenedor").html(cabecera);  
    if(data.marcas.length>0){
        $.each(data.marcas, function(i,v){
            $("#contenedor tbody").append("<tr id='id_"+ v.id +"'>"+
                                "<td>" + v.nombre +"</td>"+
                                "<td>" + v.lat + "</td>"+
                                "<td>" + v.lng + "</td><td style='text-align:center'>"+
                                "<a id='ver"+v.id+"'class='nwin ver' title='Ver Ubicacion' rev='700,520,center,false,iframe' href='accion.php?name=marcas&opcion=verMarca&id=" + v.id+"'>&nbsp;</a>"+
                                "<a id='edit"+v.id+"'class='nwin editar' title='Editar Ubicacion' rev='800,600,top,true,iframe' href='accion.php?name=marcas&opcion=editarMarca&id="+ v.id+"'>&nbsp;</a>"+
                                "<a id='delet"+v.id+"'class='nwin eliminar' title='Eliminar Ubicacion' rev='360,230,center,true,iframe' href='accion.php?name=marcas&opcion=eliminarMarca&id="+v.id+"'>&nbsp;</a>"+
                                "</td></tr>");
        });
    }else $("#contenedor tbody").append("<tr class='tr5'><td colspan='6'><b>Aun no hay Ubicaciones registrados.</b></td></tr>");
    $("#contenedor").show("fast");
    propiedadesTabla(data.marcas.length, "#marcas_"+data.activo);

    $(".cargando").hide("fast").remove();
    $(".nuevo").button();
    $("a.json_tipo").click(function(e){
        e.preventDefault();
        $("<span class=\"cargando\"> Cargando...</span>").appendTo("#content").show("fast");
        $('#contenedor').hide();

        $.getJSON("accion.php?name=" + $(this).attr('href'), {}, html_marcas);
    });
}
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
function html_options(data){
    var cabecera = $(
                        "<div style='overflow:hidden'><div style='width:48%; float:left;margin-right:30px'><h2>Templates Ubicaciones</h2>"+
                        "<div class='menu'><a rev='550,530,center,true,iframe' title='Nuevo Template' class='nwin nuevo' href='accion.php?name=options&opcion=nuevoTemplate'>nuevo</a></div>"+
                        "<table width='100%' cellspacing='0' cellpadding='0' id='templates'>" +
                        "<thead><tr class='head'><th>id</th><th>Nombre</th><th style='width: 25px !important;'>&nbsp;</th></tr></thead>"+
                        "<tbody></tbody></table></div>"+                        
                        "<div style='width:48%; float:left'><h2>Grupos</h2>"+
                        "<div class='menu'><a rev='400,300,center,true,iframe' title='Nueva Grupo' class='nwin nuevo' href='accion.php?name=options&opcion=nuevoGrupo'>nuevo</a></div>"+
                        "<table width='100%' cellspacing='0' cellpadding='0' id='grupos'>" +
                        "<thead><tr class='head'><th>id</th><th>Nombre</th><th style='width: 25px !important;'>&nbsp;</th></tr></thead>"+
                        "<tbody></tbody></table></div>"+
                        "<div style='width:48%; clear:left;margin-right:15px'><h2>Tipos de Marcas</h2>"+
                        "<div class='menu'><a rev='400,250,center,true,iframe' title='Nuevo Tipo' class='nwin nuevo' href='accion.php?name=options&opcion=nuevoTipo'>nuevo</a></div>"+
                        "<table width='100%' cellspacing='0' cellpadding='0' id='tipos'>" +
                        "<thead><tr class='head'><th>id</th><th>Nombre</th><th>Icono</th><th style='width: 25px !important;'>&nbsp;</th></tr></thead>"+
                        "<tbody></tbody>"+
                        "</table></div></div>");
    $("#contenedor").html(cabecera); 

    //tabla grupos
    if(data.grupos.length>0){
        $.each(data.grupos, function(i,v){
            $("#grupos tbody").append("<tr id='grupos_"+ v.id +"' style='height:25px'>"+
                                "<td>" + v.id +"</td>"+
                                "<td>" + v.nombre + "</td><td>"+
                                "<a id='edit"+v.id+"'class='nwin editar' title='Editar Grupo' rev='400,300,center,true,iframe' href='accion.php?name=options&opcion=editarGrupo&id="+ v.id+"'>&nbsp;</a>"+
                                "<a id='delet"+v.id+"'class='nwin eliminar' title='Eliminar Grupo' rev='400,230,center,true,iframe' href='accion.php?name=options&opcion=eliminarGrupo&id="+v.id+"'>&nbsp;</a>"+
                                "</td></tr>");
        });
    }else $("#grupos tbody").append("<tr class='tr5'><td colspan='3'><b>Aun no hay Grupos cargados.</b></td></tr>");

    //tabla Templates 
    if(data.templates.length>0){
        $.each(data.templates, function(i,v){
            $("#templates tbody").append("<tr id='id_"+ v.id +"'>"+
                                "<td>" + v.id +"</td>"+
                                "<td>" + v.nombre + "</td><td style='width: 35px !important;'>"+
                                "<a id='ver"+v.id+"'class='nwin ver' title='Ver Template' rev='550,530,center,false,iframe' href='accion.php?name=options&opcion=verTemplate&id=" + v.id+"'>&nbsp;</a>"+
                                "<a id='edit"+v.id+"'class='nwin editar' title='Editar Template' rev='550,530,center,true,iframe' href='accion.php?name=options&opcion=editarTemplate&id="+ v.id+"'>&nbsp;</a>"+
                                "<a id='delet"+v.id+"'class='nwin eliminar' title='Eliminar Template' rev='360,230,center,true,iframe' href='accion.php?name=options&opcion=eliminarTemplate&id="+v.id+"'>&nbsp;</a>"+
                                "</td></tr>");
        });
    }else $("#templates tbody").append("<tr class='tr5'><td colspan='6'><b>Aun no hay templates cargados.</b></td></tr>");

    //tabla tipos
    if(data.tipos.length>0){
        $.each(data.tipos, function(i,v){
            $("#tipos tbody").append("<tr id='tipos_"+ v.id +"'>"+
                                "<td>" + v.id +"</td>"+
                                "<td>" + v.descripcion + "</td>"+
                                "<td><img src='images/gmap/" + v.icono + "' style='height:20px'/></td><td>"+
                                "<a id='edit"+v.id+"'class='nwin editar' title='Editar Tipo' rev='400,270,center,true,iframe' href='accion.php?name=options&opcion=editarTipo&id="+ v.id+"'>&nbsp;</a>"+
                                "<a id='delet"+v.id+"'class='nwin eliminar' title='Eliminar Tipo' rev='400,230,center,true,iframe' href='accion.php?name=options&opcion=eliminarTipo&id="+v.id+"'>&nbsp;</a>"+
                                "</td></tr>");
        });
    }else $("#tipos tbody").append("<tr class='tr5'><td colspan='4'><b>Aun no hay tipos de marca cargados.</b></td></tr>");
    
    

    $("#contenedor").show("fast");
    propiedadesTabla(data.grupos.length, "#templates");
    propiedadesTabla(data.grupos.length, "#grupos");
    propiedadesTabla(data.tipos.length, "#tipos");
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


function ajaxFileUpload(){

    var button = $('#upload_button'), archivo;
    var isSubido = false;

    new AjaxUpload('#upload_button', {
        action: 'accion.php?name=importar&opcion=subirProcesar',
        onSubmit : function(file , ext){
            button.text('Subiendo...');
            this.disable();
        },
        onComplete: function(file, response){
            $('#uploader').html(response);
            archivo = file;
            isSubido = true;
        }   
    });    

    $('.importar_procesar').click(function(){
        if(isSubido){
            var idTipo = $('#idTipo').val();
            var idGrupo = $('#idGrupo').val();
            var tipoArchivo = $('#tipoArchivo').val();
            $.ajax({
                type: "GET",
                url: "accion.php",
                data: "name=importar&opcion=procesarArchivo&idTipo="+idTipo+"&idGrupo="+idGrupo+"&tipoArchivo="+tipoArchivo+"&archivo="+archivo,
                dataType: "html",
                beforeSend: function(){
                    $("<span class=\"cargando\"> Cargando...</span>").appendTo("#importar_csv").show("fast");
                }, 
                complete: function(){ $(".cargando").hide("fast").remove();},
                success: function(html){
                    $("#importar_csv").html(html);
                    $("#importar_csv").show("fold");       
                }
            });
        }
    });
}