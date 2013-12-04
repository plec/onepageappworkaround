/*global define */
define(["backbone", "underscore", "models/ActivityModel"], function(Backbone, _, activityModel){
    'use strict';    
    var ActivitiesModel = Backbone.Collection.extend({
        model: activityModel,
        url: "/data/activities.json",
        defaults: {
        },

        initialize: function(properties, classProperties){
            ActivitiesModel.__super__.initialize.call(this,properties, classProperties);
        },

        countActivities: function(){ this.models.length; }

        // Aliases
    });

    return ActivitiesModel;
});