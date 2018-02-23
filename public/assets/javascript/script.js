
  $(document).ready(function(){
    $('#login_form').submit(function(){
      var emailB = $('#email-input').val();
      var passwordB = $('#password-input').val();
      $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/login',
        // dataType: json,
        data: {
          email: emailB,
          password: passwordB,
        },
        success: function(result){
          console.log("Login successful");

          // TODO: Here you should be saving the email and password
          document.location.href= 'profile.html';
        },
        error: function(jqXHR, status, errorThrown) {
          console.log(status + " and " + errorThrown);
        }

      })
      return false;
    });

    $('#login').click(function(){
      $('#login_form').submit()
    });
  });


  //
  // var settings = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": "http://localhost:5000/login",
  //   "method": "POST",
  //   "headers": {
  //     "authorization": "Basic anF1aW5vbmVzQHlhaG9vLmNvbTpsaWVz",
  //     "cache-control": "no-cache",
  //   },
  //   "data": {
  //     // "email": "jquinones@yahoo.com",
  //     // "password": "cleaning"
  //   }
  // }
  //
  // $.ajax(settings).done(function (response) {
  //   console.log(response);
  // });
