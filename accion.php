<?php
/**
 * @author cesardluis
 * @copyright 2011
 */
 define("_VALID_", true);

require_once('libs/config.php');
include_once("classes.php");

session_start();
if (!$_SESSION['session']['sesion_register']) {
    header("Location: login.php");
}

$name = $_GET['name'];

if(in_array($name, $_SESSION['session']['priv'])){
	$post = (isset($_POST)) ? $_POST:array();
	$get = (isset($_GET)) ? $_GET:array();

	if(count($get)>1 || count($post)>0)
	    $result = new $name(array_merge($get,$post));
	else
	    $result = new $name();
	$result->mostrar();
}else{
echo "Acceso restringido";
}
?>