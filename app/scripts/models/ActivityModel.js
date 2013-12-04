/*global define */
define(["backbone", "underscore"], function(Backbone, _){
    'use strict';
    var ActivityModelClass = Backbone.Model.extend({
		url: function(){ 
		/*this.get("id") ou $("#activities").val()*/
			return "/data/activity"+this.get("id")+".json";
		},
        defaults: {
        },

        initialize: function(attributes, options){
            ActivityModelClass.__super__.initialize.call(this,attributes, options);
        },
		getDescription : function() {
			return this.get("type") + " - " + this.get("date");
		},
		getTrackPoints : function() {
			if(typeof(this.get("trackpoints"))=='undefined'){ 
				console.log("warn : no trackpoints found !");
				return 0;
			} else {
				return this.get("trackpoints").length;
			}
		}
		
        // Aliases
    });

    return ActivityModelClass;
});