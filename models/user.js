var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    local: {
        username: String,
        nickName: String,
        passsword: String
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    nickName: {
        type: String,
        unique: true,
        default: 'User'
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// methods =========================
// Generating Hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.getSalt(8), null);
};

// Checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.passsword);
};

module.exports = mongoose.model('User', userSchema);