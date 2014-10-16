var gulp = require('gulp');


var del = require('del'),
    es = require('event-stream'),
    helpers = require('./lib/helpers'),
    plugins = require('gulp-load-plugins')();

var VENDOR_SRC = __dirname +'/bower_components/';


gulp.task('clean', function ( cb ) {
    del( __dirname +'/vendor', cb );
});

// install, needs to be called after bower install
gulp.task('install', ['vendor-scripts', 'vendor-styles', 'sass']);

// sass
gulp.task('sass', function ( cb ) {
    gulp.src( __dirname +'/css/sass/app.scss' )
        .pipe( plugins.rubySass({ unixNewlines: true, precision: 4, noCache: true }) )
        .pipe( plugins.autoprefixer('last 2 version', '> 1%', 'ie 9', { cascade: true }) )
        .pipe( gulp.dest( __dirname + '/css/' ) )
        .pipe( plugins.rename({ suffix: '.min' }) )
        .pipe( plugins.minifyCss() )
        .pipe( gulp.dest( __dirname +'/css/' ) )
        .on('end', cb);
});

// scripts
gulp.task('scripts', function ( cb ) {


});

// server
gulp.task('serve', function ( cb ) {
    helpers.startExpress( __dirname );
    cb();
});

// vendor

gulp.task('vendor-styles', ['clean'], function ( cb ) {

    var isReady = {
        css : false,
        fonts : false
    };

    var ready = function ( jobDone ) {

        isReady[ jobDone ] = true;

        if ( isReady.css && isReady.fonts ) {
            cb();
        }
    };

    gulp.src([
        VENDOR_SRC +'bootstrap/dist/css/bootstrap.min.css'
    ])
        .pipe( gulp.dest( __dirname +'/vendor/css' ) )
        .on('end', ready.bind( this, 'css' ) );

    gulp.src([
        VENDOR_SRC +'bootstrap/dist/fonts/**/*'
    ])
        .pipe( gulp.dest( __dirname +'/vendor/fonts' ) )
        .on('end', ready.bind(this, 'fonts') );
});

gulp.task('vendor-scripts', ['clean'], function ( cb ) {

    gulp.src([
        VENDOR_SRC +'backbone-amd/backbone-min.js',
        VENDOR_SRC +'backbone-amd/backbone-min.map',
        VENDOR_SRC +'handlebars/handlebars.js',
        VENDOR_SRC +'jquery/jquery.min.js',
        VENDOR_SRC +'jquery/jquery.min.map',
        VENDOR_SRC +'jQuery.XDomainRequest/jquery.xdomainrequest.js',
        VENDOR_SRC +'requirejs/require.js',
        VENDOR_SRC +'underscore-amd/underscore-min.js'
    ])
        .pipe( gulp.dest( __dirname +'/vendor/js' ) )
        .on('end', cb);
});

// watch
gulp.task('watch', function () {

    helpers.startExpress( __dirname );

    plugins.livereload.listen();

    // Watch for changes to our JS
    gulp.watch( __dirname + '/js/**/*.js', ['scripts']);

    // Watch for changes to our SASS
    gulp.watch( [
        __dirname + 'css/sass/**/*.scss'
    ], ['sass'] );

    // Watch for changes in our build
    gulp.watch([ __dirname +'/css/app.css', __dirname +'/js/**/*.js' ] )
        .on('change', helpers.notifyLivereload.bind( this, __dirname, plugins.livereload ) );

});

// Default Task
gulp.task('default', ['install']);