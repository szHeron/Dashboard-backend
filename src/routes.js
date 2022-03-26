const express = require('express');
const routes = express.Router();

const UsersController = require('./controllers/UsersController');

routes.post('/users', UsersController.create);
routes.get('/users', UsersController.read);
routes.delete('/users', UsersController.create);
routes.put('/users', UsersController.read);

module.exports = routes;