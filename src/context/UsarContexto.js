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

  //Funcion que incrementa la cantidad dado un ID en STATE.CANTIDAD
  function incrementar_cantidad(id_cantidad) {
    let i = state.cantidad.findIndex((item) => item.id === id_cantidad);
    state.cantidad[i].cantidad++;
  }

  const listameProductos = async () => {
    const res = await axios.get(
      "https://devrockstore-default-rtdb.firebaseio.com/productos.json"
    );
    dispatch({ type: "LISTAME_PRODUCTOS", payload: res.data });
  };

  const agregarCarrito = (item, precio) => {
    let payload = { item, precio };

    //Se verifica si existe el Item
    let exist = false;
    for (let i = 0; i < state.carrito.length; i++) {
      if (state.carrito[i][0].id === item) {
        exist = true;
      }
    }

    //Si NO EXISTE se procede a:
    // 1) Se crea la informacion en STATE.CANTIDAD para manipular la cantidad del item
    // 2) Se agrega al carrito
    if (!exist) {
      state.cantidad.push({ id: item, cantidad: 1 });
      dispatch({ type: "AGREGAR_CARRITO", payload: payload });
    }
    //Si EXISTE se suma el precio al total y se actualiza su informacion en STATE.CANTIDAD
    else if (exist) {
      dispatch({ type: "SUMAR_TOTAL", payload: payload });
      incrementar_cantidad(item);
    }
  };

  const eliminarCarrito = (item, precio, q) => {
    let payload = { item, precio, q };
    dispatch({ type: "ELIMINAR_CARRITO", payload: payload });
  };

  const agregarCantidad = (item, precio) => {
    let payload = { item, precio };
    incrementar_cantidad(item);
    dispatch({ type: "SUMAR_TOTAL", payload: payload });
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
