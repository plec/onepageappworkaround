/*global define */
define([], function(){
    'use strict';    

    var LeafletUtils2Class = {

    clearMap:function (currentMap, markers) {
		var m = currentMap;
	    for(var i in m._layers) {
	        if(m._layers[i]._path != undefined) {
	            try {
	                m.removeLayer(m._layers[i]);
	            }
	            catch(e) {
	                console.log("problem with " + e + m._layers[i]);
	            }
	        }
	    }
	    // remove markers
	    for (var j in markers) {
	    	 m.removeLayer(markers[j]);
	    }
	},
	showPointsFromJSONActivity: function(currentModel, trackpoints, currentMap, markers) {
		console.log("showPointsFromJSONActivity ");
		var points = new Array();
		var pointIcon = L.icon({
		    iconUrl: '/images/marker-icon.png',
		    iconAnchor: [12, 40]
		});
		//add start and end point
		var startMarker = new L.Marker(new L.LatLng(trackpoints[0].latlong.lat, trackpoints[0].latlong.lon), {icon: pointIcon, title:"start"});
		markers.push(startMarker);
		currentMap.addLayer(startMarker);
		var endMarker = new L.Marker(new L.LatLng(trackpoints[trackpoints.length-1].latlong.lat, trackpoints[trackpoints.length-1].latlong.lon), {icon: pointIcon, title:"end"});
		markers.push(endMarker);
		currentMap.addLayer(endMarker);

		var totalDistance = 0;
		var intermediateDistance = 0;
		var currentDistance = 0;
		var j = 1;
		//push all points
		for (var i=0;i<trackpoints.length;i++) {
			var latLng = new L.LatLng(trackpoints[i].latlong.lat, trackpoints[i].latlong.lon);
			points.push(latLng);
			if (i>0) {
				var previousLatLng = new L.LatLng(trackpoints[i-1].latlong.lat, trackpoints[i-1].latlong.lon);
				currentDistance = getDistanceFromLatLonInmeter(latLng, previousLatLng);
				totalDistance+=currentDistance;
				intermediateDistance+=currentDistance;
				var currentTime = new Date(trackpoints[i].time).getTime();
				var previousTime = new Date(trackpoints[i-1].time).getTime();
				var currentSpeed = currentDistance/(currentTime-previousTime)*1000;
				currentModel.get("trackpoints")[i].speed = currentSpeed;
				var currentColor = 'red';
				if (currentSpeed > 2.3 && currentSpeed <= 2.5) {
					currentColor = 'orange';
				} else if (currentSpeed > 2.5 && currentSpeed <= 2.7) {
					currentColor = 'yellow';
				} else if (currentSpeed > 2.7) {
					currentColor = 'green';
				}
				var polyline = L.polyline([previousLatLng, latLng], {color: currentColor}).addTo(currentMap);
			}
			if (intermediateDistance>1000) {
				intermediateDistance = 0;
				var currentTitle = "km-"+j;
				var currentMarker = new L.Marker(latLng, {title:currentTitle});
				currentMap.addLayer(currentMarker);
				markers.push(currentMarker);
				j++;
			}
		}
		/* Calcul de stats */
		var timeStart = new Date(currentModel.get("start")).getTime();
		var timeEnd = new Date(currentModel.get("end")).getTime();
		var averageSpeed = (totalDistance/1000) / ((timeEnd-timeStart)/(1000*3600));
		currentModel.set("totalTimeInMinutes", (timeEnd-timeStart)/(1000*60));
		currentModel.set("totalDistance", totalDistance);
		currentModel.set("averageSpeed", averageSpeed);
		//var selectedPolyline = L.polyline(points, {color: 'blue'}).addTo(currentMap);
	},
	changeMapPosition : function (latitude, longitude, zoom){
		console.log("change map position to " + latitude + " / " + longitude);
		globalMap.setView([latitude, longitude], zoom);
	}
    };
	return LeafletUtils2Class;
});

function deg2rad (deg) {
	  return deg * (Math.PI/180);
	}
	
function getDistanceFromLatLonInKm (latlng1, latlng2) {
		var lat2=latlng2.lat;
		var lon2=latlng2.lng;
		var lat1=latlng1.lat;
		var lon1=latlng1.lng;
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2-lat1);  // deg2rad below
		var dLon = deg2rad(lon2-lon1); 
		var a = 
			Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
			Math.sin(dLon/2) * Math.sin(dLon/2)
	    ; 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c; // Distance in km
		return d;
	}
	
function getDistanceFromLatLonInmeter(latlng1, latlng2) {
		return getDistanceFromLatLonInKm(latlng1, latlng2)*1000;
}
function mPerSToKmPerH(speedInMPerS) {
	return speedInMPerS/1000*3600;
}

