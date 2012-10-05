<?php

/**
 * @author cesardluis
 * @copyright 2011
 */

class Template{
    var $html;
    public function __construct($file, $vars=array()) {
        $this->inHtml($file, $vars);
        $this->mostrar();

    }
    private function inHtml($file, $vars){
         if ($this->html = file_get_contents("templates/html/".$file.".html")) {
            
            $variables = array();
            $valores = array();
            foreach ($vars as $key => $value) {
                $variables[] = "{".$key."}";
                $valores[] = $value;
            }

            $this->html = str_replace ($variables, $valores, $this->html);
            $this->html = preg_replace('#\{([a-z0-9\-_]*?)\}#is', "", $this->html);
            
        }else{
            echo 'Error al abrir la plantilla '.$file;
        }
    }
    private function mostrar(){
        echo $this->html;
    }
}

?>