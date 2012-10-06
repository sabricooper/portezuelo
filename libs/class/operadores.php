<?php

/**
 * @author cesardluis
 * @copyright 2011
 */
class operadores{
    var $opcion;
    var $vars;
    var $mysql;
    public function __construct($vars = array()){
        $this->mysql = new MysqlDB();
        $this->vars = $vars;
        if(isset($vars['opcion']))
            $this->opcion = $vars['opcion'];
        else
            $this->opcion = 'operadores';
    }
    private function operadores(){
        
        $operadores = $this->mysql->get("operadores");

        header("content-type: text/javascript");
        echo json_encode($operadores);
    }
    private function verOperador(){
        $id = $this->vars['id'];
        $result = $this->mysql->query("SELECT  * FROM  `operadores`  WHERE `id` = $id;");
        $result[0]['mensaje'] = '';
        new Template('operadorVer', $result[0]);
    }
    private function nuevoOperador(){
        $menu = $this->mysql->get("ndh_menu");
        $optionMenu = "";
        for($i = 0; $i < count($menu); $i++){
            $optionMenu .= '<option value="'.$menu[$i]['class'].'">'.$menu[$i]['nombre'].'</option>';
        }

        //configguraciones adicionales
        $config = array("optionMenu" => $optionMenu);
        new Template('operadorNuevo',  $config);
    }
    private function nuevoOperadorProcesar(){
        $vars = $this->vars;
        $insertData = array(
                'nombre' => htmlentities($vars['nombre']),
                'direccion' => $vars['direccion'],
                'tipo' => $vars['tipo'],
                'user' => $vars['user'],
                'pass' => md5($vars['pass']),
                'privilegios' => implode(",", $vars["privilegios"]));
        $result = $this->mysql->insert('ndh_users', $insertData);

        //configguraciones adicionales
        if ($result) {
            echo "El usuario se ha cargado correctamente.";
        }
    }
    private function editarOperador(){
        $id = $this->vars['id'];
        $result = $this->mysql->query("SELECT  * FROM  `operadores`  WHERE `id` = $id;");

        $menu = $this->mysql->get("ndh_menu");
        $optionMenu = "";
        $privilegios = explode(',', $result[0]['privilegios']);
        for($i = 0; $i < count($menu); $i++){
            if(in_array($menu[$i]['class'], $privilegios))
                $optionMenu .= '<option value="'.$menu[$i]['class'].'" selected="selected">'.$menu[$i]['nombre'].'</option>';
            else
                $optionMenu .= '<option value="'.$menu[$i]['class'].'" >'.$menu[$i]['nombre'].'</option>';
        }
        $result[0]['optionMenu'] = $optionMenu;

        //configguraciones adicionales

        new Template('userEditar',  $result[0]);
    }
    private function editarOperadorProcesar(){
        $vars = $this->vars;
        $insertData = array(
                'nombre' => htmlentities($vars['nombre']),
                'direccion' => $vars['direccion'],
                'tipo' => $vars['tipo'],
                'user' => $vars['user'],
                'privilegios' => implode(",", $vars["privilegios"]));
        
        if ($vars['pass'] != '')
            $insertData['pass'] = md5($vars['pass']);


        $this->mysql->where("id", $vars['id']);
        $result = $this->mysql->update('ndh_users', $insertData);
                   
        if($result){
            $insertData['mensaje'] = 'Los datos se han guardado correctamente! <br>'; 
            $insertData['id'] = $vars['id']; 
            new Template('userVer', $insertData);
        }else{
            echo "No se realizo ningun cambio! ";
        }
        
    }

    private function eliminarOperador(){
        $id = $this->vars['id'];
        $result = $this->mysql->query("SELECT  * FROM  `operadores`  WHERE `id` = $id;");
        Template('operadorEliminar',  $result[0]);
    }
    private function eliminarOperadorProcesar(){
        $this->mysql->where("id", $this->vars['id']);
        $result = $this->mysql->delete('operadores');

        if($result){
            echo '<script>
                window.parent.$("tr#id_'.$this->vars['id'].'").remove();
                window.parent.$("#windelet'.$this->vars['id'].'").dialog("close");
            </script>';
        }else{
            echo "No se realizo ningun cambio! ";
        }
    }
    public function mostrar(){
        $opcion = $this->opcion;
        $this->$opcion();
    }
    
}

?>