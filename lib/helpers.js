var express = require('express');
var pathUtil = require('path');

exports.notifyLivereload = function( basePath, livereload, event ) {

    // `gulp.watch()` events provide an absolute path
    // so we need to make it relative to the server root
    var fileName = pathUtil.relative( basePath, event.path );

    livereload.changed( fileName );
};

exports.startExpress = function( basePath, port ) {

    port = port || 4000;

    var app = express();

    app.use(express.static( basePath ));
    app.listen( port );

    console.log('express server started on localhost:'+ port );
};