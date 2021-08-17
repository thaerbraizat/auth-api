'use strict';

const express = require('express');

const cors = require('cors');
const morgan = require('morgan');

const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger');
const router = require('./auth/routes');
const testRouter=require('./routes/v2')
const v1Routes = require('./routes/v1.js');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use(router);
app.use('/api/v1', v1Routes);
app.use('/api/v2', testRouter);

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};



