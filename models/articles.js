var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var articleSchema = new Schema({

    title: {
        type: String,
        required: true,
        trim : true
    },
    author: [{
        name: String
    }],
    section: {
        type: String,
        required: true
    },
    annotationRU: {
        type: String,
        default: "Аннотация не доступно"
    },
    annotationEN: {
        type: String,
        default: "Annotation is not available"
    },
    year: {
        type: String,
        required: true
    },
    release: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        default: Date.now
    },
    language: {
        type: String,
        required: true
    },
    downloadLink: {
        type: String
    }

});

module.exports = mongoose.model('Article', articleSchema);