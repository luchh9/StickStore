import React, { useContext } from "react";
import Contexto from "../context/Contexto";
import iconoCarrito from "../assets/statics/carrito.png";
import iconoVolver from "../assets/statics/volver.png";
import { Link } from "react-router-dom";

export default function Header() {
  const { cantidadTotalCarrito } = useContext(Contexto);

  return (
    <>
      <Link to="/carrito">
        <div>
          {cantidadTotalCarrito > 0 ? (
            <div className="carrito-total">{cantidadTotalCarrito}</div>
          ) : null}
          <img src={iconoCarrito} alt="" className="carritou" />
        </div>
      </Link>
      <Link to="/">
        <img src={iconoVolver} alt="" className="volver" />
      </Link>
      <h1 className="titulo">StickStore</h1>
    </>
  );
}
