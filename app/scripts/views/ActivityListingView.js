/*global define */
define([
    "backbone", "underscore", "hbs!templates/ActivitiesListing","hbs!templates/ActivityDetails" ,"leafletUtils", "models/ActivitiesModel", "models/ActivityModel", "rivets", "goog!visualization,1,packages:[corechart,geochart]"
], function(Backbone, _, viewTemplate, activityDetails, leafletUtils, ActivitiesModel, ActivityModel, rivets, goog){

/*    "backbone", "underscore", "hbs!templates/ActivitiesListing","hbs!templates/ActivityDetails" ,"leafletUtils", "models/ActivitiesModel", "models/ActivityModel", "rivets"
], function(Backbone, _, viewTemplate, activityDetails, leafletUtils, ActivitiesModel, ActivityModel, rivets){
*/

    'use strict';

    var ActivityListingViewClass = Backbone.View.extend({
        events: {
            "change #activities": "showActivity",
			"click #graphs": "showGraphs"

        },

        initialize: function(){
        	ActivityListingViewClass.__super__.initialize.apply(this, arguments);
        	console.log("initialize ActivityListingViewClass");
			  this.activities = new ActivitiesModel(); // here activities are empty !
			  this.currentActivity = new ActivityModel();
//            this.technos = new Technos(); // Here, technos are empty !
//            this.editedTechno = new Techno();
        },

        render: function(){
        	console.log("ActivityListingViewClass : call render");
        		var self = this;
				/* with rivets */
				self.$el.html(viewTemplate({ }));
				rivets.bind(self.$el, {activities: this.activities});
				/* end with rivets */
				
				$.when(
        				this.activities.fetch() // il existe aussi get, save, put, post etc. Method renvoi une promise
        		).then(function() {
        			console.log(" activities fetched !");
        		});
				
				/* this also works !
								$.when(
        				$.ajax("/data/activities.json")
        		).then(function(activitiesFound) {
					//debugger;
        			console.log("found " + activitiesFound.length + " activities !");
					for (var i =0; i < activitiesFound.length; i++) {
						self.activities.push(activitiesFound[i]);
					}				
					//debugger;
					//self.$el.html(viewTemplate({ activities: activitiesFound}));
        		});
				*/

        		console.log("ActivityListingViewClass : end rendering");
            return this;
        },
        showActivity: function(){
        	var self = this;

			/* with rivets */
			$("#activity-details").html(activityDetails({ }));
			rivets.bind($("#activity-details"), {activity: this.currentActivity});
			/* end with rivets */

			var selectedActivity = $("#activities").val();
			self.currentActivity.set("id", selectedActivity);
			if (selectedActivity > 0) {
				console.log("show activity details for activity : "+ selectedActivity);
				$.when(
						self.currentActivity.fetch()
						//$.ajax("/data/activity"+selectedActivity+".json")
				).then(function() {
					console.log("found activity id " + selectedActivity);
					//$("#activity-details").html(activityDetails({ activity: activityFound}));
					var firstLatLon = self.currentActivity.get("trackpoints")[0].latlong;
					leafletUtils.changeMapPosition(firstLatLon.lat, firstLatLon.lon, 14)
					leafletUtils.clearMap(globalMap, markers);
					leafletUtils.showPointsFromJSONActivity(self.currentActivity, self.currentActivity.get("trackpoints"), globalMap, markers);
				});
			}
			$("#charts").html("");

			/* this works fine !
        	var selectedActivity = $("#activities").val();
			if (selectedActivity >0) {
				console.log("show activity details for activity : "+ selectedActivity);
				$.when(
						$.ajax("/data/activity"+selectedActivity+".json")
				).then(function(activityFound) {
					console.log("found activity id " + selectedActivity);
					$("#activity-details").html(activityDetails({ activity: activityFound}));
					leafletUtils.changeMapPosition(activityFound.trackpoints[0].latlong.lat, activityFound.trackpoints[0].latlong.lon, 14)
					leafletUtils.clearMap(globalMap, markers);
					leafletUtils.showPointsFromJSONActivity(activityFound, globalMap, markers);
				});
			}
			*/
        	return this;
        },
		showGraphs : function() {
			var self = this;
			console.log("showGraphs");
			var allDataArray=new Array();
			var trackpoints = self.currentActivity.get("trackpoints");

			allDataArray.push(['Time', 'Speed', 'Altitude']);
			allDataArray.push([trackpoints[0].time, 0, trackpoints[0].ele]);
			
			for (var i=1;i<trackpoints.length;i++) {
				allDataArray.push([trackpoints[i].time, trackpoints[i].speed, trackpoints[i].ele]);
			}
			var dataAll = new google.visualization.arrayToDataTable(allDataArray);
			var optionsMulti = {
					vAxes: {0: {logScale: false},
							1:{logScale: false}
					},
					series:{
					   0:{targetAxisIndex:0},
					   1:{targetAxisIndex:1}
					   },
					title: trackpoints[0].time
			};
			new google.visualization.LineChart(document.getElementById("charts")).draw(dataAll, optionsMulti);
        	return this;
			
		}
    });

    return ActivityListingViewClass;
});

