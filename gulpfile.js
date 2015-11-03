var gulp = require('gulp');
var args = require('yargs').argv;           //  tool for getting the arguments (file paths) in a stream
var connect = require('gulp-connect');      //  allow livereload our files in webbrowser
var sass = require('gulp-sass');            //  module for SASS->CSS convertion
var concatCss = require('gulp-concat-css'); //  module for concatenation CSS files into one file


var config = require('./gulp.config.js')(); // the config object from gulp.config.js file

var jshint = require('gulp-jshint');        //  Detects errors and potential problems in code
var util = require('gulp-util');            //  Helps to write some logs out
var gulpprint = require('gulp-print');      //  For printing all the files that gulp is 'touching' in a process
var gulpif = require('gulp-if');            //  Plugin for adding 'if' condition to a stream (process)

var browserify = require('browserify');
var browserifyHandlebars = require('browserify-handlebars');
var source = require('vinyl-source-stream');

gulp.task('html', function () {
    return gulp
        .src(config.allhtml)
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
});

gulp.task('img', function () {
    return gulp
        .src(config.allimg)
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
});

gulp.task('css', function () {
    return gulp
        .src(config.allsass)                //  transform sass to css
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss("main.css", { rebaseUrls: false } ))
        .pipe(gulp.dest('./build/'))
        .pipe(connect.reload());
});


gulp.task('js_check', function(){
    log('Analyzing sourse with JSHint');     // function at the bottom of our gulpfile.js
    return gulp
        .src(config.alljs)
        .pipe(gulpif(args.verbose, gulpprint()))      // if specify flag --verbose in console then show all the checked files
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'), { verbose: true}); // jshint needs a special reporter
        //.pipe(jshint.reporter('fail'))              // Stop if our code is invalid after previous functions
});

gulp.task('browserify', ['js_check'],  function() {
    return browserify('./src/app.js',{
          transform: [browserifyHandlebars]
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./build/'))
        .pipe(connect.reload());
});

gulp.task('serverGulp', function(){
    connect.server({
        port: 8080,                                 // Server started at http://localhost:8080
        root: 'build',                              // place where our main files are
        livereload: true                            // livereload for the server
    })
});

gulp.task('default', [ 'html', 'img', 'css', 'browserify', 'serverGulp'], function(){
    gulp.watch( config.alljs, ['browserify']);       // Watch for changes in all js files in 'src' folder
    gulp.watch( config.allsass, ['css']);
    gulp.watch( config.allhtml, ['html']);
    gulp.watch( config.alltemplates, ['browserify']);
});

////////////////////////////////////////////

function log(msg){
    if (typeof(msg) === 'object'){
        for (var item in msg){
            if (msg.hasOwnProperty(item)){
                util.log(util.colors.blue(msg[item]));
            }
        }
    } else {
        util.log(util.colors.blue(msg));
    }
}
