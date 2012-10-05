<?php 
class articulos{
	var $id;
	var $mysql;
	var $opcion;
	var $vars;
	public function __construct($vars= array()){
		$this->mysql = new MysqlDB();
		$this->vars = $vars;
		if(isset($vars['opcion']))
			$this->opcion = $vars['opcion'];
		else
			$this->opcion = 'tablaUsers';

	}

	public function nuevoArticulo(){
		new Template ("articulos");
	}
	public function mostrar(){
        $opcion = $this->opcion;
        $this->$opcion();
        
    }
}

 ?>