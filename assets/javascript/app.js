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

//function that pushes strains to database
function masterDatabase() {
    $.ajax({
        url: "http://strainapi.evanbusse.com/vij2AV1/strains/search/all",
        method: "GET",

    }).then(function (response) {
        // console.log(response)
        // database.ref("/master/").push({
        //     strain: 'evan'
        // });
        var x;
        for (x in response ) {
            var strainName = x;
            var strainId = response[x].id;

            database.ref("/master/").push({
            strainName: strainName,
            strainId: strainId
        });
        }
    });
}

//Only execute to update database
// masterDatabase();

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

        //Chart.js example
        new Chart(document.getElementById("myChart"), {
            type: 'bubble',
            data: {
                labels: "Africa",
                datasets: [{
                    label: [response[0].name],
                    backgroundColor: "rgba(255,221,50,0.2)",
                    borderColor: "rgba(255,221,50,1)",
                    data: [{
                        x: 10,
                        y: 5.245,
                        r: 15
                    }]
                }, {
                    label: ["Denmark"],
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: 20,
                        y: 7.526,
                        r: 10
                    }]
                }, {
                    label: ["Germany"],
                    backgroundColor: "rgba(0,0,255,0.2)",
                    borderColor: "#000",
                    data: [{
                        x: 30,
                        y: 6.994,
                        r: 15
                    }]
                }, {
                    label: ["Japan"],
                    backgroundColor: "rgba(193,46,12,0.2)",
                    borderColor: "rgba(193,46,12,1)",
                    data: [{
                        x: 40,
                        y: 5.921,
                        r: 15
                    }]
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Predicted world population (millions) in 2050'
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Happiness"
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "GDP (PPP)"
                        }
                    }]
                }
            }
        });
    });
});