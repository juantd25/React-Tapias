import React from 'react';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import List from './List';
// import M from 'materialize-css';
import login from '../index';

const App = props => {
	const signout = e => {
		e.preventDefault();
		e.stopPropagation();
		login('/login/signout');
	};

	const openModal = e => {
		let instance2 = M.Modal.getInstance(document.getElementById('modalMaterialize'));
		instance2.open();
	};

	return (
		<Router>
			{props.login && <Redirect to="/signin" />}
			{!props.login && <Redirect to="/" />}

			{/* {console.log(props.link)} */}
			<nav>
				<div className="nav-wrapper">
					<Link to="/" className="brand-logo hide-on-med-and-down">
						Flag Control de Acceso - Censo
					</Link>
					<Link to="/" className="brand-logo hide-on-large-only">
						FCA-Censo
					</Link>

					<ul>
						<li className="right hide-on-med-and-down" id="exit" hidden onClick={() => signout(event)}>
							<Link to="/">Salir</Link>
						</li>
						<li className="right hide-on-med-and-down" id="add_person" onClick={() => openModal(event)}>
							<Link to="/">
								<i className="material-icons left">person_add</i>Añadir registro
							</Link>
						</li>
					</ul>
				</div>
			</nav>

			<Switch>
				<Route path="/signup" component={Login} />
				<Route path="/signin" component={Login} />
			</Switch>
			{!props.login && (
				<Switch>
					<Route path="/" component={List}></Route>
				</Switch>
			)}

			<footer className="page-footer center">
				<a href="https://flagsoluciones.com/" className="brand-logo" target="_blank">
					<img src="images/logo.png" height="50" />
				</a>
			</footer>
		</Router>
	);
};

export default App;
