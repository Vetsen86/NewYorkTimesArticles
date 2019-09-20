$(document).ready(function() {
    $("#submit").on("click", function(e) {
        e.preventDefault();

        var searchTerm = $("#searchTerm").val();
        var numberRecords = $("#numberRecords").val();
        var startYear = $("#startYear").val();
        var endYear = $("#endYear").val();

        var apiKey = "yjaCvmtJyGsfipNSuWdxMPLebdDnfjMR";

        var beginDate;
        var endDate;

        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&api-key="
            + apiKey + "&page=0";

        if(startYear) {
            beginDate = "&begin_date=" + startYear + "0101";
            queryURL += beginDate;
        }

        if (endYear) {
            endDate = "&end_date=" + endYear +"0101";
            queryURL += endDate;
        }

        $.ajax({ 
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var results = response.response.docs;
            console.log(results);
            for (i = 0; i < numberRecords; i++) {
                var newDiv = $("<div>");
                newDiv.attr("class", "card");

                var headline = $("<h1>");
                headline.text(results[i].headline.main);
                newDiv.append(headline);

                var summary = $("<p>");
                summary.text(results[i].abstract);
                newDiv.append(summary);

                var pubTime = $("<p>");
                pubTime.text(results[i].pub_date);
                newDiv.append(pubTime);

                var link = $("<a>");
                link.text("Full Article");
                link.attr("href", results[i].web_url);
                newDiv.append(link);

                $("#results").append(newDiv);
            }
        });



    });

    $("#clear").on("click", function() {
        $("#searchTerm").val("");
        $("#numberRecords").val("");
        $("#startYear").val("");
        $("#endYear").val("");
        $("#results").empty();
    });
});