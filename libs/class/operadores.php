<?php 
class Operadores{
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
			$this->opcion = 'listaOperadores';

	}
	public function listaOperadores(){
		$operadores = $this->mysql->query("SELECT * FROM operadores");

        header("content-type: text/javascript");
        echo json_encode($operadores);
	}

		public function nuevoOperador(){
		$opciones= array(
			'metodo' => "nuevoOperadorProcesar",
 		);
		new Template ("operadores", $opciones);
	}

	public function nuevoOperadorProcesar(){
	//	print_r($this->vars);
		$datos = array(
			'nombre' => htmlentities($this->vars['nombre']),
			'domicilio' => htmlentities($this->vars['domicilio']),
			'telefono' => $this->vars['telefono'],
			'tipo' => $this->vars['tipo'],
			'user' => $this->vars['user'],
			'pass'  => hash_hmac('ripemd128', $this->vars['pass'], KEY_PASS) 
		);
		$result = $this->mysql->insert('operadores',$datos);
		$idOperador = $this->mysql->getId();
		if ($result) {
			echo "Su cuenta de Operador se ha cargador correctamente";
		}
	}

	public function editarOperador(){
		$operador = $this->mysql->query("SELECT * FROM operadores WHERE id =". $this->vars['id']);
		
 		$opciones= array( 
 			'metodo' => "editarOperadorProcesar&id=".$this->vars['id'],
 			'nombre' => $operador[0]['nombre'],
 			'domicilio' => $operador[0]['domicilio'],
 			'telefono' => $operador[0]['telefono'],
 			'tipo' => $operador[0]['tipo'],
 			'user'=>$operador[0]['user'],
 			'mensaje' => "(Modifique el campo solo si desea cambiar contraseña)"
 		);
		new Template ("operadores", $opciones);

	}
	public function editarOperadorProcesar(){
		if($this->vars['pass'] != '')
			$pass = array('pass' => hash_hmac('ripemd128', $this->vars['pass'], KEY_PASS));
		else
			$pass = array();

		$datos = array(
			'nombre' => htmlentities($this->vars['nombre']),
			'domicilio' => htmlentities($this->vars['domicilio']),
			'telefono' => $this->vars['telefono'],
			'tipo' => $this->vars['tipo'],
			'user' => $this->vars['user']
		);
		$this->mysql->where('id',$this->vars['id']);
		$result = $this->mysql->update('operadores',array_merge($datos , $pass));
		if ($result) {
			echo "Su cuenta se ha modificado correctamente";
		}	

	}
	public function eliminarOperador(){
		echo "Esta seguro que quiere eliminar este Operador?<br>";
		echo '<a href="accion.php?name=operadores&opcion=eliminarOperadorProcesar&id='.$this->vars['id'].'">Si</a> | <a href="javascript:window.parent.$(\'#windelet'.$this->vars['id'].'\').dialog(\'close\')">No</a>' ;

	}
	public function eliminarOperadorProcesar(){
		$this->mysql->where('id',$this->vars['id']);
		$result = $this->mysql->delete('operadores');
		if ($result)
		echo "Cuenta Eliminada!";
		echo "<script type='text/javascript'>

			window.parent.$('tr#id_".$this->vars['id']."').remove();
		</script>";
	}
	public function mostrar(){
        $opcion = $this->opcion;
        $this->$opcion();
        
    }
}

 ?>