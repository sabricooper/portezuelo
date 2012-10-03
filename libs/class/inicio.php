<?php 
class inicio {
	var $html;
	public function __construct( $post , $get){
		$this->html = new varHtml("default");
		$this->html->mostrar();
	}
}
 ?>