import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions';
import Swal from 'sweetalert2';

const Producto = ({ producto }) => {
  const { nombre, precio, id } = producto;

  const dispatch = useDispatch();
  const history = useHistory();

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

  // redirección
  const redireccionarEdicion = (producto) => {
    dispatch(obtenerProductoEditar(producto));
    history.push(`/productos/editar/${producto.id}`);
  };

  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold">{precio}</span>
      </td>
      <td className="acciones">
        <input
          type="button"
          className="btn bttn-primary mr-2"
          onClick={() => redireccionarEdicion(producto)}
          value="Editar"
        />
        <input
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminarProducto(id)}
          value="Eliminar"
        />
      </td>
    </tr>
  );
};

export default Producto;
