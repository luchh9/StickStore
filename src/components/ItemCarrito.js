import React, { useEffect, useState, useContext } from "react";
import Contexto from "../context/Contexto";
import "../assets/css/ItemCarrito.css";
import Borrar from "../assets/statics/borrar.png";

export default function ItemCarrito(props) {
  const { cantidad } = useContext(Contexto);
  const [q, setq] = useState();
  const { nombre, precio, img, id } = props[0];

  useEffect(() => {
    let i = cantidad.findIndex((item) => item.id === id);
    setq(cantidad[i].cantidad);
  });

  const handleBorrar = () => {
    props.eliminarCarrito(id, precio, q);
  };

  const handleAgregar = () => {
    props.agregarCantidad(id, precio);
  };

  return (
    <>
      <div className="carrito-item">
        <img src={img} alt="" className="carrito-item-img" />
        <div className="carrito-txt">
          <h1 className="carrito-item-titulo">{nombre}</h1>
          <h3 className="carrito-item-precio">AR${precio}</h3>
          <h5>Cantidad: {q}</h5>
        </div>

        {/* <a onClick={handleAgregar}>agregar</a> */}
        <div className="div">
          <button className="home-item-comprar">-</button>
          <button className="home-item-comprar" onClick={handleAgregar}>
            +
          </button>
        </div>
        <img
          src={Borrar}
          alt="sticker image"
          className="carrito-item-borrar"
          onClick={handleBorrar}
        />
      </div>
    </>
  );
}
