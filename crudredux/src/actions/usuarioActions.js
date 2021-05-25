import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';
import {
  OBTENER_USUARIO_ELIMINAR,
  USUARIO_ELIMINADO_EXITO,
  USUARIO_ELIMINADO_ERROR,
  USUARIO_EDITADO_EXITO,
  COMENZAR_EDICION_USUARIO,
  OBTENER_USUARIO_EDITAR,
  COMENZAR_DESCARGA_USUARIOS,
  DESCARGA_USUARIOS_ERROR,
  DESCARGA_USUARIOS_EXITO,
  AGREGAR_USUARIO,
  AGREGAR_USUARIO_EXITO,
  AGREGAR_USUARIO_ERROR,
  USUARIO_EDITADO_ERROR,
} from '../types';

// Crear nuevos producots
export function obtenerUsuariosAction() {
  return async (dispatch) => {
    dispatch(descargarUsuarios());
    try {
      const cliente = await clienteAxios();
      const respuesta = await cliente.get('/usuario');
      dispatch(descargaUsuariosExitosa(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargaUsuariosError());
    }
  };
}

const descargarUsuarios = () => ({
  type: COMENZAR_DESCARGA_USUARIOS,
  payload: true,
});

const descargaUsuariosExitosa = (usuarios) => ({
  type: DESCARGA_USUARIOS_EXITO,
  payload: usuarios,
});

const descargaUsuariosError = () => ({
  type: DESCARGA_USUARIOS_ERROR,
  payload: true,
});

export function obtenerUsuarioEditar(Usuario) {
  return async (dispatch) => {
    dispatch(obtenerUsuarioAction(Usuario));
  };
}

const obtenerUsuarioAction = (Usuario) => ({
  type: OBTENER_USUARIO_EDITAR,
  payload: Usuario,
});

export function editarUsuarioAction(Usuario) {
  return async (dispatch) => {
    dispatch(editarUsuario());

    try {
      const cliente = await clienteAxios();
      // Usuario.contrasena = '1234';
      await cliente.put(`/usuario`, Usuario);
      dispatch(editarUsuarioExito(Usuario));
    } catch (error) {
      dispatch(editarUsuarioError());
    }
  };
}

const editarUsuario = () => ({
  type: COMENZAR_EDICION_USUARIO,
  payload: true,
});

const editarUsuarioExito = (Usuario) => ({
  type: USUARIO_EDITADO_EXITO,
  payload: Usuario,
});

const editarUsuarioError = () => ({
  type: USUARIO_EDITADO_ERROR,
  payload: true,
});

export function borrarUsuarioAction(id) {
  return async (dispatch) => {
    dispatch(obtenerUsuarioEliminar(id));

    try {
      const cliente = await clienteAxios();
      const respuesta = await cliente.delete(`/usuario/${id}`);
      console.log(respuesta);
      dispatch(eliminarUsuarioExito(respuesta));
      Swal.fire({
        icon: 'success',
        title: 'usuario eliminado correctamente',
        showConfirmButton: false,
        timer: 2000,
      });
      //   Swal.fire('Exito', 'usuario eliminado correctamente', 'success');
    } catch (error) {
      dispatch(eliminarUsuarioError());
    }
  };
}

const obtenerUsuarioEliminar = (id) => ({
  type: OBTENER_USUARIO_ELIMINAR,
  payload: id,
});

const eliminarUsuarioExito = () => ({
  type: USUARIO_ELIMINADO_EXITO,
});

const eliminarUsuarioError = () => ({
  type: USUARIO_ELIMINADO_ERROR,
  payload: true,
});

export function crearNuevoUsuarioAction(usuario) {
  return async (dispatch) => {
    dispatch(agregarUsuario());

    try {
      // Insertar en la API
      const cliente = await clienteAxios();
      const respuesta = await cliente.post('/usuario', usuario);
      dispatch(agregarUsuarioExito(respuesta.data));
      //   Swal.fire('Correcto', 'El usuario se agregó correctamente', 'success');
      Swal.fire({
        icon: 'success',
        title: 'El usuario se agregó correctamente',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      dispatch(agregarUsuarioError(true));
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Hubo un error, intenta de nuevo',
        timer: 2000,
      });
    }
  };
}

const agregarUsuario = () => ({
  type: AGREGAR_USUARIO,
  payload: true,
});

const agregarUsuarioExito = (usuario) => ({
  type: AGREGAR_USUARIO_EXITO,
  payload: usuario,
});

const agregarUsuarioError = (estado) => ({
  type: AGREGAR_USUARIO_ERROR,
  payload: estado,
});
