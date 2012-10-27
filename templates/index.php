<?php
/**
 * @author cesardluis
 * @copyright 2011
 */

class Inicio {
    var $config = array(
        "titulo"    => "Administrador Cuesta del Portezuelo", 
        "logo"      => "",
        "footer"    => "&copy; 2012 - Sabrina Pascual",
        "urlLocal"  => SERVER_NAME
        );
    var $tpl_file;
    var $mihtml = "";
    var $mysql;
    
    
    public function __construct($templatFile='default') {
        $this->tpl_file = $templatFile;
        $this->config['menutop'] = $_SESSION['session']['nombre']." - <a href='login.php?accion=cerrarSession'>Salir</a>";
        
        /*$this->mysql = new MysqlDB();
        $menu = $this->mysql->query("SELECT * FROM `ndh_menu` ORDER BY `ndh_menu`.`orden` ASC");

        $menuLink = '';
        for ($i=0; $i < count($menu); $i++) {
            if (in_array($menu[$i]['class'], $_SESSION['session']['priv']))
                $menuLink .= ' <li><a href="'.$menu[$i]['class'].'" class="'.$menu[$i]['tipo'].'">'.$menu[$i]['nombre'].'</a></li>';
        }

        $this->config['menu'] = $menuLink;*/
    }
    
    public function mostrar() {
        $html = new Template($this->tpl_file, $this->config);
        $html->mostrar();
    }
}
?>

