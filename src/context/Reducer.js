//TYPES

const LISTAME_PRODUCTOS = "LISTAME_PRODUCTOS";
const AGREGAR_CARRITO = "AGREGAR_CARRITO";
const ELIMINAR_CARRITO = "ELIMINAR_CARRITO";
const SUMAR_TOTAL = "SUMAR_TOTAL";
const RESTAR_TOTAL = "RESTAR_TOTAL";
const VACIAR_CARRITO = "VACIAR_CARRITO";

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
      //Se elimina su informacion en state.cantidad[...]
      let indice_cantidad = state.cantidad.findIndex(
        (item) => item.id === payload.item
      );
      state.cantidad.splice(indice_cantidad, 1);

      return {
        ...state,
        carrito: state.carrito.filter((items) => items[0].id !== payload.item),
        total: state.total - payload.precio * payload.q,
      };

    case SUMAR_TOTAL:
      return {
        ...state,
        total: state.total + payload.precio,
      };

    case RESTAR_TOTAL:
      return {
        ...state,
        total: state.total - payload.precio,
      };

    case VACIAR_CARRITO:
      return {
        ...state,
        carrito: [],
        cantidad: [],
        total: 0,
      };
  }
}
