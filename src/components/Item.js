import React, { useContext } from "react";
import "../assets/css/Item.css";
import Contexto from "../context/Contexto";
import { Link } from "react-router-dom";
export default function Item(props) {
  const { nombre, precio, medidas, img, id } = props;
  const { agregarCarrito } = useContext(Contexto);
  return (
    <>
      <div className="home-item">
        <Link to={`/Sticker/${id}`}>
          <img loading="lazy" src={img} alt="" className="home-item-img" />
        </Link>
        <div className="home-item-info">
          <h1 className="home-item-titulo">{nombre}</h1>
          <p className="home-item-medidas">Medidas: {medidas}</p>
          <div className="home-item-actions">
            <h3 className="home-item-precio">AR$ {precio}</h3>
            <button
              className="home-item-comprar"
              onClick={() => {
                agregarCarrito(id, precio);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
