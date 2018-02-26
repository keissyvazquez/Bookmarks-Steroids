document.body.onload = function(){
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "http://localhost:5000/api/urls/",
	  "method": "GET",
	  "headers": {
	    "Content-Type": "application/json",
	    "Authorization": "Basic anF1aW5vbmVzQHlhaG9vLmNvbTpjbGVhbmluZw==",
	    "Cache-Control": "no-cache",
	  	},
	  "processData": false,
	  "data": "{\n\t\"name\": \"Another store\"\n}"
	}; 

	var bookmark = {
			"title": title,
			"description": description,
			"category": category
	}; 
	var categoryID = document.getElementById("category"); 
	var titleID = document.getElementById("title"); 
	var descriptionID = document.getElementById("description"); 
	var column = document.getElementById("column"); 
	var tableRow = document.getElementById("tableRow"); 

   	$.ajax(settings).done(function (response) {
   		 
   		 
		  console.log(response);
		});

} 
	
	