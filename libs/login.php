<?php 
class login {
	var $html;
	public function __construct( $post , $get){
		$this->html = new varHtml("login");
		$this->html->mostrar();
	}
}
 ?>