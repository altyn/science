var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var fileSchema = new Schema({

    link: {
        type: String
    },
    uploaded: {
        type: String,
        default: Date.now
    }

});

module.exports = mongoose.model('Link', fileSchema);