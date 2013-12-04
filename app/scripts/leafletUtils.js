function deg2rad(deg) {
	  return deg * (Math.PI/180);
	}
function getDistanceFromLatLonInKm(latlng1, latlng2) {
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
