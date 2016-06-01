var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);

var userSchema = new Schema({
   local: {
     name: String,
     email: String,
     password: String
   },
    created: {
        type: Date,
        default: Date.now
    }
});

//methods =========================
//Generating Hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, salt, null);
};

// Checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);