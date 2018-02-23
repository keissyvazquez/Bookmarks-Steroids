  $(document).ready(function(){
    $('#login_form').submit(function(){
      var credentials = {
        email: $('#email-input').val(),
        password: $('#password-input').val(),
      };
      $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/login',
        // dataType: json,
        data: credentials
      })
      .done(function(result){
        console.log("Login successful");
        console.log(credentials);
        // this is storing data locally
        var Value = credentials
        chrome.storage.sync.set({'value': Value}, function(){
          console.log("Storing data locally.");
          document.location.href= 'profile.html';
        });
      })
      .fail(function(jqXHR, status, errorThrown) {
        console.log(status + " and " + errorThrown);
      });
      return false;
    });

    $('#login').click(function(){
      $('#login_form').submit()
    });
  });
