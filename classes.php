<?php
/**
 * @author cesardluis
 * @copyright 2011
 */
$dir = opendir("libs/class");
while ($archivo = readdir($dir))
    if ($archivo != "." && $archivo != "..")
        include_once ("libs/class/".$archivo);
closedir($dir);
?>