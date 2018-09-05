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

//Create variable for database
var database = firebase.database();

//When user clicks search
$("#add-strain").on("click", function (event) {
    event.preventDefault();
    //Create variable to hold user input
    var strain = $("#strain-input").val().trim()
    //Create local variable to push to Firebase
    var currentStrain = strain
    //Set the strain in Firebase
    database.ref("/strain/").set(currentStrain);
    //Empty search field
    $("#strain-input").val("")
})

//When the databse receives a new strain value
database.ref("/strain/").on("value", function (childSnapshot) {
    //Create local variable for strain
    var strain = childSnapshot.val()
    //AJAX call to The Strain API
    $.ajax({
        url: "http://strainapi.evanbusse.com/vij2AV1/strains/search/name/" + strain + "",
        method: "GET",

    }).then(function (response) {
        console.log(response);

    });
});

//Chart.js example
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    },

    // Configuration options go here
    options: {}
});