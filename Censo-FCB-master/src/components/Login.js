import React, { Component } from 'react';
import 'materialize-css';
import App from './App';
import ReactDOM from 'react-dom';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { Select, ProgressBar, Switch as Sw } from 'react-materialize';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { ADMIN: false };

		let CEDULA = { name: 'CEDULA', type: 'number', descript: 'Cédula' };
		let PASSWORD = { name: 'PASSWORD', type: 'password', descript: 'Contraseña' };
		let NOMBRE_PERSONA = { name: 'NOMBRE_PERSONA', type: 'text', descript: 'Nombre completo' };
		let ENTIDAD = { name: 'ENTIDAD', type: 'text', descript: 'Empresa / Entidad' };
		let NIT = { name: 'NIT', type: 'number', descript: 'Nit' };
		let CARGO = { name: 'CARGO', type: 'text', descript: 'Cargo' };

		this.inputs = [CEDULA, PASSWORD, NOMBRE_PERSONA, ENTIDAD, NIT, CARGO];
	}

	sendFormSignin(e) {
		// M.Toast.dismissAll();
		fetch('/login/signin', {
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
		})
			.then(res => res.json())
			.then(data => {
				// console.log(data);
				if (data.auth) {
					// M.toast({ html: 'Sesión iniciada' });
					Toast.fire({
						position: 'top',
						icon: 'success',
						title: 'Sesión iniciada'
					});
					this.setState({
						CEDULA: '',
						PASSWORD: ''
					});
					ReactDOM.unmountComponentAtNode(document.getElementById('root'));
					ReactDOM.render(<App login={false} />, document.getElementById('root'));
				} else if (data.user == false) {
					// M.toast({
					// 	html: 'El usuario no se encuentra registrado',
					// 	classes: 'red darken-4'
					// });
					Toast.fire({
						position: 'center',
						icon: 'error',
						title: 'El usuario no se encuentra registrado'
					});
				} else if (data.password == false) {
					// M.toast({
					// 	html: 'Contraseña incorrecta',
					// 	classes: 'red darken-4'
					// });
					Toast.fire({
						position: 'center',
						icon: 'error',
						title: 'Contraseña incorrecta'
					});
				}
			})
			.catch(err => console.error(err));

		e.preventDefault();
	}

	sendFormSignup(e) {
		// M.Toast.dismissAll();
		fetch('/login/signup', {
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
		})
			.then(res => res.json())
			.then(data => {
				// M.toast({ html: 'Registro completado' });

				this.setState({
					ADMIN: false,
					CARGO: '',
					CEDULA: '',
					ENTIDAD: '',
					NIT: '',
					NOMBRE_PERSONA: '',
					PASSWORD: '',
					TIPO_VINCULACION: ''
				});
				if (data.auth) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Registro completado',
						showConfirmButton: false,
						timer: 1500
					});
					ReactDOM.unmountComponentAtNode(document.getElementById('root'));
					// <Redirect to="/" />;
					ReactDOM.render(<App login={true} />, document.getElementById('root'));
				} else {
					Swal.fire({
						position: 'center',
						icon: 'error',
						title: 'Error en el servidor de registro',
						showConfirmButton: false,
						timer: 1500
					});
				}
			})
			.catch(err => console.error(err));

		e.preventDefault();
	}

	componentDidMount() {
		document.querySelector('#add_person').hidden = true;
		document.querySelector('#exit').hidden = true;
	}

	//Capturar datos ingresados
	changeHandler(event) {
		const { name, value, checked, type } = event.target;
		this.setState({
			[name]: type === 'checkbox' ? checked : value
		});
	}

	render() {
		return (
			<Switch>
				<Route path="/signin">
					<div className="container">
						<div className="container">
							<div className="container">
								<div className="card">
									<div className="card-content">
										<span className="card-title" name="title">
											Iniciar sesión
										</span>
										<label htmlFor="title">
											Para registrarse ingrese <Link to="/signup"> Aquí</Link>
										</label>
										<form onSubmit={() => this.sendFormSignin(event)}>
											<div className="row">
												<div className="input-field">
													<input
														className="validate"
														name="CEDULA"
														type="Number"
														placeholder="Cédula"
														onChange={() => this.changeHandler(event)}
														required
													/>
												</div>
											</div>
											<div className="row">
												<div className="input-field">
													<input
														className="validate"
														name="PASSWORD"
														type="password"
														placeholder="Contraseña"
														onChange={() => this.changeHandler(event)}
														required
													/>
												</div>
											</div>
											<div className="row">
												<button type="submit" className="btn waves-effect waves-light  light-blue darken-4 right">
													Iniciar
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Route>
				<Route path="/signup">
					<div className="container">
						<div className="card">
							<div className="card-content">
								<span className="card-title" name="title">
									Registrarse
								</span>
								<label htmlFor="title">
									Si ya se encuentra registrado ingresa <Link to="/signin">Aquí</Link>
								</label>
								{/* {console.log(this.state)} */}
								<form onSubmit={() => this.sendFormSignup(event)}>
									<div className="row">
										{this.inputs.map(input => {
											return (
												<div className="input-field col s12 m6 l6" key={input.name}>
													<input
														className="validate"
														name={input.name}
														type={input.type}
														placeholder={input.descript}
														onChange={() => this.changeHandler(event)}
														required
													/>
												</div>
											);
										})}

										<Select
											id="formSelect"
											name="TIPO_VINCULACION"
											label="Tipo de Vinculación"
											onChange={() => this.changeHandler(event)}
											s={12}
											l={12}
											m={12}
											options={{
												dropdownOptions: {
													alignment: 'left',
													autoTrigger: true,
													closeOnClick: true,
													constrainWidth: true,
													coverTrigger: true,
													hover: false
												}
											}}
											value="0"
										>
											<option disabled value="0">
												Seleccione
											</option>
											<option value={'EMPLEADO'}>EMPLEADO</option>
											<option value={'CONTRATISTA'}>CONTRATISTA</option>
											<option value={'VISITANTE'}>VISITANTE</option>
										</Select>
									</div>

									<div className="row">
										<div className="col s12 m6 l6">
											<label htmlFor="ADMIN">¿Eres Administrador?</label>
											<div className="switch">
												<label>
													No
													<input type="checkbox" name="ADMIN" onChange={() => this.changeHandler(event)} />
													<span className="lever"></span>
													Si
												</label>
											</div>
										</div>

										<div className="col s12 m6 l6">
											<button type="submit" className="btn waves-effect waves-light  light-blue darken-4 right">
												Registrarse
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</Route>
			</Switch>
		);
	}
}
const Toast = Swal.mixin({
	toast: true,
	showConfirmButton: false,
	timer: 2000,
	timerProgressBar: true,
	onOpen: toast => {
		toast.addEventListener('mouseenter', Swal.stopTimer);
		toast.addEventListener('mouseleave', Swal.resumeTimer);
	}
});
export default Login;
