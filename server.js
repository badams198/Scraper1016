var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");


var axios = require("axios");
var cheerio = require("cheerio");


var db = require("./models");
var PORT = process.env.PORT || 3030;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);


var app = express();


app.use(logger("dev"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));


mongoose.connect(MONGODB_URI, { useNewUrlParser: true});



// Routes


app.get("/scrape", (req,res) =>{
    axios.get("https://www.nytimes.com/section/health").then(function(response){
        var $ = cheerio.load(response.data);

      
    $(".story-body").each(function(i, element){

        var result = {};

        result.title = $(this).children(".headline").text().trim();
        result.link = $(".headline").children("a").attr("href");
        result.lead = $(this).children(".summary").text().trim();
        result.byline = $(this).children(".byline").text().trim();

        db.Article.create(result)
        .then(function(dbArticle){
            console.log(dbArticle);
        })
        .catch(function(err){
            console.log(err);
        });
    });
});
});


app.get("/articles", function(req,res){
    db.Article.find({})
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });
});




app.listen(PORT, function(){
    console.log("App is running on port " + PORT + "!");
});