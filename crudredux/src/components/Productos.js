import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductosAction } from '../actions/productoActions';
import Producto from './Producto';

const Productos = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cargarProductos = () => dispatch(obtenerProductosAction());
    cargarProductos();
  }, []);

  const productos = useSelector((state) => state.productos.productos);
  const error = useSelector((state) => state.productos.error);
  const cargando = useSelector((state) => state.productos.loading);

  return (
    <Fragment>
      <h1 className="text-center my-5">Listado de productos</h1>

      {error ? <p className="font-weight-bold alert alert-danger text-center mt-2">Hubo un error</p> : null}
      {cargando ? <p className="text-center mt-2">Cargando...</p> : null}

      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0
            ? 'No hay productos'
            : productos.map((producto) => <Producto key={producto.id} producto={producto} />)}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Productos;
