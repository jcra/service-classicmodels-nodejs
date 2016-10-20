module.exports = function(OfficeModel){
    'use strict';    

    /**
     * Middleware method for id dependent methods
     * */
    var middleware = function(req, res, next){
        OfficeModel.findById(req.params.id)
            .then(function(office){
                if(office)
                {
                    req.office = office;
                    next();
                }
                else{ res.status(404).send('No office found.'); }
            })
            .catch(function(err){
                res.status(500).send(err);
            });
    };


    /**
     * Create an Office
     * */
    var post = function(req, res){
        var office = new OfficeModel(req.body);

        office.save()
            .then(function(office){
                res.status(201);
                res.send(office);
            })
            .catch(function(err){
                res.status(500);
                res.send(err);
            });
    };


    /**
     * Get all Offices
     * */
    var get = function(req, res){

        OfficeModel.find()
            .then(function(offices){
                res.json(offices);
            })
            .catch(function(err){
                res.status(500);
                res.send(err);
            });
    };

    /**
     * Get an Office by Id
     * */
    var getById = function(req, res){
        res.json(req.order);
    };


    /**
     * Replaces a complete Office with new information
     * */
    var put =  function(req, res){

        req.office.addressLine1     = req.body.addressLine1;
        req.office.addressLine2     = req.body.addressLine2;
        req.office.city             = req.body.city;
        req.office.country          = req.body.country;
        req.office.phone            = req.body.phone;
        req.office.postalCode       = req.body.postalCode;
        req.office.state            = req.body.state;
        req.office.territory        = req.body.territory;

        req.office.save()
            .then(function(office){
                res.json(office);
            })
            .catch(function(err){
                res.status(500);
                res.send(err);
            });
    };

    /**
     * Updates the information of an Office
     * */
    var patch = function(req, res){

        if(req.body._id) { delete req.body._id; }

        for(var i in req.body)
        {
            if(i){ req.office[i] = req.body[i]; }
        }

        req.office.save()
            .then(function(office){
                res.json(office);
            })
            .catch(function(err){
                res.status(500);
                res.send(err);
            });
    };

    /**
     * Removes an Office
     * */
    var remove = function(req, res){
        req.office.remove()
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
     * Returns the CRUD operations for an Office
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

