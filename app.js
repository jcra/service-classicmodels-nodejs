'use strict';

var express     = require('express'),
    mongoose    = require('mongoose'),
    path        = require('path'),
    bodyParser  = require('body-parser');

/** Mongoose configuration and db object*/
mongoose.Promise = global.Promise;

var env = process.env.ENV || 'Prod';

var db = (env === 'Test') ? 
    mongoose.connect('mongodb://localhost/classic-models-test')
    :mongoose.connect('mongodb://localhost/classic-models');

/** Models */
var models = require('./src/models/dataModels')(mongoose);

/** Express server configuration */
var app = express();

var port = process.env.PORT || 3000;

/** view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/** Set public directory as a common resource to every view, this is use for: (.css, .js, Etc..) files */
app.use(express.static(path.join(__dirname, 'public')));

/** Body parser configuration */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/** setting up routes */
var orderRouter     = require('./src/routes/orderRoutes')(models.Order, db);
var officeRouter    = require('./src/routes/officeRoutes')(models.Office, db);

app.use('/api/orders', orderRouter);
app.use('/api/offices', officeRouter);

/** get the index page */
app.get('/', function(req, res){
    res.render('index', { title: 'Classic - Models', message:  'Welcome to the Orders Api !'});
});

/** catch 404 and forward to error handler */
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/**
 * Error handlers
 *
 * development error handler
 * will print stacktrace
 */
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/**
 * production error handler
 * no stacktraces leaked to user
 */
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/** Server starts */
app.listen(port, function(){
    console.log('Gulp is running service-order on '+ env +' PORT:', port);
});

module.exports = app;