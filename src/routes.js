const express = require('express');
const routes = express.Router();
const UsersController = require('./controllers/UsersController');
const ProductsController = require('./controllers/ProductsController');
const TransactionsController = require('./controllers/TransactionsController');

//Controle da rota por privilegios
function AdminRole(role) {
    return function (req, res, next) {
        if (req.session.user && req.session.user.role === role) {
            next();
        } else {
            res.send(403);
        }
    }
}

//Controladores de usuario
routes.post('/users', UsersController.create);
routes.get('/users', UsersController.read);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.delete);

//Controladores de usuarios privilegiados
routes.get('/users/admin', UsersController.read_admin, AdminRole());

//Controladores de produto
routes.post('/products', ProductsController.create);
routes.get('/products', ProductsController.read);
routes.put('/products/:id', ProductsController.update);
routes.delete('/useproductsrs/:id', ProductsController.delete);

//Controladores de transação
routes.post('/transactions', TransactionsController.create);
routes.get('/transactions', TransactionsController.read);
routes.put('/transactions/:id', TransactionsController.update);
routes.delete('/transactions/:id', TransactionsController.delete);

module.exports = routes;