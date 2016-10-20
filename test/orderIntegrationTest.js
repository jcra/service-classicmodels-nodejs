'use strict';

var should      = require('should'),
    request     = require('supertest'),
    app         = require('../app'),
    mongoose    = require('mongoose'),
    Order       = mongoose.model('Order'),
    agent       = request.agent(app);

describe('Order crud test', function(){

    describe('POST scenarios: ', function(){

        it('Should allow an order to be posted and return a shipped == false and a _id property', function(done){

            var orderPost = { customerNumber : 384, orderNumber : 15689, comments : "Order crud integration test Post"};

            agent.post('/api/orders')
                .send(orderPost)
                .expect(200)
                .end(function(err, results){
                    results.body.shipped.should.equal(false);
                    results.body.should.have.property('_id');
                    done();
                });
        });

        it('Should not allow an order to be created with an empty customerNumber', function(done){
            var orderPost = { orderNumber : 16589, comments : "Order crud integration test Invalid Post"};

            agent.post('/api/orders')
                .send(orderPost)
                .expect(400)
                .end(function(err, results){
                    results.body.should.not.have.property('_id');
                    done();
                });
        });

    });


    
    afterEach(function(done){
        Order.remove();
        done();
    });
    

});

