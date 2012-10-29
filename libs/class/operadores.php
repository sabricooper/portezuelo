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
	public function listaClientes(){
		$articulos = $this->mysql->query("SELECT clientes.*");

        header("content-type: text/javascript");
        echo json_encode($clientes);
	}

	public function nuevoCliente(){
		$opciones= array(
			'metodo' => "nuevoArticuloProcesar",
 		);
		new Template ("clientes", $opciones);
	}

	public function nuevoClienteProcesar(){
	//	print_r($this->vars);
		$datos = array(
			'nombre' => htmlentities($this->vars['nombre']),
			'direccion' => htmlentities($this->vars['descripcion']),
			'telefono' => $this->vars['telefono'],
			'celular' => $this->vars['celular'],
			'provincia' => $this->vars['provincia'],
			'localidad' => $this->vars['localidad'],
			'cuit' => $this->vars['cuit']
			//'pass'  => hash_hmac('ripemd128', $this->vars['pass'], KEY_PASS) 
		);
		$result = $this->mysql->insert('clientes',$datos);
		$idCliente = $this->mysql->getId();
		if ($result) {
			echo "El Cliente se Ingreso correctamente";
		}
	}

	public function editarCliente(){
		$cliente = $this->mysql->query("SELECT * FROM clientes =");
		
 		$opciones= array( 
 			'metodo' => "editarClienteProcesar&id=".$this->vars['id'],
 			'nombre' => $cliente[0]['nombre'],
 			'direccion' => $cliente[0]['direccion'],
 			'telefono' => $cliente[0]['telefono'],
 			'celular' => $cliente[0]['celular'],
 			'provincia' => $cliente[0]['provincia'],
 			'localidad'=>$cliente[0]['localidad'],
 			'cuit'=>$liente[0]['cuit']
 		);
		new Template ("clientes", $opciones);

	}
	public function editarClienteProcesar(){
		$datos = array(
			'nombre' => htmlentities($this->vars['nombre']),
			'direccion' => htmlentities($this->vars['direccion']),
			'telefono' => $this->vars['telefono'],
			'celular' => $this->vars['celular'],
			'provincia' => $this->vars['provincia'],
			'localidad' => $this->vars['localidad'],
			'cuit' => $this->vars['cuit']
		);
		$this->mysql->where('id',$this->vars['id']);
		$result = $this->mysql->update('clientes',$datos);
		if ($result) {
			echo "El Cliente se ha modificado correctamente";
		}	

	}
	public function eliminarCliente(){
		echo "Esta seguro que quiere eliminar este Cliente?<br>";
		echo '<a href="accion.php?name=clientess&opcion=eliminarClienteProcesar&id='.$this->vars['id'].'">Si</a> | <a href="javascript:window.parent.$(\'#windelet'.$this->vars['id'].'\').dialog(\'close\')">No</a>' ;

	}
	public function eliminarClienteProcesar(){
		$this->mysql->where('id',$this->vars['id']);
		$result = $this->mysql->delete('clientes');
		if ($result)
		echo "Cliente Eliminado!";
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