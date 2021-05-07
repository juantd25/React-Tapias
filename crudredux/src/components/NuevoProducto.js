import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mostrarAlerta, ocultarAlerta } from '../actions/alertaActions';
import { crearNuevoProductoAction } from '../actions/productoActions';

const NuevoProducto = ({ history }) => {
  // state del componente
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);

  // usar hook useDispatch
  const dispatch = useDispatch();

  // Acceder al state del store
  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);
  const alerta = useSelector((state) => state.alerta.alerta);

  // llamar action
  const agregarProducto = (producto) => {
    dispatch(crearNuevoProductoAction(producto));
  };

  const submitNuevoProducto = (e) => {
    e.preventDefault();

    // validar formulario
    if (nombre.trim() === '' || precio <= 0) {
      const alerta = {
        msg: 'Ambos campos son obligatorios',
        classes: 'alert alert-danger text-center text-uppercase p3',
      };

      dispatch(mostrarAlerta(alerta));

      return;
    }

    dispatch(ocultarAlerta());

    // crear producto
    agregarProducto({
      nombre,
      precio,
    });

    // Redireccionar
    history.push('/');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">Agregar nuevo producto</h2>

            {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}

            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="precio"
                  onChange={(e) => setPrecio(Number(e.target.value))}
                />
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                  value="Agregar"
                />
              </div>

              {cargando ? <p>Cargando...</p> : null}
              {error ? <p className="alert alert-danger p2 mt-2">Hubo un error</p> : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
