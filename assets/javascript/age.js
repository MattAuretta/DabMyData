console.log("age")
$(document).ready(function() {
    var age = {};
  
    // For use without cookies
    $('#ageModal').modal("show");
    initAge();
    
  /*  // check if cookie for validAge exists..
    if (cookie.get('validAge') == 'true') {
      return true;
    } else {
      // doesn't exist so lets make them enter a birthday...
      $('#ageModal').modal('show');
      initAge();
    }*/
  
    // starts the age verification process
    function initAge() {
  
      $("#age-submit").on("click", function() {
        // var age = $("#verify-month").val()
        // var day = $("#verify-day").val();
        // var year = $("#verify-year").val();
        var age = {
            'month': $("#verify-month").val(),
            'day': $("#verify-day").val(),
            'year': $("#verify-year").val()
        }
        console.log(age);
        checkDate(age);
      });
    }
  
    // Check to see if user entered a valid date...
    function checkDate(age) {
        console.log(age);
      if (age.month == 'none' || age.day == 'none' || age.year == 'none') {
        // Fade in the error...
        $('#modal-error').css('visibility', 'visible').hide().fadeIn('slow');
  
        // changes the background color of the select if invalid
        if (age.month == 'none') {
          $("#verify-month").css('background', 'rgba(223,32,44,0.5)');
          // Look for change of value and change background color when valid
          $("#verify-month").on('change', function() {
            if ($("#verify-month").val() == 'none') {
              $("#verify-month").css('background', 'rgba(223,32,44,0.5)');
            } else {
              $("#verify-month").css('background', 'white');
            }
          });
        }
  
        // changes the background color of the select if invalid
        if (age.day == 'none') {
          $("#verify-day").css('background', 'rgba(223,32,44,0.5)');
          // Look for change of value and change background color when valid
          $("#verify-day").on('change', function() {
            if ($("#verify-day").val() == 'none') {
              $("#verify-day").css('background', 'rgba(223,32,44,0.5)');
            } else {
              $("#verify-day").css('background', 'white');
            }
          });
        }
  
        // changes the background color of the select if invalid
        if (age.year == 'none') {
          $("#verify-year").css('background', 'rgba(223,32,44,0.5)');
          // Look for change of value and change background color when valid
          $("#verify-year").on('change', function() {
            if ($("#verify-year").val() == 'none') {
              $("#verify-year").css('background', 'rgba(223,32,44,0.5)');
            } else {
              $("#verify-year").css('background', 'white');
            }
          });
        }
      } else {
        oldEnough(age);
      }
    }
  
    // Compares age entered with todays date 21 years ago...
    function oldEnough(age) {
        console.log(age);
      var ageLimit = moment().subtract(21, 'years').calendar();
      console.log(ageLimit);
      var birthDate = age.month + " " + age.day + " " + age.year;
      console.log(birthDate);
      var oldEnough = moment(birthDate, "MM DD YYYY").isBefore(ageLimit, 'day');
  
      if (oldEnough) {
        //cookie.set('validAge', 'true');
        $('#ageModal').modal('hide');
      } else {
        // window.location.assign("https://www.google.com")
        window.location.href = ""
        console.log(window.location.href)
        //cookie.set('validAge', 'false');
        console.log("it is false");
      }
    }
  });