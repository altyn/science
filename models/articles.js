var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var articleSchema = new Schema({

    title: {
        type: String,
        required: true,
        trim : true
    },
    author: [
        {
        name: { type: String, trim: true}
    }],
    section: {
        type: String,
        required: true,
        trim: true
    },
    annotationKG: {
        type: String,
        default: "Кыргыз тилиндеги аннотациясы жок"
    },
    annotationRU: {
        type: String,
        default: "Аннотация не доступно"
    },
    annotationEN: {
        type: String,
        default: "Annotation is not available"
    },
    content: {
        type: String,
        default: "Данная статья временно недоступно"
    },
    year: {
        type: String,
        required: true
    },
    release: {
        type: String,
        required: true,
        trim: true
    },
    language: {
        type: String,
        required: true,
        default: "Русский"
    },
    publishedDate: {
        type: Date,
        default: Date.now
    },
    downloadLink: {
        type: String,
        default: "No links"
    }

});

module.exports = mongoose.model('Article', articleSchema);