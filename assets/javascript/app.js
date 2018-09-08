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
        var randomStrain1 = masterArray[Math.floor(Math.random() * 1971)]
        var randomStrain2 = masterArray[Math.floor(Math.random() * 1971)]
        var randomStrain3 = masterArray[Math.floor(Math.random() * 1971)]
        var randomStrain4 = masterArray[Math.floor(Math.random() * 1971)]
        var randomStrain5 = masterArray[Math.floor(Math.random() * 1971)]
        var randomStrain6 = masterArray[Math.floor(Math.random() * 1971)]
        var randomStrain7 = masterArray[Math.floor(Math.random() * 1971)]
        var randomStrain8 = masterArray[Math.floor(Math.random() * 1971)]
        var randomStrain9 = masterArray[Math.floor(Math.random() * 1971)]
        var randomStrain10 = masterArray[Math.floor(Math.random() * 1971)]
        var randomStrain11 = masterArray[Math.floor(Math.random() * 1971)]
        var randomStrain12 = masterArray[Math.floor(Math.random() * 1971)]
        var randomStrain13 = masterArray[Math.floor(Math.random() * 1971)]

        //Chart.js example
        var strainChart = new Chart(document.getElementById("myChart"), {
            type: 'bubble',
            data: {
                labels: "Africa",
                datasets: [{
                    //Single strain search AJAX call
                    label: [response[0].name],
                    pointStyle: response[0].id,
                    backgroundColor: "rgba(60,186,159,1)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: 25,
                        y: 25,
                        r: 25
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [randomStrain1.strainName],
                    pointStyle: randomStrain1.strainId,
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: 50,
                        y: 0,
                        r: 10
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [randomStrain2.strainName],
                    pointStyle: randomStrain2.strainId,
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: 0,
                        y: 50,
                        r: 15
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [randomStrain3.strainName],
                    pointStyle: randomStrain3.strainId,
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: Math.floor(Math.random() * 51),
                        y: Math.floor(Math.random() * 51),
                        r: 10
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [randomStrain4.strainName],
                    pointStyle: randomStrain4.strainId,
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: Math.floor(Math.random() * 51),
                        y: Math.floor(Math.random() * 51),
                        r: 15
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [randomStrain5.strainName],
                    pointStyle: randomStrain5.strainId,
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: Math.floor(Math.random() * 51),
                        y: Math.floor(Math.random() * 51),
                        r: 10
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [randomStrain6.strainName],
                    pointStyle: randomStrain6.strainId,
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: Math.floor(Math.random() * 51),
                        y: Math.floor(Math.random() * 51),
                        r: 15
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [randomStrain7.strainName],
                    pointStyle: randomStrain7.strainId,
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: Math.floor(Math.random() * 51),
                        y: Math.floor(Math.random() * 51),
                        r: 10
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [randomStrain8.strainName],
                    pointStyle: randomStrain8.strainId,
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: Math.floor(Math.random() * 51),
                        y: Math.floor(Math.random() * 51),
                        r: 15
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [randomStrain9.strainName],
                    pointStyle: randomStrain9.strainId,
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: Math.floor(Math.random() * 51),
                        y: Math.floor(Math.random() * 51),
                        r: 10
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [randomStrain10.strainName],
                    pointStyle: randomStrain10.strainId,
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: Math.floor(Math.random() * 51),
                        y: Math.floor(Math.random() * 51),
                        r: 15
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [randomStrain11.strainName],
                    pointStyle: randomStrain11.strainId,
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: Math.floor(Math.random() * 51),
                        y: Math.floor(Math.random() * 51),
                        r: 10
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [randomStrain12.strainName],
                    pointStyle: randomStrain12.strainId,
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: Math.floor(Math.random() * 51),
                        y: Math.floor(Math.random() * 51),
                        r: 15
                    }]
                }, {
                    //Pull random strain name from masterArray
                    label: [randomStrain13.strainName],
                    pointStyle: randomStrain13.strainId,
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
        myChart.onclick = function (evt) {
            var activePoints = strainChart.getElementsAtEvent(evt);
            console.log(activePoints);
            if (activePoints[0]) {
                var chartData = activePoints[0]['_chart'].config.data;
                var idx = activePoints[0]['_datasetIndex'];
                console.log(idx);
                var label = chartData.labels[idx];
                console.log(label);

                var name = "Strain Name: " + strainChart.data.datasets[6].label + "Strain Id: " + strainChart.data.datasets[6].pointStyle;
                
                console.log(name);
                alert(name);
            }
        };
        console.log(strainChart.data.datasets[6].pointStyle);
        console.log(strainChart.data.datasets[6].label);

    });
});