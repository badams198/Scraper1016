$.getJSON("/articles", function(data){
    for(var i = 0; i<data.length; i++){
        // display appropriate information on page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br />" +  data[i].lead + "<br />" + data[i].byline + "</p>");
    }
});

