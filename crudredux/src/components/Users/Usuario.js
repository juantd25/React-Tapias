import {
  ButtonGroup,
  Icon,
  IconButton,
  Input,
  makeStyles,
  TableCell,
  TableRow,
  TextField,
  withStyles,
} from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { setTableTitle } from '../../actions/productoActions';
import { borrarUsuarioAction, editarUsuarioAction, obtenerUsuarioEditar } from '../../actions/usuarioActions';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.focus,
    },
  },
}))(TableRow);

const Usuario = ({ data }) => {
  if (data.fecha === null) {
    data.fecha = '';
  }
  const { nombre, apellido, idUsuario, correo, fecha = '', idGrupo } = data;

  const dispatch = useDispatch();

  const [editar, setEditar] = useState(false);
  const [userEdited, setUserEdited] = useState({});

  const classes = useStyles();

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
    dispatch(setTableTitle({ tableTitle: 'Editando a ' + nombre }));
  };

  const guardarEvent = () => {
    userEdited.idGrupo = Number(userEdited.idGrupo);
    dispatch(editarUsuarioAction(userEdited));
    setEditar(false);
    Toast.fire({
      position: 'right',
      icon: 'success',
      title: 'Guardado correctamente',
    });
    dispatch(setTableTitle({ tableTitle: 'Listado de usuarios' }));
  };

  const cancelarEvent = () => {
    setEditar(false);
    dispatch(setTableTitle({ tableTitle: 'Listado de usuarios' }));
  };

  return (
    <Fragment>
      {editar ? (
        <StyledTableRow>
          <StyledTableCell component="th" scope="row">
            <Input type="text" name="nombre" value={userEdited.nombre} onChange={onChangeEvent} />
          </StyledTableCell>
          <StyledTableCell>
            <Input type="text" name="apellido" value={userEdited.apellido} onChange={onChangeEvent} />
          </StyledTableCell>
          <StyledTableCell>
            <TextField
              type="datetime-local"
              name="fecha"
              value={userEdited.fecha ? userEdited.fecha.substr(0, 16) : ''}
              onChange={onChangeEvent}
            />
          </StyledTableCell>
          <StyledTableCell>
            <Input type="email" name="correo" value={userEdited.correo} onChange={onChangeEvent} />
          </StyledTableCell>
          <StyledTableCell>
            <Input type="number" name="idGrupo" value={userEdited.idGrupo} onChange={onChangeEvent} />
          </StyledTableCell>
          <StyledTableCell>
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
              <IconButton color="default" onClick={() => guardarEvent(data)}>
                <Icon>save</Icon>
              </IconButton>
              <IconButton color="secondary" onClick={() => cancelarEvent(data)}>
                <Icon>cancel</Icon>
              </IconButton>
            </ButtonGroup>
          </StyledTableCell>
        </StyledTableRow>
      ) : (
        <TableRow>
          <TableCell>{nombre}</TableCell>
          <TableCell>{apellido}</TableCell>
          <TableCell>{fecha ? fecha.substr(0, 10) : ''}</TableCell>
          <TableCell>{correo}</TableCell>
          <TableCell>{idGrupo}</TableCell>
          <TableCell>
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
              <IconButton color="default" onClick={() => editarEvent(data)}>
                <Icon>edit</Icon>
              </IconButton>
              <IconButton color="secondary" onClick={() => eliminarEvent(idUsuario)}>
                <Icon>delete</Icon>
              </IconButton>
            </ButtonGroup>
          </TableCell>
        </TableRow>
      )}
    </Fragment>
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

{
  /* <td>
            <input type="text" name="nombre" value={userEdited.nombre} onChange={onChangeEvent} />
          </td>
          <td>
            <input type="text" name="apellido" value={userEdited.apellido} onChange={onChangeEvent} />
          </td>
          <td>
            <input
              type="date"
              name="fecha"
              value={userEdited.fecha ? userEdited.fecha.substr(0, 10) : ''}
              onChange={onChangeEvent}
            />
          </td>
          <td>
            <input type="email" name="correo" value={userEdited.correo} onChange={onChangeEvent} />
          </td>
          <td>
            <input type="number" name="idGrupo" value={userEdited.idGrupo} onChange={onChangeEvent} />
          </td>
          <td>
            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
              <i className="btn btn-outline-success btn-lg bi bi-check-lg" onClick={() => guardarEvent(data)}></i>
              <i className="btn btn-danger btn-lg bi bi-x-lg" onClick={() => cancelarEvent(data)}></i>
            </div>
          </td> */
}

{
  /* <td>{nombre}</td>
          <td>{apellido}</td>
          <td>{fecha ? fecha.substr(0, 10) : ''}</td>
          <td>{correo}</td>
          <td>{idGrupo}</td>
          <td>
            <div className="btn-group flex" role="group" aria-label="Basic outlined example">
              <i className="btn btn-outline-primary btn-lg bi bi-brush" onClick={() => editarEvent(data)}></i>
              <i className="btn btn-danger btn-lg bi bi-trash" onClick={() => eliminarEvent(idUsuario)}></i>
            </div>
          </td> */
}
