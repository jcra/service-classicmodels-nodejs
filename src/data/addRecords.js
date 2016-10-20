'use strict';

var should      = require('should'),
    mongoose    = require('mongoose'),
    models;

describe('Classic Models:', function(){

    before(function() {
        mongoose.Promise    = global.Promise;
        mongoose.connect('mongodb://localhost/classic-models');
        models              = require('../models/dataModels')(mongoose);
        console.log('classic-models creations started @ %d', Date.now());
    });

    describe('Offices: Model', function(){

        describe('#save ()', function(){

            it('should insert offices data', function(done){
                
                var data        = require('./officeData');
                var offices     = new models.Office();
                
                offices.collection.insert(data, function(err, results){
                    should.not.exists(err);
                    should.notEqual(results.length, 0, 'Error creating offices records');                    
                });                
                done();
            });
        });
    });
    
    describe('Employees: Model', function(){
        
        describe('#save ()', function(){
            it('should insert employees data', function(done){
                
                var data        = require('./employeeData');
                var employees   = new models.Employee();
                
                employees.collection.insert(data, function(err, results){
                    should.not.exists(err);
                    should.notEqual(results.length, 0, 'Error creating employees records');
                });
                done();
            });       
        });
    });
    
    describe('Customers: Model', function(){
        
        describe('#save ()', function(){
            it('should insert customers data', function(done){

                var data        = require('./customersData');
                var customers   = new models.Customer();

                customers.collection.insert(data, function(err, results){
                    should.not.exists(err);
                    should.notEqual(results.length, 0, 'Error creating customers records');
                });
                done();
            });      
        });
    });
    
    describe('Product Lines: Models', function(){
        
        describe('#save ()', function(){
            it('should insert product line data', function(done){

                var data        = require('./productLineData');
                var productline = new models.ProductLine();

                productline.collection.insert(data, function(err, results){
                    should.not.exists(err);
                    should.notEqual(results.length, 0, 'Error creating product line records');
                });
                done();
            });        
        });    
    });
    
    describe('Products: Model', function(){
        
        describe('#save ()', function(){
            it('should insert the products data', function(done){

                var data        = require('./productsData');
                var product     = new models.Products();

                product.collection.insert(data, function(err, results){
                    should.not.exists(err);
                    should.notEqual(results.length, 0, 'Error creating products records');
                });
                done();
            });        
        });
    });
    
    describe('Order: Model', function(){
        
        describe('#save ()', function(){
            it('should insert orders data', function(done){

                var data        = require('./ordersData');
                var orders      = new models.Order();

                orders.collection.insert(data, function(err, results){
                    should.not.exists(err);
                    should.notEqual(results.length, 0, 'Error creating orders records');
                });
                done();
            });       
        });
    });
    
    after(function(done){
        mongoose.disconnect();
        console.log('classic-models creation finished @ %d', Date.now());
        done();
    });
});
