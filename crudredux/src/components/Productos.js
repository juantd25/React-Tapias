import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mostrarAlerta, ocultarAlerta } from '../actions/alertaActions';
import { crearNuevoProductoAction, obtenerProductosAction, setTableTitle } from '../actions/productoActions';
import Producto from './Producto';

const Productos = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cargarProductos = () => dispatch(obtenerProductosAction());
    cargarProductos();
    dispatch(setTableTitle({ tableTitle: 'Listado de productos' }));
  }, []);

  const productos = useSelector((state) => state.productos.productos);
  const error = useSelector((state) => state.productos.error);
  const cargando = useSelector((state) => state.productos.loading);
  const alerta = useSelector((state) => state.alerta.alerta);
  const titulos = useSelector((state) => state.productos.titulos);

  const [isNew, setIsNew] = useState(false);
  const [newProduct, setNewProduct] = useState({});

  const addProducto = (e) => {
    setIsNew(true);
    setNewProduct({ nombre: '', precio: 0, edit: true });

    dispatch(setTableTitle({ tableTitle: 'Agregar nuevo producto' }));
  };

  const saveProduct = (e) => {
    newProduct.precio = Number(newProduct.precio);

    if (newProduct.nombre === '' || newProduct.precio === 0) {
      const alerta = {
        msg: 'Ambos campos son obligatorios',
        classes: 'alert alert-danger text-center text-uppercase p3',
      };

      dispatch(mostrarAlerta(alerta));
      return;
    }
    dispatch(ocultarAlerta());
    dispatch(crearNuevoProductoAction(newProduct));
    setIsNew(false);
    dispatch(setTableTitle({ tableTitle: 'Listado de productos' }));
  };

  const onChangeValues = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const cancelNewProduct = (e) => {
    setIsNew(false);
    dispatch(setTableTitle({ tableTitle: 'Listado de productos' }));
    dispatch(ocultarAlerta());
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">{titulos.tableTitle}</h1>

      {error ? <p className="font-weight-bold alert alert-danger text-center mt-2">Hubo un error</p> : null}
      {cargando ? <p className="text-center mt-2">Cargando...</p> : null}
      <div className="float-sm-end">
        {isNew ? (
          <input type="button" className="btn btn-light" value="Volver al listado" onClick={cancelNewProduct} />
        ) : (
          <input type="button" className="btn btn-light" value="Agregar nuevo" onClick={addProducto} />
        )}
      </div>
      {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>

        {isNew ? (
          <Fragment>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    name="nombre"
                    value={newProduct.nombre}
                    onChange={onChangeValues}
                    placeholder="Nombre"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="precio"
                    value={newProduct.precio}
                    onChange={onChangeValues}
                    placeholder="precio"
                  />
                </td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                    <input
                      type="button"
                      className="btn btn-outline-success"
                      onClick={() => saveProduct(newProduct)}
                      value="Guardar"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </Fragment>
        ) : (
          <Fragment>
            {console.log(productos)}
            <tbody>
              {productos.length === 0
                ? 'No hay productos'
                : productos.map((producto) => <Producto key={producto.id} producto={producto} />)}
            </tbody>
          </Fragment>
        )}
      </table>
    </Fragment>
  );
};

export default Productos;
