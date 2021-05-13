import {
  AGREGAR_USUARIO,
  AGREGAR_USUARIO_ERROR,
  AGREGAR_USUARIO_EXITO,
  COMENZAR_DESCARGA_USUARIOS,
  COMENZAR_EDICION_USUARIO,
  DESCARGA_USUARIOS_ERROR,
  DESCARGA_USUARIOS_EXITO,
  OBTENER_USUARIO_EDITAR,
  OBTENER_USUARIO_ELIMINAR,
  USUARIO_EDITADO_ERROR,
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
    case AGREGAR_USUARIO:
      return {
        ...state,
        loading: action.payload,
      };

    case AGREGAR_USUARIO_EXITO:
      console.log(state.usuarios);
      console.log(action.payload);
      return { ...state, loading: false, usuarios: [...state.usuarios, action.payload] };

    case DESCARGA_USUARIOS_EXITO:
      return {
        ...state,
        usuarios: action.payload,
        loading: false,
      };

    case USUARIO_EDITADO_ERROR:
    case AGREGAR_USUARIO_ERROR:
    case USUARIO_ELIMINADO_ERROR:
    case DESCARGA_USUARIOS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case OBTENER_USUARIO_ELIMINAR:
      return {
        ...state,
        usuarioeliminar: action.payload,
      };

    case USUARIO_ELIMINADO_EXITO:
      return {
        ...state,
        usuarios: state.usuarios.filter((usuario) => usuario.idUsuario !== state.usuarioeliminar),
        usuarioeliminar: null,
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
        loading: false,
        usuarios: state.usuarios.map((usuario) =>
          usuario.idUsuario === action.payload.idUsuario ? (usuario = action.payload) : usuario
        ),
      };
    default:
      return state;
  }
};

export default reducer;
