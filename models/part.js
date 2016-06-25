var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var partSchema = new Schema({

    title: {
        type: Number,
        required: true,
        trim : true
    }

});

module.exports = mongoose.model('Part', partSchema);