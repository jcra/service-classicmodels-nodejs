module.exports = function(OfficeModel, db){
    'use strict';

    var express          = require('express'),
        router           = express.Router(),
        OfficeController = require('../controllers/officeController')(OfficeModel);

    router.route('/')
        .post(OfficeController.post)
        .get(OfficeController.get);

    router.use('/:id', OfficeController.middleware);

    router.route('/:id')
        .get(OfficeController.getById)
        .put(OfficeController.put)
        .patch(OfficeController.patch)
        .delete(OfficeController.remove);

    return router;

};

