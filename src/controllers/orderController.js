module.exports = function (OrderModel){
    'use strict';
    
    /**
     * Middleware method for id dependent methods 
     * */
    var middleware = function(req, res, next){
        OrderModel.findById(req.params.id)
            .then(function(order){
                if(order)
                {
                    req.order = order;
                    next();
                }
                else{ res.status(404).send('No order found.'); }
            })
            .catch(function(err){
                res.status(500).send(err);
            });
    };
    
    /**
     * Create an Order  
     * */
    var post = function(req, res){
        var order = new OrderModel(req.body);
        
        if(order.customerNumber){
            order.save()
                .then(function(order){
                    res.status(201);
                    res.send(order);
                })
                .catch(function(err){
                    res.status(500);
                    res.send(err);
                });
        }else{
            res.status(400);
            res.send('Invalid: Customer Number is required');
        }        
        
    };

    /**
     * Get all Orders
     * */
    var get = function(req, res){
        var query = {};

        if(req.query.customerNumber){ query.customerNumber = req.query.customerNumber; }

        OrderModel.find(query)
            .then(function(orders){
                res.json(orders);
            })
            .catch(function(err){
                res.status(500);
                res.send(err);
            });
    };

    /**
     * Get an Order by Id
     * */
    var getById = function(req, res){
        res.json(req.order);
    };


    /**
     * Replaces a complete order with new information
     * */
    var put =  function(req, res){

        req.order.customerNumber    = req.body.customerNumber;
        req.order.orderDate         = req.body.orderDate;
        req.order.orderNumber       = req.body.orderNumber;
        req.order.requiredDate      = req.body.requiredDate;
        req.order.shippedDate       = req.body.shippedDate;
        req.order.shipped           = req.body.shipped;
        req.order.comments          = req.body.comments;

        req.order.save()
            .then(function(order){
                res.json(order);
            })
            .catch(function(err){
                res.status(500);
                res.send(err);
            });
    };

    /**
     * Updates the information of an Order
     * */
    var patch = function(req, res){

        if(req.body._id) { delete req.body._id; }

        for(var i in req.body)
        {
            if(i){ req.order[i] = req.body[i]; }
        }

        req.order.save()
            .then(function(order){
                res.json(order);
            })
            .catch(function(err){
                res.status(500);
                res.send(err);
            });
    };

    /**
     * Removes an Order
     * */
    var remove = function(req, res){
        req.order.remove()
            .then(function(){
                res.status(204);
                res.send('Removed...');
            })
            .catch(function(err){
                res.status(500);
                res.send(err);
            });
    };

    /**
     * Returns the CRUD operations for an Order
     * */
    return {
        middleware  : middleware,
        post        : post,
        get         : get, 
        getById     : getById,
        put         : put,
        patch       : patch,
        remove      : remove
    };
};
