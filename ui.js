$(function() {
    $( "#accordion" ).accordion({
		autoHeight: true,
		navigation: true,
		fillSpace:false		
	});
});

 //This function handles what happens when the user picks a Private map
function pickGEBPrivateMap(){
  var map = document.getElementById('gebPrivateMaps') ;
  var mapIndex = map.selectedIndex;
  mapID = map.options[mapIndex].value;
  var mapName = map.options[mapIndex].text ;
  loadMapRootJSONP(mapID);   	
  pubLimited = "private"; 
}
 //This function handles what happens when the user picks a Public map  
function pickGEBPublicMap(){
  var map = document.getElementById('gebPublicMaps') ;
  var mapIndex = map.selectedIndex;
  mapID = map.options[mapIndex].value;
  var mapName = map.options[mapIndex].text ;
  loadMapRootJSONP(mapID); 
  pubLimited = "public"; 
}