const mongoose = require('mongoose')
module.exports = mongoose.connect('mongodb://localhost:27017/ImABanano', {
    useFindAndModify: false,
    useNewUrlParser: true,
    keepAlive: true,
    useUnifiedTopology: true
})