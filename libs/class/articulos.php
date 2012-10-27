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
 			'rubro' => $rubrosOpciones, 
 			'metodo' => "nuevoArticuloProcesar",
 		);
		new Template ("articulos", $opciones);
	}

	public function nuevoArticuloProcesar(){
	//	print_r($this->vars);
		$datos = array(
			'nombre' => htmlentities($this->vars['nombre']),
			'descripcion' => htmlentities($this->vars['descripcion']),
			'idRubro' => $this->vars['rubro'],
			'codigo' => $this->vars['codigo'],
			'precioLista' => $this->vars['precioLista'],
			'precioGremio' => $this->vars['precioGremio'],
			'alta' => date("Y-m-d"),
			//'pass'  => hash_hmac('ripemd128', $this->vars['pass'], KEY_PASS) 
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

	public function editarArticulo(){
		$articulo = $this->mysql->query("SELECT * FROM articulos , stock WHERE articulos.id = stock.idArticulo AND articulos.id =". $this->vars['id'] );

		$rubros = $this->mysql->get('rubros');
		$rubrosOpciones = '';
 		for ($i=0; $i < count($rubros); $i++) { 
 			if ($rubros[$i]['id']==$articulo[0]['idRubro'])
 				$rubrosOpciones .='<option value="'.$rubros[$i]['id'].'" selected="selected">'.$rubros[$i]['nombre'].'</option>';
 			else
 				$rubrosOpciones .='<option value="'.$rubros[$i]['id'].'">'.$rubros[$i]['nombre'].'</option>';

 		}
 		$opciones= array(
 			'rubro' => $rubrosOpciones, 
 			'metodo' => "editarArticuloProcesar&id=".$this->vars['id'],
 			'nombre' => $articulo[0]['nombre'],
 			'descripcion' => $articulo[0]['descripcion'],
 			'codigo' => $articulo[0]['codigo'],
 			'precioLista' => $articulo[0]['precioLista'],
 			'precioGremio' => $articulo[0]['precioGremio'],
 			'existencia'=>$articulo[0]['existencia'],
 			'existenciaOptima'=>$articulo[0]['existenciaOptima'],
 			'puntodePedido'=>$articulo[0]['puntodePedido']
 		);
		new Template ("articulos", $opciones);

	}
	public function editarArticuloProcesar(){
		$datos = array(
			'nombre' => htmlentities($this->vars['nombre']),
			'descripcion' => htmlentities($this->vars['descripcion']),
			'idRubro' => $this->vars['rubro'],
			'codigo' => $this->vars['codigo'],
			'precioLista' => $this->vars['precioLista'],
			'precioGremio' => $this->vars['precioGremio']		
		);
		$this->mysql->where('id',$this->vars['id']);
		$result = $this->mysql->update('articulos',$datos);

		$stock = array(
 			'existencia'=>$this->vars['existencia'],
 			'puntodePedido'=>$this->vars['puntodePedido'],
 			'existenciaOptima'=>$this->vars['existenciaOptima'],
		);
		$this->mysql->where('idArticulo',$this->vars['id']);
		$result = $this->mysql->update('stock',$stock);
		if ($result) {
			echo "El Articulo se ha modificado correctamente";
		}	

	}
	public function eliminarArticulo(){
		echo "Esta seguro que quiere eliminar este articulo?<br>";
		echo '<a href="accion.php?name=articulos&opcion=eliminarArticuloProcesar&id='.$this->vars['id'].'">Si</a> | <a href="javascript:window.parent.$(\'#windelet'.$this->vars['id'].'\').dialog(\'close\')">No</a>' ;

	}
	public function eliminarArticuloProcesar(){
		$this->mysql->where('id',$this->vars['id']);
		$result = $this->mysql->delete('articulos');
		if ($result)
		echo "Articulo Eliminado!";
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