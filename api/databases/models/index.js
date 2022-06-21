'use strict';
const { Schema, model } = require('mongoose');
const User = model('User', UserSchema);
const Account = model('Account', AccountSchema);
module.exports = {
    User,
    Account
};
