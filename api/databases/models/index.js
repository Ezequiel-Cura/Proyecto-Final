
'use strict';

const { Schema, model } = require('mongoose');

const User = model('User', UserSchema);
const Count = model('Count', CountSchema);
