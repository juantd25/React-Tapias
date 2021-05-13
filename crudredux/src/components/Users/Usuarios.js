import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mostrarAlerta, ocultarAlerta } from '../../actions/alertaActions';
import { setTableTitle } from '../../actions/productoActions';
import { crearNuevoUsuarioAction, obtenerUsuariosAction } from '../../actions/usuarioActions';
import Usuario from './Usuario';

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Icon, IconButton, Input, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

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
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Usuarios = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const cargar = () => dispatch(obtenerUsuariosAction());
    cargar();
    dispatch(setTableTitle({ tableTitle: 'Listado de usuarios' }));
  }, [dispatch]);

  const usuarios = useSelector((state) => state.usuarios.usuarios);
  const error = useSelector((state) => state.usuarios.error);
  const loading = useSelector((state) => state.usuarios.loading);
  const alerta = useSelector((state) => state.alerta.alerta);
  const titulos = useSelector((state) => state.productos.titulos);

  const classes = useStyles();

  const [isNew, setIsNew] = useState(false);
  const [newUser, setNewUser] = useState({});

  const agregar = (e) => {
    setIsNew(true);
    setNewUser({ nombre: '', apellido: '', fecha: '', correo: '', idGrupo: '', contrasena: '12345' });

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
      {loading ? <p className="text-center mt-2">Cargando...</p> : null}
      <div className="float-sm-end">
        {isNew ? (
          <Button variant="outlined" onClick={cancelar}>
            Volver al listado
          </Button>
        ) : (
          <Button variant="outlined" onClick={agregar}>
            Agregar nuevo
          </Button>
        )}
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="Tabla de usuarios">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Apellido</StyledTableCell>
              <StyledTableCell>Fecha</StyledTableCell>
              <StyledTableCell>Correo</StyledTableCell>
              <StyledTableCell>IdGrupo</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          {isNew ? (
            <TableBody>
              <TableRow>
                <TableCell>
                  <Input placeholder="Nombre" name="nombre" value={newUser.nombre} onChange={onChangeEvent} />
                </TableCell>
                <TableCell>
                  <Input placeholder="Apellido" name="apellido" value={newUser.apellido} onChange={onChangeEvent} />
                </TableCell>
                <TableCell>
                  <TextField type="datetime-local" name="fecha" value={newUser.fecha} onChange={onChangeEvent} />
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="Correo"
                    type="email"
                    name="correo"
                    value={newUser.correo}
                    onChange={onChangeEvent}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="idGrupo"
                    type="number"
                    name="idGrupo"
                    value={newUser.idGrupo}
                    onChange={onChangeEvent}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Icon>save</Icon>}
                    onClick={() => guardar(newUser)}
                  >
                    Guardar
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {usuarios.length === 0
                ? 'No hay usuarios'
                : usuarios.map((row) =>
                    row.correo === 'admin@admin.com' ? null : <Usuario key={row.idUsuario} data={row} />
                  )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {alerta ? (
        <Alert
          onClose={() => {
            dispatch(ocultarAlerta());
          }}
          severity="error"
        >
          {alerta.msg}
        </Alert>
      ) : null}
    </Fragment>
  );
};

export default Usuarios;
