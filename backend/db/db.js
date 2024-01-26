const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:58vmMdNDnBGO5Q5x@cluster0.il8wjfo.mongodb.net/paytm');

const userScema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 25
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 25
    }
})

const accountSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance:{
        type: Number,
        required: true
    }
})

const User = mongoose.model('User',userScema);
const Account = mongoose.model("Account", accountSchema);

module.exports={
    User,
    Account
};