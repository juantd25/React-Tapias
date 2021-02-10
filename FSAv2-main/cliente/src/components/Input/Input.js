import React from "react";

const Input = ({ setMessage, sendMessage, message }) => {
  return (
    <form className="input-field inline">
      <div className="row">
        <div className="col s10">
          <input
            type="text"
            placeholder="Escribe tu pregunta"
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={(event) =>
              event.key === "Enter" ? sendMessage(event) : null
            }
          />
        </div>
        <div className="col s1">
          <a
            href="#!"
            className="btn-floating btn-large waves-effect waves-light red darken-4 animate__animated animate__rollIn"
            onClick={(e) => sendMessage(e)}
          >
            <i className="material-icons">near_me</i>
          </a>
        </div>
        <div className="col s1">
          <div className="fixed-action-btn toolbar">
            <a className="btn-floating btn-small light-blue darken-4">
              <i className="large material-icons">more_vert</i>
            </a>
            <ul>
              <li className="waves-effect waves-light">
                <a
                  href="#!"
                  class="btn tooltipped"
                  data-position="top"
                  data-tooltip="Lectura de imágenes"
                >
                  <i className="material-icons">photo_size_select_large</i>
                </a>
              </li>
              <li className="waves-effect waves-light">
                <a
                  href="#!"
                  class="btn tooltipped"
                  data-position="top"
                  data-tooltip="Gestionar Tokens"
                >
                  <i className="material-icons">vpn_key</i>
                </a>
              </li>
              <li className="waves-effect waves-light">
                <a
                  href="#!"
                  class="btn tooltipped"
                  data-position="top"
                  data-tooltip="Crear usuarios"
                >
                  <i className="material-icons">group_add</i>
                </a>
              </li>
              <li className="waves-effect waves-light">
                <a
                  href="#!"
                  class="btn tooltipped"
                  data-position="top"
                  data-tooltip="Actualizar aprobadores"
                >
                  <i className="material-icons">update</i>
                </a>
              </li>
              <li className="waves-effect waves-light">
                <a
                  href="#!"
                  class="btn tooltipped"
                  data-position="top"
                  data-tooltip="Descargar reportes CSV"
                >
                  <i className="material-icons">file_download</i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Input;
