<?php

/**
 * @author cesardluis
 * @copyright 2011
 */

define("_VALID_", true);
require_once('libs/config.php');
require_once("classes.php");

	$login = new login();
	session_start();
	if (!isset($_SESSION['session']['sesion_register'] )) {
	    $user = (isset($_POST['user'])) ? $_POST['user']:'';
	    $pass = (isset($_POST['pass'])) ? $_POST['pass']:'';
	    $login->iniciarSession($user, $pass);

	}else if (isset($_GET['accion']) && $_GET['accion'] == 'cerrarSession') {
	    $login->cerrarSession();

	}else if ($_SESSION['session']['sesion_register']) {
	    header("Location: ".SERVER_NAME);
	}
?>
