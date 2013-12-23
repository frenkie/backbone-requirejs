define(
    [
        'backbone',
        'js/lib/template!templates/hello.html'
    ],
    function ( Backbone, template ) {

        return Backbone.View.extend({

            render : function ( data ) {
                this.$el.html( template.render( data || {} ) );
            }
        });
    }
);