const { boolean } = require('mathjs')
const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const reqBoolean = {
    type: boolean,
    required: true
}

const userSchema = {
    _id: reqString,
    username: reqString,
    nodeRegister: reqBoolean,
    account: reqString,
}

module.exports = mongoose.model('Users', userSchema)