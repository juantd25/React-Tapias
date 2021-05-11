import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  borrarProductoAction,
  editarProductoAction,
  obtenerProductoEditar,
  setTableTitle,
} from '../actions/productoActions';
import Swal from 'sweetalert2';
const Producto = ({ producto }) => {
  const { nombre, precio, id, edit } = producto;

  const dispatch = useDispatch();

  const [editar, setEditar] = useState(false);
  const [productEdited, setProducto] = useState({});

  const confirmarEliminarProducto = (id) => {
    Swal.fire({
      title: 'Esta seguro?',
      text: 'No puede revertir el borrado de un producto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#da292e',
      cancelButtonColor: '#495057',
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(borrarProductoAction(id));
      }
    });
  };

  const onChangeValues = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const editarProducto = (producto) => {
    dispatch(obtenerProductoEditar(producto));

    if (!edit) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El Producto no es editable',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    setEditar(true);
    setProducto(producto);
    dispatch(setTableTitle({ tableTitle: 'Editar producto id = ' + producto.id }));
  };

  const guardarProducto = () => {
    productEdited.precio = Number(productEdited.precio);
    dispatch(editarProductoAction(productEdited));
    setEditar(false);
    Toast.fire({
      position: 'right',
      icon: 'success',
      title: 'Guardado correctamente',
    });
    dispatch(setTableTitle({ tableTitle: 'Listado de productos' }));
  };

  const cancelarEdicion = () => {
    setEditar(false);
    dispatch(setTableTitle({ tableTitle: 'Listado de productos' }));
  };

  return (
    <tr>
      {editar ? (
        <Fragment>
          <td>
            <input type="text" name="nombre" value={productEdited.nombre} onChange={onChangeValues} />
          </td>
          <td>
            <input type="number" name="precio" value={productEdited.precio} onChange={onChangeValues} />
          </td>
          <td>
            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
              <i
                className="btn btn-outline-success btn-lg bi bi-check-lg"
                onClick={() => guardarProducto(producto)}
              ></i>
              <i className="btn btn-danger btn-lg bi bi-x-lg" onClick={() => cancelarEdicion(producto)}></i>
            </div>
          </td>
        </Fragment>
      ) : (
        <Fragment>
          <td>{nombre}</td>
          <td>{precio}</td>
          <td>
            <div className="btn-group flex" role="group" aria-label="Basic outlined example">
              <i className="btn btn-outline-primary btn-lg bi bi-brush" onClick={() => editarProducto(producto)}></i>
              <i className="btn btn-danger btn-lg bi bi-trash" onClick={() => confirmarEliminarProducto(id)}></i>
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

export default Producto;
