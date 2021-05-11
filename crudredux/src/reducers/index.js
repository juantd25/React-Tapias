import { combineReducers } from 'redux';
import alertaReducer from './alertaReducer';
import productosReducer from './productosReducer';
import vistaReducer from './vistaReducer';

export default combineReducers({
  productos: productosReducer,
  alerta: alertaReducer,
  vista: vistaReducer,
});
