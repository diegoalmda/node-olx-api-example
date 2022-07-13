require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');
const path = require('path');

const apiRoutes = require('./src/routes');

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
  console.log("Error: ", error.message);
});

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(fileupload());

server.use(express.static(path.join(__dirname, 'public')));

server.use('/', apiRoutes);

server.listen(process.env.PORT, () => {
  console.log(`Servidor rodando no endereço: ${process.env.BASE_URL}`);
});