import React from "react";
import "../assets/css/Producto.css";
import img from "../assets/statics/0.png";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import Contexto from "../context/Contexto";
import { useEffect, useState } from "react";
export default function Producto() {
  const { productos } = useContext(Contexto);
  const [sticker, setSticker] = useState([]);

  let params = useParams();
  let id = params.id;

  useEffect(() => {
    const producto = productos.filter((item) => item.id == id);
    setSticker(producto);
    console.log(producto);
  }, []);

  return (
    <>
      <div className="detalle">
        <img src={sticker[0]?.img} alt="" className="detalle-img" />
        <h1 className="home-item-titulo">{sticker[0]?.nombre}</h1>
        <p className="home-item-medidas">{sticker[0]?.medidas}</p>
        <div className="home-item-actions">
          <h3 className="home-item-precio">${sticker[0]?.precio}</h3>&nbsp;
        </div>
        <p>{sticker[0]?.descripcion}</p>
      </div>
    </>
  );
}
