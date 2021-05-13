import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mostrarAlerta, ocultarAlerta } from '../../actions/alertaActions';
import { setTableTitle } from '../../actions/productoActions';
import { crearNuevoUsuarioAction, obtenerUsuariosAction } from '../../actions/usuarioActions';
import Usuario from './Usuario';
import { useHistory } from 'react-router-dom';

const Usuarios = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    const cargar = () => dispatch(obtenerUsuariosAction());
    cargar();
    dispatch(setTableTitle({ tableTitle: 'Listado de usuarios' }));
  }, [dispatch]);

  const usuarios = useSelector((state) => state.usuarios.usuarios);
  const error = useSelector((state) => state.usuarios.error);
  const cargando = useSelector((state) => state.usuarios.loading);
  const alerta = useSelector((state) => state.alerta.alerta);
  const titulos = useSelector((state) => state.productos.titulos);

  const [isNew, setIsNew] = useState(false);
  const [newUser, setNewUser] = useState({});

  const agregar = (e) => {
    setIsNew(true);
    setNewUser({ nombre: '', apellido: '', fecha: '', correo: '', idGrupo: 0, contrasena: '12345' });

    dispatch(setTableTitle({ tableTitle: 'Agregar nuevo usuario' }));
  };

  const guardar = (e) => {
    newUser.idGrupo = Number(newUser.idGrupo);
    console.log(newUser);
    if (newUser.nombre === '' || newUser.idGrupo === 0) {
      const alerta = {
        msg: 'Campos son obligatorios',
        classes: 'alert alert-danger text-center text-uppercase p3',
      };

      dispatch(mostrarAlerta(alerta));
      return;
    }
    dispatch(ocultarAlerta());
    dispatch(crearNuevoUsuarioAction(newUser));
    setIsNew(false);
    dispatch(setTableTitle({ tableTitle: 'Listado de usuarios' }));
  };

  const onChangeEvent = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const cancelar = (e) => {
    setIsNew(false);
    dispatch(setTableTitle({ tableTitle: 'Listado de usuarios' }));
    dispatch(ocultarAlerta());
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">{titulos.tableTitle}</h1>

      {error ? <p className="font-weight-bold alert alert-danger text-center mt-2">Hubo un error</p> : null}
      {cargando ? <p className="text-center mt-2">Cargando...</p> : null}
      <div className="float-sm-end">
        {isNew ? (
          <input type="button" className="btn btn-light" value="Volver al listado" onClick={cancelar} />
        ) : (
          <input type="button" className="btn btn-light" value="Agregar nuevo" onClick={agregar} />
        )}
      </div>
      {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Fecha</th>
            <th scope="col">Correo</th>
            <th scope="col">IdGrupo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>

        {isNew ? (
          <Fragment>
            <tbody>
              <tr>
                <td>
                  <input type="text" name="nombre" value={newUser.nombre} onChange={onChangeEvent} />
                </td>
                <td>
                  <input type="text" name="apellido" value={newUser.apellido} onChange={onChangeEvent} />
                </td>
                <td>
                  <input type="date" name="fecha" value={newUser.fecha} onChange={onChangeEvent} />
                </td>
                <td>
                  <input type="email" name="correo" value={newUser.correo} onChange={onChangeEvent} />
                </td>
                <td>
                  <input type="number" name="idGrupo" value={newUser.idGrupo} onChange={onChangeEvent} />
                </td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                    <input
                      type="button"
                      className="btn btn-outline-success"
                      onClick={() => guardar(newUser)}
                      value="Guardar"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </Fragment>
        ) : (
          <Fragment>
            <tbody>
              {console.log(usuarios)}
              {usuarios.length === 0
                ? 'No hay usuarios'
                : usuarios.map((row) => <Usuario key={row.id} data={row} history={history} />)}
            </tbody>
          </Fragment>
        )}
      </table>
    </Fragment>
  );
};

export default Usuarios;
