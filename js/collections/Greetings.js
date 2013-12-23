define(
    [
        'backbone',
        'js/models/GreetingModel'
    ],
    function ( Backbone, GreetingModel ) {

        return Backbone.Collection.extend({

            model : GreetingModel
        });
    }
);