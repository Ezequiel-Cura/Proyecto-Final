'use strict'
const {Schema, model} = require('mongoose')

const User = new Schema({
    userName: String,
    lastName: String,
    email: {type: String, unique: true, lowercase: true},
    password: {type: String, select: false}, //con select evitamos que envie esa info del usuario
    avatar: String,
    signUpDate: {type: Date, default: Date.now()}, //registrar el momento en el que se crea el usuario
    lastLogin: Date, //para tener un control del acceso de los usuarios a la aplicacion cada vez que se loguee
    // counts: {
    // }
    // count: {
    //     id: String,
    //     name: String,
    //     amount: Number
    //  }
})


module.exports = model('User', User);