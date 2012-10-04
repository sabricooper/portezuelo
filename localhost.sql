-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 04-10-2012 a las 23:29:02
-- Versión del servidor: 5.1.53
-- Versión de PHP: 5.3.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Base de datos: `portezuelo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE IF NOT EXISTS `articulos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text NOT NULL,
  `codigo` int(20) NOT NULL,
  `idRubro` int(10) NOT NULL,
  `alta` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Volcar la base de datos para la tabla `articulos`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `direccion` text NOT NULL,
  `telefono` int(20) NOT NULL,
  `celular` int(20) NOT NULL,
  `provincia` text NOT NULL,
  `localidad` text NOT NULL,
  `cuit` int(20) NOT NULL,
  `condicionDeIva` int(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Volcar la base de datos para la tabla `clientes`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE IF NOT EXISTS `facturas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `numero` int(20) NOT NULL,
  `fecha` date NOT NULL,
  `vencimiento` date NOT NULL,
  `condicionDeVenta` varchar(100) NOT NULL,
  `idCliente` int(10) NOT NULL,
  `descuento` int(20) NOT NULL,
  `idSucursal` int(10) NOT NULL,
  `discriminacionDeIva` int(10) NOT NULL,
  `operador` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Volcar la base de datos para la tabla `facturas`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listaarticulos`
--

CREATE TABLE IF NOT EXISTS `listaarticulos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cantidad` int(10) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` int(10) NOT NULL,
  `total` int(10) NOT NULL,
  `idFactura` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Volcar la base de datos para la tabla `listaarticulos`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `negocio`
--

CREATE TABLE IF NOT EXISTS `negocio` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `direccion` varchar(150) NOT NULL,
  `iva` int(10) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Volcar la base de datos para la tabla `negocio`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operadores`
--

CREATE TABLE IF NOT EXISTS `operadores` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `celular` int(20) NOT NULL,
  `tipo` varchar(10) NOT NULL,
  `user` varchar(50) NOT NULL,
  `pass` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- Volcar la base de datos para la tabla `operadores`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precios`
--

CREATE TABLE IF NOT EXISTS `precios` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `monto` int(20) NOT NULL,
  `proveedor` varchar(150) NOT NULL,
  `idArticulo` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Volcar la base de datos para la tabla `precios`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE IF NOT EXISTS `proveedores` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `direccion` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Volcar la base de datos para la tabla `proveedores`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rubros`
--

CREATE TABLE IF NOT EXISTS `rubros` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Volcar la base de datos para la tabla `rubros`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stock`
--

CREATE TABLE IF NOT EXISTS `stock` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idArticulo` int(11) NOT NULL,
  `existencia` int(11) NOT NULL,
  `puntoDePedido` int(11) NOT NULL,
  `existenciaOptima` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Volcar la base de datos para la tabla `stock`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursales`
--

CREATE TABLE IF NOT EXISTS `sucursales` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `localidad` varchar(200) NOT NULL,
  `telefono` int(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Volcar la base de datos para la tabla `sucursales`
--

