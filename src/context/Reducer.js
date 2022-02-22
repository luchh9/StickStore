//TYPES

const LISTAME_PRODUCTOS = "LISTAME_PRODUCTOS";
const AGREGAR_CARRITO = "AGREGAR_CARRITO";
const ELIMINAR_CARRITO = "ELIMINAR_CARRITO";
const AGREGAR_CANTIDAD = "AGREGAR_CANTIDAD";
const SUMAR_TOTAL = "SUMAR_TOTAL";

export default function Reducer(state, action) {
  const { payload, type } = action;

  switch (type) {
    case LISTAME_PRODUCTOS:
      return { ...state, productos: payload };

    case AGREGAR_CARRITO:
      return {
        ...state,
        carrito: [
          ...state.carrito,
          state.productos.filter((ite) => ite.id === payload.item),
        ],
        total: state.total + payload.precio,
      };

    case ELIMINAR_CARRITO:
      let indice_cantidad = state.cantidad.findIndex(
        (item) => item.id === payload.item
      );
      state.cantidad.splice(indice_cantidad, 1);

      function elimina(id) {
        let index = state.carrito.findIndex((item) => item[0].id === id);
        if (index >= 0) {
          state.carrito.splice(index, 1);
        }
        return state.carrito;
      }

      return {
        ...state,
        carrito: elimina(payload.item),
        total: state.total - payload.precio * payload.q,
        //total: state.total - payload.precio * (cantidad_producto) << funcion a realizar
      };

    case AGREGAR_CANTIDAD:
      //no hace otra cosa que sumar el precio al total

      return {
        ...state,
        total: state.total + payload.precio,
      };

    case SUMAR_TOTAL:
      return {
        ...state,
        total: state.total + payload,
      };
  }
}
