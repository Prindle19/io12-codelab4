var map;
function initialize() {
 /**
 * Map options
 */
var myOptions = {
     center: new google.maps.LatLng(39.2244, -78.2532),
     zoom: 10,
     minZoom: 1,
     maxZoom: 19,
	 mapTypeId: google.maps.MapTypeId.ROADMAP,
	 scaleControl: true
};

/*  Initialize map  */
map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
     
// Get MapRoot JSON from Maps Engine Directory

// URL of the external script
var url = 'https://mapsenginedirectory.appspot.com/maproot/?acl=public&format=jsonp&callback=parseMapRoot&map=04996796288385000359-08363259842776504974-4';

// Create Insertable Script
var script = document.createElement('script');
script.setAttribute('src', url);

// load the script
document.getElementsByTagName('head')[0].appendChild(script); 

}
google.maps.event.addDomListener(window, 'load', initialize);