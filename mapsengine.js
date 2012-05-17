function parseMapRoot(data) {
    //g = data
    //g is just useful in case you want to use developer tools to poke around at the returned json object
    //alert(data.name)
    $("#side_bar").append('<div id="map_title"><h3>' + data.name +'</h3></div>');
    $("#side_bar").append('<ul id="layer_picker" style="list-style-type: none;"></ul>');
    var index = 0
    $.each(data.layers, function(index) {
        $("#layer_picker").append('<li><input type="checkbox" id="' + index + '" class="layer"/><label for="' + index + '">' + data.layers[index].layerName.replace("Frederick County Virginia", "").replace("County Mosaic", "") + '</label></li>');
        
        gebLayer = new google.maps.visualization.MapDataLayer({
            mapId: data.assetId,
            layerId: data.layers[index].key,
            suppressInfoWindows: false,
            oAuthToken: "public"
        });
       //gebLayer.setMap(map)
        gebLayers.push(gebLayer);
        
    });  
  
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

