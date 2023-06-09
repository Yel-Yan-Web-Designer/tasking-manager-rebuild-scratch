const mongoose = require('mongoose');

const connectDb = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,// to optimize in to the new MOngoDB driver's url string parser which is more spec-compliant than the current (now deprecated) parser
        useUnifiedTopology: true, // for server discovery & monnitoring 
    })
}

module.exports = connectDb;