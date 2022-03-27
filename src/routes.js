const express = require('express');
const routes = express.Router();
const UsersController = require('./controllers/UsersController');
const RequestsController = require('./controllers/RequestsController');
const ProductsController = require('./controllers/ProductsController');
const TransactionsController = require('./controllers/TransactionsController');

//Controladores de usuario
routes.post('/users', UsersController.create);
routes.get('/users', UsersController.read);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.delete);

//Controladores de pedido
// routes.post('/requests', RequestsController.create);
// routes.get('/requests', RequestsController.read);
// routes.put('/requests/:id', RequestsController.update);
// routes.delete('/requests/:id', RequestsController.delete);

//Controladores de produto
routes.post('/products', ProductsController.create);
routes.get('/products', ProductsController.read);
routes.put('/products/:id', ProductsController.update);
routes.delete('/useproductsrs/:id', ProductsController.delete);

//Controladores de produto
routes.post('/transactions', TransactionsController.create);
routes.get('/transactions', TransactionsController.read);
routes.put('/transactions/:id', TransactionsController.update);
routes.delete('/transactions/:id', TransactionsController.delete);

module.exports = routes;