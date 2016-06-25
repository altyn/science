var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var fileSchema = new Schema({
    link: {
        type: String
    },
    uploaded: {
        type: Date,
        default: Date.now
    }
});

fileSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Link', fileSchema);