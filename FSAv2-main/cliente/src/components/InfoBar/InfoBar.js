import React, { Fragment } from "react";
// import { Navbar, NavItem, Icon } from "react-materialize";
import "./InfoBar.css";

const InfoBar = ({ room }) => {
  return (
    <Fragment>
      <nav>
        <div className="nav-wrapper">
          <a href="#!" className="brand-logo center">
            FSA
          </a>
          {/* <a
            href="#!"
            data-target="mobile-demo"
            className="sidenav-trigger right"
          >
            <i className="material-icons">more_vert</i>
          </a> */}
          <form className="left">
            <div className="input-field">
              <input id="search" type="search" required />
              <label className="label-icon" for="search">
                <i className="material-icons">search</i>
              </label>
            </div>
          </form>
          <ul className="right">
            <li>
              <a href="/">
                <i className="material-icons">exit_to_app</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {/* <ul className="sidenav" id="mobile-demo">
        <li>
          <a href="/">Salir</a>
        </li>
      </ul> */}
    </Fragment>
  );
};

export default InfoBar;
