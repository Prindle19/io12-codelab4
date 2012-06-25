function initialize() {
    // oAuth2 Authenticate
    //Check to see if there is a hash value
  var hash_value = window.location.hash;
    //If there is no has value, that means we need to redirect to the Google OAuth 2.0 API and get a token
    //We need to send the unique client ID, API Scope, and Redirect URI info to the API. We must construct a URI to do this.
    //Set Your Client ID and Redirect URL (Step 1)
    /////////////////////////////////////////////////////////////////
    // PASTE Your ClientID and Redirect URI for STEP 1 BELOW  //////
    ///////////////////////////////////////////////////////////////
  if (!hash_value) {
       // We start with the base oauth2 URI.
	 var redirect_url = "https://accounts.google.com/o/oauth2/auth";
       // Next we append the unique Client ID.
     redirect_url += "?client_id=";
       // Then we append the redirect URI.
     redirect_url += "&redirect_uri=";
       // Next we append the "Scope" or permisions to other Google APIs to which we need the user to grant access to their information.
     redirect_url += "&scope=https://www.googleapis.com/auth/earthbuilder.readonly";
       // Finally, we need to specify that we want a token.
     redirect_url += "&response_type=token";
       //Then redirect the web page to our new URL.
	 window.location = redirect_url;
	 return;
  }
    // If there is a hash value, begin parsing it.
  if (hash_value[0] == "#") {
    hash_value = hash_value.slice(1);
  }
	 
    // We need to search for the access_token response to grab the OAuth 2.0 token.
  var hash_parts = hash_value.split("&");
  for (var i = 0; i < hash_parts.length; ++i) {
    var name_value = hash_parts[i].split("=");
	if (name_value.length == 2) {
	  var name = name_value[0];
	  var value = name_value[1];
	  if (name == "access_token") {
	    g_oauth_token_value = value;
	      // Now that we have a valid token, we call our function that will use that token to query the Google Earth Builder  API with that token and return the user's maps.
	      // We then load the Maps API and get all the user's maps.
	    loadDirectoryJSONP(g_oauth_token_value);
	    break;
	  }
    }
  }
  if (!g_oauth_token_value) {
    return;
  }         
  initializeMap();
}
    