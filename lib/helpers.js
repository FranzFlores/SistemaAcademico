const bcrypt = require('bcrypt-nodejs');
const helpers = {};

helpers.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

helpers.matchPassword = function(userPassword,password){
    return bcrypt.compareSync(userPassword,password);
};

helpers.formatDate = function(date){
    var dateFormat = date.split('\/');
    var year = dateFormat[0];
    var month = dateFormat[1];
    var day = dateFormat[2];
    return new Date(year, month, day);
}

module.exports = helpers;