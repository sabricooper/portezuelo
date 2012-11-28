<?php 
class Facturas{
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
			$this->opcion = 'listaFacturas';

	}
	public function listaFacturas(){
		$facturas = $this->mysql->query("SELECT * FROM facturas");

        header("content-type: text/javascript");
        echo json_encode($facturas);
	}

		public function nuevoFactura(){
		$opciones= array(
			'metodo' => "nuevoFacturaProcesar",
 		);
		new Template ("facturas", $opciones);
	}

	public function nuevoFacturaProcesar(){
	$datos = array(
			'tipo' => $this->vars['tipo'],
			'numero' =>($this->vars['numero']),
			'fecha' => date("Y-m-d"),
			'idCliente' => htmlentities($this->vars['idCliente']),
			'direccion' => htmlentities($this->vars['direccion']),
			'localidad' => htmlentities($this->vars['localidad']),
			'provincia' => htmlentities($this->vars['provincia']),
			'iva' => $this->vars['iva'],
			'ingresosBrutos' => $this->vars['ingresosBrutos'],
			'condicionDeVenta' => $this->vars['condicionDeVenta'],
			'remito' => $this->vars['remito']
		);
		$result = $this->mysql->insert('facturas',$datos);
		$idFactura = $this->mysql->getId();
		if ($result) {
			echo "Su Factura se Guardo correctamente";
		}
	}

	public function editarFactura(){
		$factura = $this->mysql->query("SELECT * FROM facturas WHERE id =". $this->vars['id']);
		
 		$opciones= array( 
 			'metodo' => "editarFacturaProcesar&id=".$this->vars['id'],
			'tipo' => $this->vars['tipo'],
			'numero' =>($this->vars['numero']),
			'fecha' => date("Y-m-d"),
			'idCliente' => htmlentities($this->vars['idCliente']),
			'direccion' => htmlentities($this->vars['direccion']),
			'localidad' => htmlentities($this->vars['localidad']),
			'provincia' => htmlentities($this->vars['provincia']),
			'iva' => $this->vars['iva'],
			'ingresosBrutos' => $this->vars['ingresosBrutos'],
			'condicionDeVenta' => $this->vars['condicionDeVenta'],
			'remito' => $this->vars['remito']
		);
		new Template ("facturas", $opciones);

	}
	public function editarFacturaProcesar(){
		$datos = array(
			'tipo' => $this->vars['tipo'],
			'numero' =>($this->vars['numero']),
			'fecha' => date("Y-m-d"),
			'idCliente' => htmlentities($this->vars['idCliente']),
			'direccion' => htmlentities($this->vars['direccion']),
			'localidad' => htmlentities($this->vars['localidad']),
			'provincia' => htmlentities($this->vars['provincia']),
			'iva' => $this->vars['iva'],
			'ingresosBrutos' => $this->vars['ingresosBrutos'],
			'condicionDeVenta' => $this->vars['condicionDeVenta'],
			'remito' => $this->vars['remito']
		);
		$this->mysql->where('id',$this->vars['id']);
		$result = $this->mysql->update('facturas');
		if ($result) {
			echo "Su Factura se ha modificado correctamente";
		}	

	}
	public function eliminarFactura(){
		echo "Esta seguro que quiere eliminar esta Factura?<br>";
		echo '<a href="accion.php?name=facturas&opcion=eliminarFacturaProcesar&id='.$this->vars['id'].'">Si</a> | <a href="javascript:window.parent.$(\'#windelet'.$this->vars['id'].'\').dialog(\'close\')">No</a>' ;

	}
	public function eliminarFacturaProcesar(){
		$this->mysql->where('id',$this->vars['id']);
		$result = $this->mysql->delete('facturas');
		if ($result)
		echo "Factura Eliminada!";
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