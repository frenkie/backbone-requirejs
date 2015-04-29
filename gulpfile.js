var gulp = require('gulp');


var del = require('del'),
    es = require('event-stream'),
    helpers = require('./lib/helpers'),
    plugins = require('gulp-load-plugins')();

var VENDOR_SRC = __dirname +'/node_modules/';


gulp.task('clean', function ( cb ) {
    del( __dirname +'/vendor', cb );
});

// install, needs to be called after npm install
gulp.task('install', ['vendor', 'sass']);

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

gulp.task('vendor', ['vendor-styles', 'vendor-scripts']);

gulp.task('vendor-styles', ['clean'], function ( cb ) {

    es.concat(
        gulp.src([
                VENDOR_SRC +'bootstrap/dist/css/bootstrap.min.css'
            ])
            .pipe( gulp.dest( __dirname +'/vendor/css' ) ),

        gulp.src([
                VENDOR_SRC +'bootstrap/dist/fonts/**/*'
            ])
            .pipe( gulp.dest( __dirname +'/vendor/fonts' ) )

    ).on('end', cb );
});

gulp.task('vendor-scripts', ['clean'], function ( cb ) {

    gulp.src([
        VENDOR_SRC +'backbone/backbone-min.js',
        VENDOR_SRC +'backbone/backbone-min.map',
        VENDOR_SRC +'handlebars/dist/handlebars.amd.min.js',
        VENDOR_SRC +'jquery/dist/jquery.min.js',
        VENDOR_SRC +'jquery/dist/jquery.min.map',
        VENDOR_SRC +'requirejs/require.js',
        VENDOR_SRC +'underscore/underscore-min.js'
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
        __dirname + '/css/sass/**/*.scss'
    ], ['sass'] );

    // Watch for changes in our build
    gulp.watch([ __dirname +'/css/app.css', __dirname +'/js/**/*.js' ] )
        .on('change', helpers.notifyLivereload.bind( this, __dirname, plugins.livereload ) );

});

// Default Task
gulp.task('default', ['install']);