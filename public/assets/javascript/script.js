  var button = document.getElementById("login"); 

  button.addEventListener("click", function(){ 
    var email = document.getElementById("email-input").value; 
    var password = document.getElementById("password-input").value;
    console.log(email);
    console.log(password);
     $.post( "login.html", { email: "John@gmail.com", password: "123456" })
	    .done(function( data ) {
	     alert( "Data Loaded: " + data );
    });


  }); 

  $("#signup").on("click", function(){ 
  	location.href = "/signup.html"

  })
