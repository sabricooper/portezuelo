<?PHP
defined('_VALID_') or die('Acceso restringido.');
?>
<?php
//Configuramos si esta enonline o ofline
define("ONLINE_WEB", false);

define("KEY_PASS", "ASdasfDSfSDfdwqe$632434edf3215448fgdf-_asdaqqeTDGHUSADF"); //cambiar esto al moemnto de instalar

if (ONLINE_WEB) {
    //direccion de la base de datos a usar
    define("MYSQL_HOST", 'localhost');
    //Defino la base de datos a la que selecciono.
    define("MYSQL_NAME", '');
    //Nombre de usuarios
    define("MYSQL_USER", '');
    //contraseña
    define("MYSQL_PASS", '');
    error_reporting(0);
    //nombre de host
    define("SERVER_NAME", '');
} else {
    //direccion de la base de datos a usar
    define("MYSQL_HOST", 'localhost');
    //Defino la base de datos a la que selecciono.
    define("MYSQL_NAME", 'portezuelo');
    //Nombre de usuarios
    define("MYSQL_USER", 'root');
    //contraseña
    define("MYSQL_PASS", '');
    //nombre de host
    define("SERVER_NAME", 'http://localhost/portezuelo/');
    date_default_timezone_set("America/Argentina/Buenos_Aires");
}
?>