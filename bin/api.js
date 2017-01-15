/* eslint no-console: 0 */

import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import { apiPort } from '../config/env';

const app = express();

app.use(compression());
app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.send('Hello, world!');
});

app.listen(apiPort, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`API is up on port ${apiPort}`);
  }
});
