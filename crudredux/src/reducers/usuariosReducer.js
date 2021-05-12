import {
  COMENZAR_DESCARGA_USUARIOS,
  COMENZAR_EDICION_USUARIO,
  DESCARGA_USUARIOS_ERROR,
  DESCARGA_USUARIOS_EXITO,
  OBTENER_USUARIO_EDITAR,
  OBTENER_USUARIO_ELIMINAR,
  USUARIO_EDITADO_EXITO,
  USUARIO_ELIMINADO_ERROR,
  USUARIO_ELIMINADO_EXITO,
} from '../types';

const initialState = {
  usuarios: [],
  loading: false,
  error: null,
  usuarioeditar: null,
  usuarioeliminar: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case COMENZAR_EDICION_USUARIO:
    case COMENZAR_DESCARGA_USUARIOS:
      return {
        ...state,
        loading: action.payload,
      };
    case DESCARGA_USUARIOS_EXITO:
      return {
        ...state,
        usuarios: action.payload,
        loading: false,
      };

    case USUARIO_ELIMINADO_ERROR:
    case DESCARGA_USUARIOS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case OBTENER_USUARIO_EDITAR:
      return {
        ...state,
        usuarioeditar: action.payload,
      };

    case USUARIO_EDITADO_EXITO:
      return {
        ...state,
        usuarioeditar: null,
        usuarios: state.usuarios.map((usuario) =>
          usuario.id === action.payload.id ? (usuario = action.payload) : usuario
        ),
      };

    case OBTENER_USUARIO_ELIMINAR:
      return {
        ...state,
        usuarioeliminar: action.payload,
      };

    case USUARIO_ELIMINADO_EXITO:
      return {
        ...state,
        usuarios: state.usuarios.filter((usuario) => usuario.id !== state.usuarioeliminar),
        usuarioeliminar: null,
      };
    default:
      return state;
  }
};

export default reducer;
