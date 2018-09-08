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
        for (x in response) {
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

//Function to create datalist in search bar
function strainDatalist() {
    database.ref("/master/").on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var master = childSnapshot.val();
            // console.log(master)
            var masterArray = [];
            masterArray.push(master.strainName);
            // console.log(masterArray);
            for (var i = 0; i < masterArray.length; i++) {
                var option = $("<option>").attr("value", masterArray[i]);
                $("#strains-datalist").append(option);
            }
        })
    })
}

// Append datalist if strain-input is greater than 3 characters
// $("#strain-input").on("input", function () {
//     if ($(this).val().length > 3) {
//         $("#strains-datalist").empty();
//         console.log("test")
//         strainDatalist();
//     } else {
//         $("#strains-datalist").empty();
//     }
// })

strainDatalist();

//When the databse receives a new strain value
database.ref("/strain/").on("value", function (childSnapshot) {

    //Create local variable for strain
    var strain = childSnapshot.val();
    //AJAX call for specific strain user is searching
    $.ajax({
        url: "http://strainapi.evanbusse.com/vij2AV1/strains/search/name/" + strain + "",
        method: "GET",

    }).then(function (response) {
        //Strain name that the user searched
        console.log(response[0].name);
        $("#myChart").remove();
        $("#graph-container").append('<canvas id="myChart"></canvas>');
        //Create empty array to hold all strain names from database
        var masterArray = [];
        //Call Firebase master data
        database.ref("/master/").on("value", function (snapshot) {
            //Get children of snapshot
            snapshot.forEach(function (childSnapshot) {
                //Assign variable to childSnapshot
                var master = childSnapshot.val();
                //Push each childSnapshot into masterArray
                masterArray.push(master);
            })
            console.log(masterArray);
        });

        //Chart.js example
        new Chart(document.getElementById("myChart"), {
            type: 'bubble',
            data: {
                labels: "Africa",
                datasets: [{
                    //Single strain search AJAX call
                    label: [response[0].name],
                    backgroundColor: "rgba(60,186,159,1)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: 25,
                        y: 25,
                        r: 25
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [masterArray[Math.floor(Math.random() * 1971)].strainName],
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: 50,
                        y: 0,
                        r: 10
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [masterArray[Math.floor(Math.random() * 1971)].strainName],
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: 0,
                        y: 50,
                        r: 15
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [masterArray[Math.floor(Math.random() * 1971)].strainName],
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: Math.floor(Math.random() * 51),
                        y: Math.floor(Math.random() * 51),
                        r: 10
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [masterArray[Math.floor(Math.random() * 1971)].strainName],
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: Math.floor(Math.random() * 51),
                        y: Math.floor(Math.random() * 51),
                        r: 15
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [masterArray[Math.floor(Math.random() * 1971)].strainName],
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: Math.floor(Math.random() * 51),
                        y: Math.floor(Math.random() * 51),
                        r: 10
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [masterArray[Math.floor(Math.random() * 1971)].strainName],
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: Math.floor(Math.random() * 51),
                        y: Math.floor(Math.random() * 51),
                        r: 15
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [masterArray[Math.floor(Math.random() * 1971)].strainName],
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: Math.floor(Math.random() * 51),
                        y: Math.floor(Math.random() * 51),
                        r: 10
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [masterArray[Math.floor(Math.random() * 1971)].strainName],
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: Math.floor(Math.random() * 51),
                        y: Math.floor(Math.random() * 51),
                        r: 15
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [masterArray[Math.floor(Math.random() * 1971)].strainName],
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: Math.floor(Math.random() * 51),
                        y: Math.floor(Math.random() * 51),
                        r: 10
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [masterArray[Math.floor(Math.random() * 1971)].strainName],
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: Math.floor(Math.random() * 51),
                        y: Math.floor(Math.random() * 51),
                        r: 15
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [masterArray[Math.floor(Math.random() * 1971)].strainName],
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: Math.floor(Math.random() * 51),
                        y: Math.floor(Math.random() * 51),
                        r: 10
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [masterArray[Math.floor(Math.random() * 1971)].strainName],
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: Math.floor(Math.random() * 51),
                        y: Math.floor(Math.random() * 51),
                        r: 15
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [masterArray[Math.floor(Math.random() * 1971)].strainName],
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: Math.floor(Math.random() * 51),
                        y: Math.floor(Math.random() * 51),
                        r: 10
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