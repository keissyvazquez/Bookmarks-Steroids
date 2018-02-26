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
			window.credentials = credentials;
		} else {
			document.location.href= 'login.html';
		}
  	});

	// This is just for testing! Delete when done
	$("#clearData").click(function() {
		chrome.storage.sync.clear(function(){
	      console.log("Cleared")
	    });
	})


	$("#addBookmark").click(function(){
		var $_btn = $(this); 
	      	var $_form = $_btn.parents("form");

		var credentials = window.credentials;
		var bookmark = { 
			title: $_form.find("input[name=tName]").val(),
			url: $_form.find("input[name=urlName]").val(), 
			description: $_form.find("textarea[name=descriptionText]").val(),
			category: $_form.find("select[name=categoryName]").val(), 
		}
	$.ajax({
			method: "POST", 
			url: "http://localhost:5000/api/urls", 
			data: bookmark, 
			beforeSend: function (xhr) {
			    xhr.setRequestHeader ("Authorization", "Basic " + btoa(credentials.email + ":" + credentials.password));
			},
		}).done(function(result){ 
			$("#ajaxMessage").show();
			$("form").hide();
		}).fail(function(jqXHR, status, errorThrown){ 
			console.log(status + " and " + errorThrown); 
		}); 
		return false; 
	})
	// $("#profileID").click(function(){ 
	// 	chrome.windows.create(object createData, function(){ 
	// 		console.log('this works');
	// 	})
	// })

}