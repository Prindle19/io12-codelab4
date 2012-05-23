function loadDirectoryJSONP(token){
    
//URL of the Maps Engine Directory
var url = 'https://mapsenginedirectory.appspot.com/?filter=all&format=jsonp&acl=protected&callback=parseDirectory&token=' + token;

// Create Insertable Script
var script = document.createElement('script');
script.setAttribute('src', url);

// load the script
document.getElementsByTagName('head')[0].appendChild(script); 
    
}

function parseDirectory(data){

  $.each(data.databases, function(mapindex) {
    var isPub = "";
    var gebmapselect = null;
        // If the map is public, add it to the public select
   	if (data.databases[mapindex].shared_with === 'public') {
   	  gebmapselect = document.getElementById('gebPublicMaps');
   	 	// If the maps is private, ass it to the private select
   	} else {
   	  gebmapselect = document.getElementById('gebPrivateMaps');
   	}
       
    var newOption = document.createElement('option');
    mapID = data.databases[mapindex].url.split("/")[3];
    newOption.value = mapID;
    newOption.text = data.databases[mapindex].name;
    try {
      gebmapselect.add(newOption, null)
   	}
    catch(ex){
   	  gebmapselect.add(newOption);
    }   
  });   
    
}    


function loadMapRootJSONP(mapID) {
    
 // Get MapRoot JSON from Maps Engine Directory

// URL of the external script
if (pubLimited == "private") {
  var url = 'https://mapsenginedirectory.appspot.com/maproot/?acl=protected&format=jsonp&callback=parseMapRoot&map=' + mapID + "&token=" + g_oauth_token_value;
}else{
  var url = 'https://mapsenginedirectory.appspot.com/maproot/?acl=public&format=jsonp&callback=parseMapRoot&map=' + mapID;      
}    

// Create Insertable Script
var script = document.createElement('script');
script.setAttribute('src', url);

// load the script
document.getElementsByTagName('head')[0].appendChild(script);    
    
}    

function parseMapRoot(data) {
     //Clear out anything existing in the Select Layers DIV
  $("#select_layers").empty();
     //Clear out all the MapDataLayer GEB Layers, and the associated array
  gebLayer = null;
  gebLayers = new Array();
  i = 0;
     //Set the map bounds equal to the MapRoot bounds
  setMapBounds(data.bounds);
    // Append a UL called layer_picker to the select_layers div
  $("#select_layers").append("<ul id='layer_picker' style='list-style-type: none; font-size: 10pt;'></ul>");
     //Parse the contents of the MapRoot and create an interactive list of checkboxes to allow users to toggle on and off layers.
  $.each(data.layers, function(layerIndex) {
      //detect and handle folders 
    if (data.layers[layerIndex].layerType == "FOLDER"){
 	  parseFolder(data.layers[layerIndex]);
 	} else {  
      parseLayer(data.layers[layerIndex]);
    } 
  });
  $('#accordion').accordion('activate', 1);
  
    //add a JQuery Listener to the new "layer" class, so when a checkbox is checked, it will toggle a layer on or off
  $('.layer').change(function(){
  var layerID = parseInt($(this).attr('id'));
    if ($(this).attr('checked')){
      gebLayers[layerID].setMap(map);
    }else{
      gebLayers[layerID].setMap(null);
    }      
  });  
}

function parseFolder(folder){
  var lastFolder = null;
  $.each(folder.sublayers, function(folderIndex) {
    if (lastFolder != folder.layerName){
      $("#layer_picker").append("<span id='folderText'>" + folder.layerName + "</span>");
 	    lastFolder = folder.layerName
    }
    if (folder.sublayers[folderIndex].layerType == "FOLDER"){
      parseFolder(folder.sublayers[folderIndex]);
    } else {
      parseLayer(folder.sublayers[folderIndex]);
    }
  });
}

function parseLayer(theLayer){
  $("#layer_picker").append('<li><input type="checkbox" name="GEBRadio" id="' + i + '" class="layer"/><label for="' + i + '">' + "   " + theLayer.layerName + '</label></li>');
    // Construct a new MapDataLayer for each GEB layer.
  gebLayer = new google.maps.visualization.MapDataLayer({
    mapId: mapID,
    layerId: theLayer.key,
    suppressInfoWindows: false,
    oAuthToken: g_oauth_token_value
  });
    // Add the MapDataLayer to an array so that they can be toggled on and off
  gebLayers.push(gebLayer);
  i++
}