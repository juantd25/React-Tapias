const path = require('path');

module.exports = {
	mode: 'production',

	context: path.resolve(__dirname, 'src'),

	entry: {
		app: './index.js'
	},

	output: {
		publicPath: '/',
		path: path.resolve(__dirname, 'public/javascripts'),
		filename: 'bundle.js'
	},

	module: {
		rules: [
			{
				test: /\.js/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},

	devtool: 'inline-source-map'
};
