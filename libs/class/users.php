<?php

/**
 * @author cesardluis
 * @copyright 2011
 */
class users{
    var $opcion;
    var $vars;
    var $mysql;
    public function __construct($vars = array()){
        $this->mysql = new MysqlDB();
        $this->vars = $vars;
        if(isset($vars['opcion']))
            $this->opcion = $vars['opcion'];
        else
            $this->opcion = 'tablaUsers';
    }
    private function tablaUsers(){
        
        $users = $this->mysql->get("ndh_users");

        header("content-type: text/javascript");
        echo json_encode($users);
    }
    private function verUser(){
        $id = $this->vars['id'];
        $result = $this->mysql->query("SELECT  * FROM  `ndh_users`  WHERE `id` = $id;");
        $result[0]['mensaje'] = '';
        $html = new varHtml('userVer', $result[0]);
        $html->mostrar();
    }
    private function nuevoUser(){
        $menu = $this->mysql->get("ndh_menu");
        $optionMenu = "";
        for($i = 0; $i < count($menu); $i++){
            $optionMenu .= '<option value="'.$menu[$i]['class'].'">'.$menu[$i]['nombre'].'</option>';
        }

        //configguraciones adicionales
        $config = array("optionMenu" => $optionMenu);
        $html = new varHtml('userNuevo',  $config);
        $html->mostrar();
    }
    private function nuevoUserProcesar(){
        $vars = $this->vars;
        $insertData = array(
                'nombre' => htmlentities($vars['nombre']),
                'email' => $vars['email'],
                'user' => $vars['user'],
                'pass' => md5($vars['pass']),
                'privilegios' => implode(",", $vars["privilegios"]));
        $result = $this->mysql->insert('ndh_users', $insertData);

        //configguraciones adicionales
        if ($result) {
            echo "El usuario se ha cargado correctamente.";
        }
    }
    private function editarUser(){
        $id = $this->vars['id'];
        $result = $this->mysql->query("SELECT  * FROM  `ndh_users`  WHERE `id` = $id;");

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

        $html = new varHtml('userEditar',  $result[0]);
        $html->mostrar();
    }
    private function editarUserProcesar(){
        $vars = $this->vars;
        $insertData = array(
                'nombre' => htmlentities($vars['nombre']),
                'email' => $vars['email'],
                'user' => $vars['user'],
                'privilegios' => implode(",", $vars["privilegios"]));
        
        if ($vars['pass'] != '')
            $insertData['pass'] = md5($vars['pass']);


        $this->mysql->where("id", $vars['id']);
        $result = $this->mysql->update('ndh_users', $insertData);
                   
        if($result){
            $insertData['mensaje'] = 'Los datos se han guardado correctamente! <br>'; 
            $insertData['id'] = $vars['id']; 
            $html = new varHtml('userVer', $insertData);
            $html->mostrar();
        }else{
            echo "No se realizo ningun cambio! ";
        }
        
    }

    private function eliminarUser(){
        $id = $this->vars['id'];
        $result = $this->mysql->query("SELECT  * FROM  `ndh_users`  WHERE `id` = $id;");
        $html = new varHtml('userEliminar',  $result[0]);
        $html->mostrar();
    }
    private function eliminarUserProcesar(){
        $this->mysql->where("id", $this->vars['id']);
        $result = $this->mysql->delete('ndh_users');

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