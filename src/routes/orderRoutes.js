module.exports = function (OrderModel, db) {
    'use strict';  
    
    var express         = require('express'),
        router          = express.Router(),
        OrderController = require('../controllers/orderController')(OrderModel);

    router.route('/')
        .post(OrderController.post)
        .get(OrderController.get);

    router.use('/:id', OrderController.middleware);

    router.route('/:id')
        .get(OrderController.getById)
        .put(OrderController.put)
        .patch(OrderController.patch)
        .delete(OrderController.remove);

    return router;
};

