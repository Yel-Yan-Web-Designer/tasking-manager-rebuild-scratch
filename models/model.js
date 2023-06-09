const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name : {
        type : String,
        required : true,
        maxLength : [20, "name can't be more than 20 characters"],
        trim : true,
        minLength : [5, "name can't be less than 5 characters"],
    },
    completed : {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model("User", UserSchema);