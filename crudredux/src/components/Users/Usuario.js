import { ButtonGroup, Icon, IconButton, Input, TableCell, TableRow, TextField } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { setTableTitle } from '../../actions/productoActions';
import { borrarUsuarioAction, editarUsuarioAction, obtenerUsuarioEditar } from '../../actions/usuarioActions';

const Usuario = ({ data }) => {
  if (data.fecha === null) {
    data.fecha = '';
  }
  const { nombre, apellido, idUsuario, correo, fecha = '', idGrupo } = data;

  const dispatch = useDispatch();

  const [editar, setEditar] = useState(false);
  const [userEdited, setUserEdited] = useState({});
  const [userReset, setUserReset] = useState(false);

  const eliminarEvent = (idUsuario) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No puede revertir el borrado de un usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#da292e',
      cancelButtonColor: '#495057',
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(borrarUsuarioAction(idUsuario));
      }
    });
  };

  const onChangeEvent = (e) => {
    setUserEdited({
      ...userEdited,
      [e.target.name]: e.target.value,
    });
  };

  const editarEvent = (msg, user) => {
    dispatch(obtenerUsuarioEditar(user));

    if (editar) {
      Swal.fire({
        icon: 'error',
        title: 'El usuario no es editable',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    setUserEdited(user);
    dispatch(setTableTitle({ tableTitle: 'Editando a ' + nombre }));

    if (msg === 'resetPassword') {
      setUserReset(true);
      setEditar(true);
    } else {
      setEditar(true);
    }
  };

  const guardarEvent = () => {
    userEdited.idGrupo = Number(userEdited.idGrupo);
    userEdited.fecha = userEdited.fecha.replace(-6, '-05:00');
    console.log(userEdited.fecha);
    dispatch(editarUsuarioAction(userEdited));
    setEditar(false);

    Swal.fire({
      toast: true,
      icon: 'success',
      title: 'Guardado correctamente',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
    });
    dispatch(setTableTitle({ tableTitle: 'Listado de usuarios' }));
  };

  const cancelarEvent = () => {
    setEditar(false);
    dispatch(setTableTitle({ tableTitle: 'Listado de usuarios' }));
  };

  const abrirModalEvent = (userEdit) => {
    Swal.mixin({
      input: 'password',
      confirmButtonText: 'Siguiente &rarr;',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      progressSteps: ['1', '2'],
    })
      .queue([
        {
          title: 'Ingrese nueva contraseña',
        },
        {
          title: 'Confirme contraseña',
        },
      ])
      .then((result) => {
        setUserReset(false);
        if (result.value) {
          const passsword = result.value;
          if (passsword[0] === passsword[1]) {
            userEdit.contrasena = passsword[0];
            dispatch(editarUsuarioAction(userEdited));
            Swal.fire({
              title: 'Actualización correcta',
              confirmButtonText: 'OK',
            }).then(cancelarEvent());
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Las contraseñas ingresadas no coinciden',
              showConfirmButton: false,
              timer: 2000,
            }).then((result) => {
              abrirModalEvent(userEdit);
            });
          }
        }
        if (!result.isConfirmed) {
          // cancelarEvent();
        }
      });

    // Swal.fire({
    //   title: 'Ingrese contraseña',
    //   input: 'password',
    //   inputAttributes: {
    //     autocapitalize: 'off',
    //   },
    //   showCancelButton: true,
    //   confirmButtonText: 'Cambiar',
    //   showLoaderOnConfirm: true,
    //   cancelButtonText: 'Cancelar',
    //   preConfirm: (pass) => {
    //     setUserReset(false);
    //     userEdit.contrasena = pass;
    //     console.log(userEdit);
    //     dispatch(editarUsuarioAction(userEdited));
    //   },
    //   allowOutsideClick: () => !Swal.isLoading(),
    // }).then((result) => {
    //   console.log(result);
    //   setEditar(false);
    //   setUserReset(false);
    //   dispatch(setTableTitle({ tableTitle: 'Listado de usuarios' }));
    //   if (result.isConfirmed) {
    //     Swal.fire({
    //       title: 'Actualización completa',
    //     });
    //   }
    // });
  };

  return (
    <Fragment>
      {editar ? (
        <TableRow>
          <TableCell component="th" scope="row">
            <Input type="text" name="nombre" value={userEdited.nombre} onChange={onChangeEvent} />
          </TableCell>
          <TableCell>
            <Input type="text" name="apellido" value={userEdited.apellido} onChange={onChangeEvent} />
          </TableCell>
          <TableCell>
            <TextField
              type="datetime-local"
              name="fecha"
              value={userEdited.fecha ? userEdited.fecha.substr(0, 16) : ''}
              onChange={onChangeEvent}
            />
          </TableCell>
          <TableCell>
            <Input type="email" name="correo" value={userEdited.correo} onChange={onChangeEvent} />
          </TableCell>
          <TableCell>
            <Input type="number" name="idGrupo" value={userEdited.idGrupo} onChange={onChangeEvent} />
          </TableCell>
          <TableCell align="center">
            <ButtonGroup variant="text" color="primary">
              <IconButton title="Edición" disabled>
                <Icon>edit</Icon>
              </IconButton>
              <IconButton title="Guardar" color="default" onClick={() => guardarEvent(data)}>
                <Icon>save</Icon>
              </IconButton>
              <IconButton title="Cancelar" color="secondary" onClick={() => cancelarEvent(data)}>
                <Icon>cancel</Icon>
              </IconButton>
            </ButtonGroup>
          </TableCell>
          {userReset ? abrirModalEvent(userEdited) : null}
        </TableRow>
      ) : (
        <TableRow>
          <TableCell>{nombre}</TableCell>
          <TableCell>{apellido}</TableCell>
          <TableCell>{fecha ? fecha.substr(0, 10) : ''}</TableCell>
          <TableCell>{correo}</TableCell>
          <TableCell>{idGrupo}</TableCell>
          <TableCell align="center">
            <ButtonGroup variant="text" color="primary">
              <IconButton title="Editar" color="default" onClick={() => editarEvent('editUser', data)}>
                <Icon>edit</Icon>
              </IconButton>
              <IconButton title="Borrar" color="secondary" onClick={() => eliminarEvent(idUsuario)}>
                <Icon>delete</Icon>
              </IconButton>
              <IconButton
                title="Cambiar contraseña"
                color="primary"
                onClick={() => {
                  editarEvent('resetPassword', data);
                }}
              >
                <Icon>published_with_changes</Icon>
              </IconButton>
            </ButtonGroup>
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  );
};

// const Toast = Swal.fire({
//   toast: true,
//   showConfirmButton: false,
//   timer: 2000,
//   timerProgressBar: false,
//   onOpen: (toast) => {
//     toast.addEventListener('mouseenter', Swal.stopTimer);
//     toast.addEventListener('mouseleave', Swal.resumeTimer);
//   },
// });

export default Usuario;
