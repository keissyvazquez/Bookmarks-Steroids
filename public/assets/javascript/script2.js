document.body.onload = function(){
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": window.API_URL + "/api/urls/",
	  "method": "GET",
	  "headers": {
	    "Content-Type": "application/json",
	    "Authorization": "Basic anF1aW5vbmVzQHlhaG9vLmNvbTpjbGVhbmluZw==",
	    "Cache-Control": "no-cache",
	  	},
	  "processData": false
	}; 


	$.ajax(settings).done(function (response) {
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
   		 
		});

} 
	
	