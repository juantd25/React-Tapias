import { combineReducers } from 'redux';
import alertaReducer from './alertaReducer';
import productosReducer from './productosReducer';
import vistaReducer from './vistaReducer';
import usuariosReducer from './usuariosReducer';

export default combineReducers({
  productos: productosReducer,
  alerta: alertaReducer,
  vista: vistaReducer,
  usuarios: usuariosReducer,
});
