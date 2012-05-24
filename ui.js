$(function() {
    $( "#accordion" ).accordion({
		autoHeight: false,
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
  pubLimited = "private";
  loadMapRootJSONP(mapID);   	   
}
 //This function handles what happens when the user picks a Public map  
function pickGEBPublicMap(){
  var map = document.getElementById('gebPublicMaps') ;
  var mapIndex = map.selectedIndex;
  mapID = map.options[mapIndex].value;
  var mapName = map.options[mapIndex].text ;
  pubLimited = "public";
  loadMapRootJSONP(mapID);    
}

function showSideBar() {
  $("#side_bar").animate({ width: '400px' }, { duration: 500 });
  $("#side_bar").show("fast");      
}    