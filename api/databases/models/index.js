'use strict';
const { Schema, model } = require('mongoose');
// faltaría importar los modelos pero al parecer ya están importados automáticamente. Reveer.
const User = model('User', UserSchema);
const Account = model('Account', AccountSchema);
module.exports = {
    User,
    Account
};
