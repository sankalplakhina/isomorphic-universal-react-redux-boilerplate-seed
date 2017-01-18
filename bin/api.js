import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import { apiPort } from '../config/env';

const app = express();

app.use(compression());
app.use(bodyParser.json());

app.get('/api/home', (req, res) => {
	res.json({
		status: '200',
		data: {
			message: 'Welcome to Home Page',
			list: [1,2,3,4,5]
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
