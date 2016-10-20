// var should  = require('should'),
//     sinon   = require('sinon');
//
// describe('Book controller test: ', function(){
//     describe('Post', function(){
//         it('should not allow and empty customer number on post', function(then){
//             var order = function(order){ this.save = function(){}};
//
//             var req = {
//                 body: { 
//                     customer : ''
//                 }
//             };
//
//             var res = {
//                 status : sinon.spy()
//                 , send : sinon.spy()
//             }
//
//             var orderController = require('../src/controllers/orderController')(order);
//
//             orderController.post(req,res);
//
//             res.status.calledWith(400).should.equal(true, 'Bad status: ' + res.status.args[0]);
//             res.send.calledWith('Customer Number is required').should.equal(true);
//         })
//     })
// })