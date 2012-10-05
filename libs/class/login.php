<?php

/**
 * @author cesardluis
 * @copyright 2011
 */

class login{
    var $mysql;
    public function __construct() {
        $this->mysql = new MysqlDB();
       
    }

    public function iniciarSession($user, $pass){
        if($user!=''){
            $pass = hash_hmac('ripemd128', $pass, KEY_PASS);
            echo $pass;
            $result = $this->mysql->query("SELECT * FROM operadores WHERE user = '$user' AND pass = '$pass'");
            if (count($result) > 0) {
                $_SESSION['session']['sesion_register'] = true;
                $_SESSION['session']['user'] = $result[0]['user'];
                $_SESSION['session']['nombre'] = $result[0]['nombre'];
                $_SESSION['session']['priv'] = explode(',', $result[0]['privilegios']);

                header("Location: ".SERVER_NAME);
            }else{
                $vars = array('error' => '<p style="color:#FF0000;font-weight:bold">El nombre de Usuario y La contrase&ntilde;a que ha introducido 
                               <br />no son correspondidos o no existen.</p>', 'user' => $user);
                $html = new varHtml('login', $vars);
                $html->mostrar();
            }
        }else{
            $html = new varHtml('login');
            $html->mostrar();
        }
        
    }
    public function cerrarSession(){
        //session_start();
        $_SESSION['session']['sesion_register'] = flase;
        $_SESSION['session']['user'] = '';
        $_SESSION['session']['nombre'] ='';
        $_SESSION['session']['priv'] = array();
        session_destroy();
        header("Location: login.php");
        
    }
    public function registro(){
        
    }
    public function recPass(){
        
    }
    
    
}
?>