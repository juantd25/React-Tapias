import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';
import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_ERROR,
  AGREGAR_PRODUCTO_EXITO,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  EDITAR_TITULO_TABLE,
} from '../types';

// Crear nuevos producots
export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());

    try {
      // Insertar en la API
      const cliente = await clienteAxios();
      const nuevoProducto = await cliente.post('/productos', producto);
      dispatch(agregarProductoExito(nuevoProducto.data));
      //   Swal.fire('Correcto', 'El producto se agregó correctamente', 'success');
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El producto se agregó correctamente',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      dispatch(agregarProductoError(true));
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Hubo un error, intenta de nuevo',
      });
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});

export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProducto());
    try {
      const cliente = await clienteAxios();
      const respuesta = await cliente.get('/grupo');
      dispatch(descargaProductosExitosa(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargaProductosError());
    }
  };
}

const descargarProducto = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});

const descargaProductosExitosa = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos,
});

const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true,
});

export function borrarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));

    try {
      const cliente = await clienteAxios();
      const respuesta = await cliente.delete(`/grupo/${id}`);
      console.log(respuesta);
      dispatch(eliminarProductoExito(respuesta));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto eliminado correctamente',
        showConfirmButton: false,
        timer: 1500,
      });
      //   Swal.fire('Exito', 'Producto eliminado correctamente', 'success');
    } catch (error) {}
  };
}

const obtenerProductoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id,
});

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO,
});

const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true,
});

export function obtenerProductoEditar(producto) {
  return async (dispatch) => {
    dispatch(obtenerProductoAction(producto));
  };
}

const obtenerProductoAction = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
});

export function editarProductoAction(producto) {
  return async (dispatch) => {
    dispatch(editarProducto());

    try {
      const cliente = await clienteAxios();
      await cliente.put(`/grupo/${producto.id}`, producto);
      dispatch(editarProductoExito(producto));
    } catch (error) {}
  };
}

const editarProducto = (producto) => ({
  type: COMENZAR_EDICION_PRODUCTO,
});

const editarProductoExito = (producto) => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto,
});

export function setTableTitle(title) {
  return async (dispatch) => {
    dispatch(editarTableTitle(title));
  };
}

const editarTableTitle = (title) => ({
  type: EDITAR_TITULO_TABLE,
  payload: title,
});
