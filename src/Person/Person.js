// import React from 'react';

// const person = props => {
// 	return (
// 		<div>
// 			<p>
// 				I'm {props.name} and I am {props.age} years old!
// 			</p>
// 			<p>{props.children}</p>
// 			{/* children palabra reservada */}
// 		</div>
// 	);
// };

// export default person;

import React from 'react';

import './Person.css';

const person = props => {
	return (
		<div className="Person">
			<p onClick={props.click}>
				I'm {props.name} and I am {props.age} years old!
			</p>
			<p>{props.children}</p>
			<input type="text" onChange={props.changed} value={props.name} />
		</div>
	);
};

export default person;
