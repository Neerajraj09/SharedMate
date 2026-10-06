const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['1.1.1.1' , '8.8.8.8']);
const { Schema } = mongoose;

const userSchema = new Schema({
    fullname: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        index: true,
    },
    password: {
        type: String,
    },
    upiId : {type : String},
});

const users = mongoose.model("Users", userSchema);
module.exports = users;
