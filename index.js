const actionRoutes = require('./actions/actionRoutes.js');
const projectRoutes = require('./projects/projectRoutes.js');

const express = require('express');

const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const server = express();

server.use(logger('combined'));
server.use(helmet());
server.use(cors());
server.use(express.json());

const port = 9898;
server.listen(port, () => {
    console.log(`The server is running on port ${port}. Abandon hope all ye who enter.`);
});