import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { setTableTitle } from '../../actions/productoActions';
import { borrarUsuarioAction, editarUsuarioAction, obtenerUsuarioEditar } from '../../actions/usuarioActions';

const Usuario = ({ data, history }) => {
  if (data.fecha === null) {
    data.fecha = '';
  }
  const { nombre, apellido, idUsuario, correo, fecha = '', idGrupo } = data;

  const dispatch = useDispatch();

  const [editar, setEditar] = useState(false);
  const [userEdited, setUserEdited] = useState({});

  const eliminarEvent = (idUsuario) => {
    Swal.fire({
      title: 'Esta seguro?',
      text: 'No puede revertir el borrado de un data',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#da292e',
      cancelButtonColor: '#495057',
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(borrarUsuarioAction(idUsuario));
        history.push('/Usuarios');
      }
    });
  };

  const onChangeEvent = (e) => {
    setUserEdited({
      ...userEdited,
      [e.target.name]: e.target.value,
    });
  };

  const editarEvent = (data) => {
    dispatch(obtenerUsuarioEditar(data));

    if (editar) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El usuario no es editable',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    setEditar(true);
    setUserEdited(data);
    dispatch(setTableTitle({ tableTitle: 'Editar usuarios id = ' + idUsuario }));
  };

  const guardarEvent = () => {
    console.log('editado', userEdited);

    userEdited.idGrupo = Number(userEdited.idGrupo);
    dispatch(editarUsuarioAction(userEdited));
    setEditar(false);
    Toast.fire({
      position: 'right',
      icon: 'success',
      title: 'Guardado correctamente',
    });
    dispatch(setTableTitle({ tableTitle: 'Listado de usuarios' }));
    history.push('/Usuarios');
  };

  const cancelarEvent = () => {
    setEditar(false);
    dispatch(setTableTitle({ tableTitle: 'Listado de usuarios' }));
  };

  return (
    <tr>
      {editar ? (
        <Fragment>
          <td>
            <input type="text" name="nombre" value={userEdited.nombre} onChange={onChangeEvent} />
          </td>
          <td>
            <input type="text" name="apellido" value={userEdited.apellido} onChange={onChangeEvent} />
          </td>
          <td>
            <input type="date" name="fecha" value={userEdited.fecha} onChange={onChangeEvent} />
          </td>
          <td>
            <input type="email" name="correo" value={userEdited.correo} onChange={onChangeEvent} />
          </td>
          <td>
            <input type="number" name="idGrupo" value={userEdited.idGrupo} onChange={onChangeEvent} />
          </td>
          <td>
            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
              <i className="btn btn-outline-success btn-lg bi bi-check-lg" onClick={() => guardarEvent()}></i>
              <i className="btn btn-danger btn-lg bi bi-x-lg" onClick={() => cancelarEvent()}></i>
            </div>
          </td>
        </Fragment>
      ) : (
        <Fragment>
          <td>{nombre}</td>
          <td>{apellido}</td>
          <td>{fecha ? fecha.substr(0, 10) : ''}</td>
          <td>{correo}</td>
          <td>{idGrupo}</td>
          <td>
            <div className="btn-group flex" role="group" aria-label="Basic outlined example">
              <i className="btn btn-outline-primary btn-lg bi bi-brush" onClick={() => editarEvent(data)}></i>
              <i className="btn btn-danger btn-lg bi bi-trash" onClick={() => eliminarEvent(idUsuario)}></i>
            </div>
          </td>
        </Fragment>
      )}
    </tr>
  );
};

const Toast = Swal.mixin({
  toast: true,
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

export default Usuario;
