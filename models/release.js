var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var releaseSchema = new Schema({

    title: {
        type: String,
        required: true,
        trim : true
    },
    year: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Release', releaseSchema);