module.exports = function(mongoose){
    'use strict';
    
    var Schema      = mongoose.Schema;

    var order       = new Schema({
        type            : { type : String, default: 'order'},
        customerNumber  : { type : Number },
        orderDate       : { type : Date, default : Date.now},
        orderNumber     : { type : Number},
        requiredDate    : { type : Date},
        shippedDate     : { type : Date},
        shipped         : { type : Boolean, default : false },
        comments        : { type : String }
    });
    
    var customer    = new Schema({
        type                    : { type : String, default: 'customer'},
        addressLine1            : { type : String},
        city                    : { type : String},
        contactFirstName        : { type : String},
        contactLastName         : { type : String},
        country                 : { type : String},
        creditLimit             : { type : Number},
        customerName            : { type : String},
        customerNumber          : { type : Number},
        phone                   : { type : String},
        postalCode              : { type : Number},
        salesRepEmployeeNumber  : { type : Number}
    });
    
    var employee    = new Schema({
        type            : { type : String, default: 'employee'},
        email           : { type : String},
        employeeNumber  : { type : Number},
        extension       : { type : String},
        firstName       : { type : String},
        jobTitle        : { type : String},
        lastName        : { type : String},
        officesCode     : { type : Number}
    });
    
    var office      = new Schema({
        type            : { type : String, default: 'office'},
        addressLine1    : { type : String},
        addressLine2    : { type : String},
        city            : { type : String},
        officeCode      : { type : Number},
        phone           : { type : String},
        postalCode      : { type : Number},
        state           : { type : String},
        territory       : { type : String}
    });   
    
    
    var products    = new Schema({
        type                : { type : String, default: 'products'},
        MSRP                : { type : Number},
        buyPrice            : { type : Number},
        productCode         : { type : String},
        productDescription  : { type : String},
        productLine         : { type : String},
        productName         : { type : String},
        productScale        : { type : String},
        productVendor       : { type : String},
        quantityInStock     : { type : Number}
    });    
    
    var productLine = new Schema({
        productLine         : { type : String},
        textDescription  : { type : String}
    });

    return {
        Order       : mongoose.model('Order', order),
        Customer    : mongoose.model('Customer', customer),
        Employee    : mongoose.model('Employee', employee),
        Office      : mongoose.model('Office', office),
        Products    : mongoose.model('Products', products),
        ProductLine : mongoose.model('ProductLine', productLine),
    };    
    
};




    