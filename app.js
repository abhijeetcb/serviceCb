require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const logger = require('./config/logger');
const testReportRoute = require('./src/routes/test-report-routes');

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors({
  exposedHeaders: 'Auth-Token',
  'Access-Control-Allow-Origin': '*',
}));
app.options('*', cors());
app.get('/helloworld', (req, res) => {
  res.send('Hello World');
});

// v1 api routes
app.use('/report', testReportRoute);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  res.status(404).send('Not found');
});

const server = app.listen(3008, () => {
  logger.info(`Listening to port ${process.env.PORT}`);
});
server.timeout = 600000; // 10 minutes

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
