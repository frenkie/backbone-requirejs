(function ( rootScope ) {

    define('jquery', function () {
        return rootScope.jQuery;
    });

    requirejs.config({
        paths : {
            'backbone' : 'vendor/backbone-amd/backbone',
            'underscore' : 'vendor/underscore-amd/underscore'
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

}( window ));