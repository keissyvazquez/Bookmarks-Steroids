
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
          // this is storing data locally 
          var Value = this.data
          chrome.storage.sync.set({'value': Value}, function(){
            console.log("Storing data locally.");
            document.location.href= 'profile.html';
          });
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
