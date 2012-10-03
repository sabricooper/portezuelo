<?php 
session_start();
include ("libs.php"); 
if (empty($_SESSION["registro"]["registrado"]) && !$_SESSION["registro"]["registrado"]){
	header("Location: login.php");
}
$post = $_POST;
$get = $_GET;
$module = $_GET["module"];

$programa = new $module( $post, $get );

?>