var map;
function initializeMap() {
 /**
 * Map options
 */
var myOptions = {
     center: new google.maps.LatLng(0, 0),
     zoom: 3,
     minZoom: 1,
     maxZoom: 19,
	 mapTypeId: google.maps.MapTypeId.ROADMAP,
	 scaleControl: true
};

/*  Initialize map  */
map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

}

function setMapBounds(bounds){
 
   var southWestlat = bounds.southWest.lat;
   var southWestlng = bounds.southWest.lng;
   var northEastlat = bounds.northEast.lat;
   var northEastlng = bounds.northEast.lng;
 
   var southWest = new google.maps.LatLng(southWestlat,southWestlng);
   var northEast = new google.maps.LatLng(northEastlat,northEastlng);
   var bounds = new google.maps.LatLngBounds(southWest,northEast);
   map.fitBounds(bounds);

 }

function clearLayers(){

  $.each(gebLayers, function(gebLayerIndex) {
      //set all the layers that might be on to null to remove from the map
    gebLayers[gebLayerIndex].setMap(null)
  });

}    

google.maps.event.addDomListener(window, 'load', initialize);