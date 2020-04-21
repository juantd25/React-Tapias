import React, {useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';

const app = props => {
	const [personsState, setPersonsState] = useState({
		persons: [
			{name: 'pedro', age: 20},
			{name: 'ramiro', age: 21}
		]
	});

	const [otherState, setOtherState] = useState('');

	console.log(personsState, otherState);

	const switchNameHandler = () => {
		// console.log('Was Clicked!');
		setPersonsState({
			persons: [
				{name: 'ana', age: 24},
				{name: 'liza', age: 23}
			]
		});
		setOtherState('sin cambiar');
	};

	const oldswitchNameHandler = () => {
		// console.log('Was Clicked!');
		setPersonsState({
			persons: [
				{name: 'pedro', age: 20},
				{name: 'ramiro', age: 21}
			]
		});

		setOtherState('ha cambiado');
	};

	return (
		<div className="App">
			<h1>Murillo manko</h1>
			<button onClick={switchNameHandler}>Switch Name</button>
			<button onClick={oldswitchNameHandler}>Old Switch Name</button>
			<Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
			<Person name={personsState.persons[1].name} age={personsState.persons[1].age}>
				<Person name="children" age="13" />
			</Person>
		</div>
	);
};

export default app;
