import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

login('/login/auth');

function login(params) {
	fetch(params)
		.then(res => res.json())
		.then(data => {
			if (data.auth) {
				ReactDOM.render(<App login={false} />, document.getElementById('root'));
			} else {
				ReactDOM.render(<App login={true} />, document.getElementById('root'));
			}
		})
		.catch(console.log);
}

serviceWorker.unregister();

export default login;
