var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var requireSchema = new Schema({

    title: {
        type: String,
        required: true,
        trim : true
    },
    content: {
        type: String
    },
    publishedDate: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Requirements', requireSchema);