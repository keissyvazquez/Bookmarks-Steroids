 $(document).ready(function(){
    $('#login_form').submit(function(){
      var credentials = {
        email: $('#email-input').val(),
        password: $('#password-input').val()
      }
      $.ajax({
        method: 'POST',
        url: 'http://localhost:5000/login',
        data: credentials
      })
      .done(function(result){
        console.log("Login successful");
        // this is storing data locally 
        var Value = credentials;
        chrome.storage.sync.set({'value': Value}, function(){
          document.location.href= 'add_bookmark.html';
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

    $("#signupBtn").click(function() {
      var $_btn = $(this);
      var $_form = $_btn.parents("form");

      var userData = {
        first_name: $_form.find("input[name=fName]").val(),
        last_name: $_form.find("input[name=lName]").val(),
        email: $_form.find("input[name=email]").val(),
        password: $_form.find("input[name=password]").val()
      }

      $.ajax({
        method: 'POST',
        url: 'http://localhost:5000/register',
        data: userData,
        dataType: "json"
      })
      .done(function(result){
        console.log("Registration successful");
        // this is storing data locally 
        document.location.href = 'login.html';
      })
      .fail(function(jqXHR, status, errorThrown) {
        console.log(status + " and " + errorThrown);
      });

      return false;
    })
  });