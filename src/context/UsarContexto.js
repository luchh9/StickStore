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
    //Cantidad es un array que se utiliza para manipular la cantidad INDIVIDUAL de cada item/producto
    cantidad: [],
  };
  const [state, dispatch] = useReducer(Reducer, estadoInicial);

  //Devuelve la POSICION en state.cantidad dado un ID
  function findIndexCantidad(id) {
    let i = state.cantidad.findIndex((item) => item.id === id);
    return i;
  }

  //Funcion que incrementa la cantidad dado un ID en STATE.CANTIDAD
  function incrementar_cantidad(id_cantidad) {
    let indice = findIndexCantidad(id_cantidad);
    state.cantidad[indice].cantidad++;
  }

  const listameProductos = async () => {
    const res = await axios.get(
      "https://devrockstore-default-rtdb.firebaseio.com/productos.json"
    );
    dispatch({ type: "LISTAME_PRODUCTOS", payload: res.data });
  };

  //Esta funcion agrega items al carrito, en caso de no existir se incrementa la cantidad de dicho producto
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
    let indice = findIndexCantidad(item);
    state.cantidad[indice].cantidad++;
    dispatch({ type: "SUMAR_TOTAL", payload: payload });
  };

  const disminuirCantidad = (item, precio) => {
    let payload = { item, precio };
    let indice = findIndexCantidad(item);
    if (state.cantidad[indice].cantidad > 1) {
      state.cantidad[indice].cantidad--;
      dispatch({ type: "RESTAR_TOTAL", payload: payload });
    }
  };

  const vaciarCarrito = () => {
    let payload = {};
    dispatch({ type: "VACIAR_CARRITO", payload: payload });
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
        disminuirCantidad,
        vaciarCarrito,
      }}
    >
      {children}
    </Contexto.Provider>
  );
}
