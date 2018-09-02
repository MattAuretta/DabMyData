  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyApiBh2t_1-6A-4T1Wyw5QM5OMnJu0ldDM",
      authDomain: "dabmydata.firebaseapp.com",
      databaseURL: "https://dabmydata.firebaseio.com",
      projectId: "dabmydata",
      storageBucket: "dabmydata.appspot.com",
      messagingSenderId: "732218104009"
  };
  firebase.initializeApp(config);

  $.ajax({
      url: "http://strainapi.evanbusse.com/vij2AV1/strains/search/all",
      method: "GET",

  }).then(function (response) {
      console.log(response);
      
  });