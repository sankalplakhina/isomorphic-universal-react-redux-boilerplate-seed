import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';

import { apiPort } from '../config/env';

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
