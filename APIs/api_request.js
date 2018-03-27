var request = require('request');

var requestNumber = 0;

var x = setInterval(function() {

    requestNumber++;

    console.log("You are on request number : " + requestNumber);

    request('https://www.reddit.com/r/buildapcsales.json', function(error, response, body){
    if(!error && response.statusCode == 200) {
        console.log("Successfully compelted request");
        var parsedData = JSON.parse(body);
        var howManyPosts = parsedData["data"]["children"].length;
        var parseComplete = "";
        var i = 0;

        for(i ; i < howManyPosts; i++) {
            var parseComplete = parsedData["data"]["children"][i]["data"]["title"];
            if(parseComplete.includes("GTX 1080")) {
                console.log("there is a GTX 1080 for sale on the first page");
                console.log("The title of the post is " + parseComplete);
            }
        }
        
    }


    });

   

}, 5000);