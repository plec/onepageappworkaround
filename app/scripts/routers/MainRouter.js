/*global define */
define(["jquery", "backbone", "underscore"], function($, Backbone, _){
    'use strict';    

    var MainRouterClass = Backbone.Router.extend({
        routes: {
            "!/hello": "sayHello",
            "!/listTechnos": "listTechnos",
            "!/activities": "listActivity"
        },
    
        initialize: function () {
            MainRouterClass.__super__.initialize.apply(this, arguments);
            // Starting urls handlings
            // See http://backbonejs.org/#Router
            Backbone.history.start();
        },
    
        sayHello: function(){
            console.log("hello has been called !");
            require(["views/HelloView"], function(HelloView){
                window.view = new HelloView({ el: $("#my-link") }).render();
            });
        },

        listTechnos: function(){
            require(["views/TechnoListingView"], function(TechnoListingView){
                window.view = new TechnoListingView({ el: $(".hero-unit") }).render();
            });
        },
        listActivity: function(){
        	console.log("listActivity has been called !");
            require(["views/ActivityListingView"], function(ActivityListingView){
                window.view = new ActivityListingView({ el: $(".hero-unit") }).render();
            });
        }
    });
    
    return MainRouterClass;
});