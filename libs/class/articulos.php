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
			$this->opcion = 'listaArticulos';

	}
	public function listaArticulos(){
		$articulos = $this->mysql->query("SELECT articulos.* , stock.existencia as disponible FROM articulos , stock WHERE articulos.id = stock.idArticulo" );

        header("content-type: text/javascript");
        echo json_encode($articulos);
	}

	public function nuevoArticulo(){
		$rubros = $this->mysql->get('rubros');
 		$rubrosOpciones = '';
 		for ($i=0; $i < count($rubros); $i++) { 
 			$rubrosOpciones .='<option value="'.$rubros[$i]['id'].'">'.$rubros[$i]['nombre'].'</option>';
 		}
 		$opciones= array(
 			'rubro' => $rubrosOpciones
 		);
		new Template ("articulos", $opciones);
	}

	public function nuevoArticuloProcesar(){
	//	print_r($this->vars);
		$datos = array(
			'nombre' => htmlentities($this->vars['nombre']),
			'descripcion' => htmlentities($this->vars['descripcion']),
			'idRubro' => htmlentities($this->vars['rubro']),
			'codigo' => htmlentities($this->vars['codigo']),
			'alta' => date("Y-m-d")
		);
		$result = $this->mysql->insert('articulos',$datos);
		$idArticulo = $this->mysql->getId();

		$stock = array(
			'idArticulo'=>$idArticulo,
 			'existencia'=>$this->vars['existencia'],
 			'puntodePedido'=>$this->vars['puntodePedido'],
 			'existenciaOptima'=>$this->vars['existenciaOptima'],
		);
		$result = $this->mysql->insert('stock',$stock);
		if ($result) {
			echo "El Articulo se Ingreso correctamente";
		}
	}
	public function mostrar(){
        $opcion = $this->opcion;
        $this->$opcion();
        
    }
}

 ?>