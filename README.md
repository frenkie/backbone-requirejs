# Backbone RequireJS template

A basic website/app template using Backbone, RequireJS and SASS. Handlebars
is used for HTML templates and a little Bootstrap CSS is added for styling.

The sample site contains a simple Hello app.

## install

The app uses [Bower](http://bower.io/) for external dependencies and 
[Gulp](http://gulpjs.com) for building the project.

You don't need Gulp or Bower per se, but than you'd have to compile 
SASS on your own and manage the external dependencies otherwise.

With Bower and Gulp globally installed you can run `bower install`, 
`npm install` to install Gulp's dependencies and then do `gulp install`
which creates the CSS and puts the Bower dependencies in the correct
folder.

## run

Point a web server to the `index.html` file in the root directory or
you can do `gulp serve` to fire up an [Express](http://expressjs.com)
server at `localhost:4000`.

## develop

While developing, you can use `gulp watch` to watch for SASS and JavaScript
changes and let your CSS be automatically built. It also fires up a
[live reloading](http://livereload.com/) development server through 
[Express](http://expressjs.com), which by default runs on `localhost:4000`.