var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var sectionSchema = new Schema({

    title: {
        type: String,
        required: true,
        trim : true
    }

});

module.exports = mongoose.model('Section', sectionSchema);