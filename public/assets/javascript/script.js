// This says to run function when page loads...
document.body.onload = function() {
	var $_btn = $(this);
	var $_form = $_btn.parents("form");
	var bookmark = {
	title: $_form.find("input[name=tName]").val(),
	url: $_form.find("input[name=urlName]").val(),
	description: $_form.find("textarea[name=descriptionText]").val(),
	category: $_form.find("select[name=categoryName]").val(),
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
		} else {
			document.location.href= 'login.html';
		}
  	});
  	chrome.tabs.getSelected(null, function(tab) {
		        tabId = tab.id;
		        tabUrl = tab.url;
		        var url = bookmark.url
		        $("#urlBookmark").val(tabUrl); 
		        console.log(tabUrl);
		    });

	$("#addBookmark").click(function(){


		var credentials = window.credentials;

		$.ajax({
				method: "POST",
				url: window.API_URL + "/api/urls",
				data: bookmark,
				beforeSend: function (xhr) {
					var authValue = "Basic " + btoa(credentials.email + ":" + credentials.password);
				    xhr.setRequestHeader ("Authorization", authValue);
				},
			}).done(function(result){
				$("#ajaxMessage").show();
				$("form").hide();
			}).fail(function(jqXHR, status, errorThrown){
				console.log(errorThrown);
				if (errorThrown === "Unauthorized")
					document.location.href= 'login.html';
			});

		return false;
	})
}