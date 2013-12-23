define(
    [
        'js/collections/Greetings',

        'js/views/HelloView',

        'backbone',
        'jquery',
        'underscore'
    ],

    function ( Greetings,
               HelloView,
               Backbone, $, _
            ) {

        var AppController = function ( container ) {

            this.container = $( container );
            this.greetings = new Greetings();

            this.createViews();

            this.createGreetings();

            this.renderGreetings();
        };

        AppController.prototype = {

            createGreetings : function () {
                this.greetings.add([
                    { title: 'The World' },
                    { title: 'The Universe' },
                    { title: 'Everything' }
                ]);
            },

            createGreetingsViewModel : function () {

                var greeting = [];
                var listSize = this.greetings.size();

                _.each( this.greetings.pluck('title'), function ( title, i ){

                    if ( i > 0 ) {
                        if( i < listSize-1 ) {
                            greeting.push(', ');
                        } else {
                            greeting.push(' and ');
                        }
                    }

                    greeting.push( title );
                });

                return {
                    greeting: greeting.join('')
                };
            },

            createViews : function () {

                this.helloView = new HelloView({ el: this.container });
            },

            renderGreetings : function () {

                this.helloView.render( this.createGreetingsViewModel() );
            }
        };

        return AppController;
    }
);