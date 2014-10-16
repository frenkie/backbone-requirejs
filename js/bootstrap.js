requirejs.config({
    paths : {
        backbone : 'vendor/js/backbone-min',
        handlebars : 'vendor/js/handlebars',
        jquery : 'vendor/js/jquery.min',
        underscore : 'vendor/js/underscore-min',
        'jquery.xdomainrequest' : 'vendor/js/jquery.xdomainrequest'
    },
    shim : {
        handlebars : {
            exports : 'Handlebars'
        },
        'jquery.xdomainrequest' : ['jquery']
    }
});

require(
    [
        'js/controllers/AppController'
    ],

    function ( AppController ) {

        var app = new AppController( document.getElementById('app') );
    }
);