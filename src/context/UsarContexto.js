import axios from "axios";
import Contexto from "./Contexto";
import { useReducer } from "react";
import Reducer from "./Reducer";
export default function UsarContexto(props) {
  const { children } = props;
  const estadoInicial = {
    productos: [],
    carrito: [],
    total: 0,
    cantidad: [],
  };
  const [state, dispatch] = useReducer(Reducer, estadoInicial);

  function aumentar_cantidad(id_cantidad) {
    let i = state.cantidad.findIndex((item) => item.id === id_cantidad);
    console.log("se va a sumar la cantidad aqui", state.cantidad[i]);
    state.cantidad[i].cantidad++;
  }

  const listameProductos = async () => {
    const res = await axios.get(
      "https://devrockstore-default-rtdb.firebaseio.com/productos.json"
    );
    dispatch({ type: "LISTAME_PRODUCTOS", payload: res.data });
    console.log(res.data, "desde UsarContexto()");
  };

  const agregarCarrito = (item, precio) => {
    let payload = { item, precio };
    let exist = false;

    for (let i = 0; i < state.carrito.length; i++) {
      if (state.carrito[i][0].id === item) {
        exist = true;
      }
    }

    if (!exist) {
      state.cantidad.push({ id: item, cantidad: 1 });
      dispatch({ type: "AGREGAR_CARRITO", payload: payload });
    } else if (exist) {
      dispatch({ type: "AGREGAR_CANTIDAD", payload: payload });
      aumentar_cantidad(item);
    }
  };

  const eliminarCarrito = (item, precio, q) => {
    let payload = { item, precio, q };
    console.log("Eliminar carrito", item);
    dispatch({ type: "ELIMINAR_CARRITO", payload: payload });
  };

  const agregarCantidad = (item, precio) => {
    let payload = { item, precio };

    aumentar_cantidad(item);
    dispatch({ type: "AGREGAR_CANTIDAD", payload: payload });
  };

  return (
    <Contexto.Provider
      value={{
        productos: state.productos,
        carrito: state.carrito,
        total: state.total,
        cantidad: state.cantidad,
        listameProductos,
        agregarCarrito,
        eliminarCarrito,
        agregarCantidad,
      }}
    >
      {children}
    </Contexto.Provider>
  );
}
