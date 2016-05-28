var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var booksSchema = new Schema({

    book_title: {
        type: String,
        required: true,
        trim : true
    },
    author: {
        type: String,
        required: true
    },
    downloadLink : {
        type: String
    },
    bookType: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    year: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        default: Date.now
    },
    language: {
        type: String,
        required: true,
        trim : true
    }

});

module.exports = mongoose.model('Book', booksSchema);