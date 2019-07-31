const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const socketIO = require("socket.io");
const parser = require('body-parser');
const http = require("http");
const Console = require('console');

const app = express();
const port = process.env.PORT || 3000;

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/chiosco');

// socket
const server = http.createServer(app);
const io = socketIO(server);
io.on("connection", socket => {
  socket.on('update-points', () => {
    io.emit('update-points');
  });
});

// model
const Order = require('./api/model/order');
const TeamPoints = require('./api/model/teamPoints');
const Routes = require('./api/routes/routes');

dotenv.config();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  next();
});

// register the routes
Routes(app);

app.use((req, res) => {
  res.status(404).send(`${req.originalUrl} not found`);
});

// start app on specific port

server.listen(port, () => console.log(`Listening on port ${port}`));