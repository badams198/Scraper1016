var mongoose = require("mongoose");

// svae reference to Schema constructor
var Schema = mongoose.Schema;

// create new userSchema object
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    lead: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    
});

// create model from schema above using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// export Article model
module.exports = Article;