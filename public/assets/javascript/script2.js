document.body.onload = function(){

	var loadUrls = function() {
		$.ajax({
			method: "GET",
			url: window.API_URL + "/api/urls",
			beforeSend: function (xhr) {
				var authValue = "Basic " + btoa(credentials.email + ":" + credentials.password);
			    xhr.setRequestHeader ("Authorization", authValue);
			},
		}).done(function(response){
			for (var i = 0; i < response.length; i++){
	   			var description = response[i].description;
	   			var title = response[i].title;
	   			var url = response[i].url;
	   			var category = response[i].category;

	   			var titleClass = $("<h3 class='card-title'>");
				var descriptionClass = $("<p class='card-text'>");
				var cardB = $("<div class='card-block'>");
				var urlThing = $("<a href='' target='_blank'>");

	   			// Url field
	   			urlThing.attr("href", url);
	   			urlThing.text(title);

	   			// Add Url to Title <div>
	   			titleClass.append(urlThing);

	   			// Add Title to card <div>
	   			cardB.append(titleClass);

	   			descriptionClass.text(description);
	   			cardB.append(descriptionClass);

	   			$("#category" + category + " .card").append(cardB)
	   		}
		}).fail(function(jqXHR, status, errorThrown){
			console.log(errorThrown);
			if (errorThrown === "Unauthorized")
				document.location.href= 'login.html';
		});
	}
	// ...get the users credentials
  	chrome.storage.sync.get("value", function(data) {
  		var credentials = data.value;
  		// If an error, log and return
	    if (chrome.runtime.error) {
			console.log("Error: " + chrome.runtime.error);
		} else if (credentials && credentials.email && credentials.password ) {
			// This is good, do something
			window.credentials = credentials;
			loadUrls();
		} else {
			document.location.href= 'login.html';
		}
  	});


} 	
