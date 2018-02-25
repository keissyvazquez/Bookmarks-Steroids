// This says to run function when page loads...
document.body.onload = function() {
	// ...get the users credentials
  	chrome.storage.sync.get("value", function(data) {
  		var credentials = data.value;
  		// If an error, log and return
	    if (chrome.runtime.error) {
			console.log("Error: " + chrome.runtime.error);
		} else if (credentials && credentials.email && credentials.password ) {
			// This is good, do something
		} else {
			document.location.href= 'login.html';
		}
  	});
}

// This is just for testing! Delete when done
$("#clearData").click(function() {
	chrome.storage.sync.clear(function(){
      console.log("Cleared")
    });
})