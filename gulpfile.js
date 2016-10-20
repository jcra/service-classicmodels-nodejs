'use strict';

var gulp    = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint  = require('gulp-jshint'),
    jscs    = require('gulp-jscs'),
    mocha   = require('gulp-mocha'),
    env     = require('gulp-env');

var jsFiles = ['*.js','src/**/*.js'];

gulp.task('style', function(){
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose : true
        }))
        .pipe(jscs());
});

gulp.task('test', function(){
    env({vars : {ENV : 'Test'}});
    gulp.src('test/*.js', {read: true})
        .pipe(mocha({ reporter: 'nyan'}));        
});

gulp.task('db', function(){
    gulp.src('src/data/*.js', {read: true})
        .pipe(mocha({ reporter: 'nyan'}));
});

gulp.task('default', function(){
    var options = {
        script  : 'app.js',
        ext     : 'js',
        tasks   : ['style'],
        env     : {
            PORT: 8000
        },
        ignore  : ['./node_modules/**']
    };

    nodemon(options)
        .on('restart', function(){
            console.log('Restarting...');
        });
});

