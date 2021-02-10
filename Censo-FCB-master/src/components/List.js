import React, { Component } from 'react';
import { Modal, TextInput, Select, ProgressBar, Switch as Sw } from 'react-materialize';
import { ExcelRenderer } from 'react-excel-renderer';
import { Switch, Route, Link } from 'react-router-dom';
import login from '../index';
import App from './App';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

var proceso = new Array();

export default class List extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ADMIN: '',
			CEDULA: '',
			NOMBRE_PERSONA: '',
			ENTIDAD: '',
			TIPO_VINCULACION: '',
			CARGO: '',
			FECHA_NACIMIENTO: '',
			PERSONID: '',
			GENERO: '',
			PASSWORD: '',
			NIT: 123123123,

			products: [],
			filteredPerson: [],
			titleValue: 'Añadir persona',
			button: 'Crear',
			_id: ''
		};

		// this.abortController = new AbortController();
		// this.validateSesion = this.validateSesion.bind(this);
		this.addProduct = this.addProduct.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.abortController = new AbortController();
	}

	componentWillUnmount() {
		this.abortController.abort();
	}

	//Metodo que se ejecuta al inicio
	componentDidMount() {
		document.querySelector('#add_person').hidden = false;
		document.querySelector('#exit').hidden = false;
		const options = {
			onOpenStart: () => {
				// console.log('Open Start');
				M.Toast.dismissAll();
				if (this.state.ADMIN) {
					document.querySelector('#SwAdmin').checked = true;
				}
				// console.log(this.state.TIPO_VINCULACION);
				document.querySelector('#formSelect').value = this.state.TIPO_VINCULACION;
			},
			onOpenEnd: () => {
				M.updateTextFields();

				// console.log('Open End');
			},
			onCloseStart: () => {
				// console.log('Close Start');
			},
			onCloseEnd: () => {
				this.fetchProducts();
				document.querySelector('#SwAdmin').checked = false;

				document.querySelector('#file').hidden = false;
				document.querySelector('#inputFile').value = '';
				document.querySelector('#inputFileText').value = '';
				this.setState({
					ADMIN: false,
					CEDULA: '',
					NOMBRE_PERSONA: '',
					ENTIDAD: '',
					TIPO_VINCULACION: '',
					CARGO: '',
					PASSWORD: '',
					_id: '',
					titleValue: 'Añadir persona',
					button: 'Crear'
				});
				// this.fetchProducts();
			},
			inDuration: 250,
			outDuration: 250,
			opacity: 0.3,
			dismissible: false,
			startingTop: '4%',
			endingTop: '10%'
		};
		M.Modal.init(this.Modal, options);
		M.Modal.init(document.getElementById('modalLoader'), options);

		// let instance = M.Modal.getInstance(this.Modal);
		// instance.open();
		// instance.close();
		// instance.destroy();

		this.fetchProducts();
	}

	validateSesion() {
		M.toast({
			html: 'Se ha vencido la sesión',
			classes: 'red darken-4'
		});
		document.querySelector('#add_person').hidden = true;
		document.querySelector('#exit').hidden = true;
		// ReactDOM.unmountComponentAtNode(document.getElementById('root'));
		ReactDOM.render(<App login={true} />, document.getElementById('root'));
	}

	// Consultas a la base de datos inicio
	fetchProducts() {
		fetch('/censo/get', {
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
		})
			.then(res => res.json())
			.then(data => {
				if (data.auth == false) {
					this.validateSesion();
				} else {
					if (proceso !== 'DELETE') {
						this.setState({ products: data });
					}
					document.querySelector('#progressBar').hidden = true;
					proceso = 'OTHER';
				}
			})
			.catch(console.log);
	}

	addProduct(e) {
		let instance = M.Modal.getInstance(this.Modal);
		if (this.state._id) {
			fetch(`/censo/${this.state._id}`, {
				method: 'PUT',
				body: JSON.stringify(this.state),
				headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
			})
				.then(res => res.json())
				.then(data => {
					if (data.auth == false) {
						this.validateSesion();
					} else {
						// M.toast({ html: data });
						Toast.fire({
							icon: 'success',
							title: data
						});
						this.setState({ CEDULA: '', NOMBRE_PERSONA: '', ENTIDAD: '', TIPO_VINCULACION: '', CARGO: '', _id: '' });
						this.fetchProducts();
						// instance.close();
					}
				});
			instance.close();
		} else {
			fetch('/censo/add', {
				method: 'POST',
				body: JSON.stringify(this.state),
				headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
			})
				.then(res => res.json())
				.then(data => {
					if (data.auth == false) {
						this.validateSesion();
					} else {
						// M.toast({ html: data });
						Toast.fire({
							icon: 'success',
							title: data
						});
						this.setState({ CEDULA: '', NOMBRE_PERSONA: '', ENTIDAD: '', TIPO_VINCULACION: '', CARGO: '' });
						this.fetchProducts();
						instance.close();
					}
				})
				.catch(err => console.error(err));
		}
		e.preventDefault();
	}

	deleteProduct(id) {
		Swal.fire({
			title: '¿Estás seguro?',
			text: '¡No podrás revertir esto!',
			icon: 'warning',
			// position: 'top',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, Bórralo!',
			cancelButtonText: 'Cancelar'
		}).then(result => {
			if (result.value) {
				// M.Toast.dismissAll();
				proceso = 'DELETE';
				var elementPos = this.state.products
					.map(function (person) {
						return person._id;
					})
					.indexOf(id);
				this.state.products.splice(elementPos, 1);

				fetch(`/censo/${id}`, {
					method: 'DELETE',
					headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
				})
					.then(res => res.json())
					.then(data => {
						if (data.auth == false) {
							this.validateSesion();
						} else {
							// M.toast({ html: data });
							Toast.fire({
								icon: 'success',
								title: data
							});
							this.setState({ search: '', searchNumber: '' });
							document.getElementById('searchNombre').value = this.state.search;
							document.getElementById('searchCedula').value = this.state.searchNumber;
							this.fetchProducts();
						}
					});
			}
		});
	}

	editProduct(id) {
		let instance = M.Modal.getInstance(this.Modal);
		document.querySelector('#file').hidden = true;
		fetch(`/censo/${id}`)
			.then(res => res.json())
			.then(data => {
				if (data.auth == false) {
					this.validateSesion();
				} else {
					// console.log(data);
					this.setState({
						ADMIN: data.ADMIN,
						CEDULA: data.CEDULA,
						NOMBRE_PERSONA: data.NOMBRE_PERSONA,
						ENTIDAD: data.ENTIDAD,
						TIPO_VINCULACION: data.TIPO_VINCULACION,
						CARGO: data.CARGO,
						FECHA_NACIMIENTO: data.FECHA_NACIMIENTO,
						PERSONID: data.PERSONID,
						GENERO: data.GENERO,
						NIT: data.NIT,
						titleValue: 'Editar persona',
						button: 'Actualizar',
						_id: data._id
					});

					instance.open();
				}
			})
			.catch(console.log);
	}

	// Consultas a la base de datos final

	//Mostrar modal
	showModal() {
		let instance = M.Modal.getInstance(this.Modal);

		this.setState({
			titleValue: 'Añadir persona'
		});
		// document.querySelector('#file').hidden = false;
		instance.open();
	}

	//Capturar datos ingresados
	handleChange(e) {
		const { name, value, checked, type } = e.target;
		this.setState({
			[name]: type === 'checkbox' ? checked : value
		});
		if (!this.state.ADMIN) {
			this.setState({ PASSWORD: '' });
		}
	}

	//Capturar datos del excel
	fileHandler(event) {
		// document.querySelector('#progressBar').hidden = false;
		console.log('Archivo subido');
		let fileObj = event.target.files[0];
		// console.log(event);
		let instance = M.Modal.getInstance(this.Modal);
		let instance2 = M.Modal.getInstance(document.getElementById('modalLoader'));
		instance.close();
		instance2.open();

		ExcelRenderer(fileObj, (err, resp) => {
			if (err) {
				console.error(err);
			} else {
				// console.log(resp.rows);
				fetch('/censo/add', {
					method: 'POST',
					body: JSON.stringify(resp),
					headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
				})
					.then(res => res.json())
					.then(data => {
						if (data.auth == false) {
							this.validateSesion();
						} else {
							// document.querySelector('#progressBar').hidden = true;
							// M.toast({ html: data });
							Toast.fire({
								icon: 'success',
								title: data
							});
							// this.fetchProducts();
							instance2.close();
						}
					})
					.catch(err => console.error(err));
			}
		});
	}

	searchChange(e) {
		if (e.target.name == 'searchCedula') {
			this.setState({ searchNumber: parseInt(e.target.value), search: '' });
			// console.log(this.state.searchNumber);
			document.getElementById('searchNombre').value = '';
		}
		if (e.target.name == 'searchNombre') {
			// console.log(e.target.name);
			this.setState({ search: e.target.value, searchNumber: '' });
			document.getElementById('searchCedula').value = '';
		}
	}

	render() {
		if (this.state.products.length > 0) {
			// let { search } = this.state;
			if (this.state.search === undefined) {
				this.state.search = '';
			}

			if (typeof this.state.searchNumber === 'number' && this.state.searchNumber > 0) {
				this.state.filteredPerson = this.state.products.filter(persona => {
					// console.log(persona.NOMBRE_PERSONA.toLowerCase());
					return persona.CEDULA.toString().indexOf(this.state.searchNumber.toString()) !== -1;
				});
			} else {
				this.state.filteredPerson = this.state.products.filter(persona => {
					// console.log(persona.NOMBRE_PERSONA.toLowerCase());
					return persona.NOMBRE_PERSONA.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
				});
			}
			// console.log(search);

			// console.log(this.state.search);
			// console.log(this.state.TIPO_VINCULACION);
		}
		return (
			<Switch>
				<Route>
					<div className="container">
						<form>
							<div className="row">
								<div className="input-field col s6 m6 l6">
									<i className="material-icons prefix">search</i>
									<input
										id="searchNombre"
										name="searchNombre"
										className="materialize-textarea"
										onChange={() => this.searchChange(event)}
										placeholder="Buscar por nombre"
										type="text"
									></input>
								</div>
								<div className="input-field col s6 m6 l6">
									<input
										id="searchCedula"
										name="searchCedula"
										className="materialize-textarea"
										onChange={() => this.searchChange(event)}
										placeholder="Buscar por cédula"
										type="number"
									></input>
								</div>
							</div>
						</form>

						<Modal
							header="Leyendo archivo..."
							id="modalLoader"
							bottomSheet
							actions={[]}
							options={{
								onCloseEnd: () => {
									this.fetchProducts(event);
								}
							}}
						>
							<ProgressBar className="blue" />
							<p>Este proceso puede tardar unos segundos...</p>
						</Modal>
						<div
							ref={Modal => {
								this.Modal = Modal;
							}}
							id="modalMaterialize"
							className="modal"
						>
							<form onSubmit={this.addProduct} className="modal-content">
								<div className="hide-on-med-and-up">
									<span>
										<a className="btn-flat waves-effect waves-red modal-close right">
											<i className="material-icons right">cancel</i>
										</a>
									</span>
								</div>
								<div className="hide-on-small-only">
									<a className="btn-flat waves-effect waves-red modal-close right">
										Cerrar
										<i className="material-icons right">cancel</i>
									</a>
								</div>
								<h5 className="flow-text">{this.state.titleValue}</h5>

								<p>Registro individual</p>
								<div className="row">
									<div className="input-field col s12 m4 l4">
										<input
											name="CEDULA"
											onChange={() => this.handleChange(event)}
											type="number"
											id="CEDULA"
											placeholder="Cédula"
											value={this.state.CEDULA}
											className="validate"
											required
										></input>
									</div>
									<div className="input-field col s12 m8 l8">
										<input
											name="NOMBRE_PERSONA"
											onChange={() => this.handleChange(event)}
											type="text"
											id="NOMBRE_PERSONA"
											placeholder="Nombre Completo"
											value={this.state.NOMBRE_PERSONA}
											className="validate"
											required
										></input>
									</div>
								</div>
								<div className="row">
									<div className="input-field col s12 m4 l4">
										<input
											name="ENTIDAD"
											onChange={() => this.handleChange(event)}
											type="text"
											id="ENTIDAD"
											placeholder="Empresa/Entidad"
											value={this.state.ENTIDAD}
											required
										></input>
									</div>
									<div className="input-field col s12 m4 l4">
										<input
											name="CARGO"
											onChange={() => this.handleChange(event)}
											type="text"
											id="CARGO"
											placeholder="Cargo"
											value={this.state.CARGO}
											required
										></input>
									</div>
									<Select
										id="formSelect"
										name="TIPO_VINCULACION"
										label="Tipo de Vinculación"
										onChange={() => this.handleChange(event)}
										s={12}
										l={4}
										m={4}
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
									>
										<option value="">Seleccione</option>
										<option value={'EMPLEADO'}>EMPLEADO</option>
										<option value={'CONTRATISTA'}>CONTRATISTA</option>
										<option value={'VISITANTE'}>VISITANTE</option>
									</Select>
								</div>
								<div className="row" id="file">
									<div className="input-field s12 m12 l12">
										<p>
											Registro masivo -<span> </span>
											<a
												href="https://multimediamai.flagsoluciones.com/FlagControlBuilding/GU%c3%8dA%20PARA%20DILIGENCIAR%20FORMATO%20DE%20CARGA%20MASIVA.pdf"
												target="bank"
												style={{ textDecoration: 'underline' }}
											>
												Seguir instructivo
											</a>
										</p>
										<div className="file-field">
											<div className="btn waves-effect light-blue darken-4">
												<span>Cargar</span>
												<input id="inputFile" name="excel" type="file" onChange={() => this.fileHandler(event)} />
											</div>
											<div className="file-path-wrapper">
												<input
													id="inputFileText"
													className="file-path validate"
													type="text"
													placeholder="Subir archivo de excel"
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="modal-footer">
									<div className="row">
										<div className="col">
											<label htmlFor="ADMIN">¿Administrador?</label>
											<Sw
												id="SwAdmin"
												name="ADMIN"
												offLabel="No"
												onChange={() => this.handleChange(event)}
												onLabel="Si"
											/>
										</div>
										{this.state.ADMIN ? <InputPass onClick={() => this.handleChange(event)} /> : null}

										<div className="col right">
											<button className="btn waves-effect light-blue darken-4" type="submit" name="action">
												{this.state.button}
												<i className="material-icons right">send</i>
											</button>
										</div>
									</div>
								</div>
								<div className="modal-footer">
									<br></br>
								</div>
							</form>
						</div>
						<div id="progressBar">
							<ProgressBar className="blue" />
						</div>
						{/* <div className="card">
							<div className="card-content"> */}
						<table className="highlight responsive-table">
							<thead>
								<tr className="h2">
									<th>Cédula</th>
									<th className="hide-on-small-only">Nombre del Colaborador</th>
									<th className="hide-on-small-only">Empresa / Entidad</th>
									<th className="hide-on-small-only">Tipo de Vinculación</th>

									<th className="hide-on-med-and-up">Nombres</th>
									<th className="hide-on-med-and-up">Empresa</th>
									<th className="hide-on-med-and-up">T.Vincu</th>
									<th>Cargo</th>
									<th className="hide-on-med-and-down">Opción</th>
									<th className="hide-on-large-only">
										<a
											className="waves-effect btn-flat light-red darken-4"
											style={{ margin: '4px' }}
											onClick={() => login('/login/signout')}
										>
											Salir
										</a>
										<a
											className="waves-effect btn-small  light-blue darken-4"
											style={{ margin: '4px' }}
											onClick={() => this.showModal()}
											id="person_add"
										>
											<i className="material-icons">person_add</i>
										</a>
									</th>
								</tr>
							</thead>
							<tbody>
								{this.state.filteredPerson.map(person => {
									if (person.ADMIN) {
										var styleAdmin = { color: '#01579b', fontWeight: 'bold' };
									}
									return (
										<tr key={person._id} style={styleAdmin}>
											<td>{person.CEDULA}</td>
											<td>{person.NOMBRE_PERSONA}</td>
											<td>{person.ENTIDAD}</td>
											<td>{person.TIPO_VINCULACION}</td>
											<td>{person.CARGO}</td>
											<td>
												<a
													className="waves-effect btn-small light-blue darken-4"
													style={{ margin: '4px' }}
													onClick={() => this.editProduct(person._id)}
												>
													<i className="material-icons">edit</i>
												</a>
												<a
													className="waves-effect btn-small light-blue darken-4"
													style={{ margin: '4px' }}
													onClick={() => this.deleteProduct(person._id)}
												>
													<i className="material-icons">delete</i>
												</a>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
						{/* </div>
						</div> */}
					</div>
				</Route>
			</Switch>
		);
	}
}

const InputPass = ({ onClick }) => (
	<div className="col s6 m6 l6">
		<input name="PASSWORD" onChange={onClick} id="password" placeholder="Ingrese contraseña" type="password"></input>
	</div>
);

const Toast = Swal.mixin({
	toast: true,
	position: 'top',
	showConfirmButton: false,
	timer: 2000,
	timerProgressBar: true,
	onOpen: toast => {
		toast.addEventListener('mouseenter', Swal.stopTimer);
		toast.addEventListener('mouseleave', Swal.resumeTimer);
	}
});
