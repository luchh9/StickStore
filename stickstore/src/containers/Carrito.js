import React, { useContext } from "react";
import "../assets/css/Carrito.css";
import ItemCarrito from "../components/ItemCarrito";
import Contexto from "../context/Contexto";

export default function Carrito() {
  const {
    carrito,
    total,
    eliminarCarrito,
    agregarCantidad,
    disminuirCantidad,
    vaciarCarrito,
  } = useContext(Contexto);
  return (
    <>
      <div className="carrito">
        <div className="carrito-listadito">
          {carrito.map((item, i) => (
            <ItemCarrito
              {...item}
              key={i}
              agregarCantidad={agregarCantidad}
              eliminarCarrito={eliminarCarrito}
              disminuirCantidad={disminuirCantidad}
            ></ItemCarrito>
          ))}
        </div>

        <div className="carrito-precio-total">
          TOTAL:
          <strong>{total}</strong>
          <button className="vaciar-button" onClick={vaciarCarrito}>
            Vaciar carrito
          </button>
        </div>
      </div>
    </>
  );
}
