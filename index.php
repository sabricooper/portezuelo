<?php
/**
 * @author cesardluis
 * @copyright 2011
 */
define("_VALID_", true);
include_once("classes.php");
require_once('libs/config.php');

session_start();
if (!$_SESSION['session']['sesion_register']) {
    header("Location: login.php");
}

new Inicio();
?>