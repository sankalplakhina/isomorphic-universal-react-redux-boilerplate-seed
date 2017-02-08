require('./../server.babel'); // babel registration (runtime transpilation for node)
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');

const { apiPort } = require('../config/env');

const app = express();

app.use(morgan('dev', {}));
app.use(compression());
app.use(bodyParser.json());

app.get('/api/home', (req, res) => {
	res.json({
		status: '200',
		data: {
			message: 'Home',
		}
	});
});

app.get('/api', (req, res) => {
	res.json({message: 'Welcome to the API!'});
});

app.listen(apiPort, (err) => {
	if (err) {
		console.error(err);
	} else {
		console.info(`API is up on port ${apiPort}`);
	}
});
