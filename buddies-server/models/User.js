const mongoose = require ("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min: 3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max: 50,
        unique: true
    },
    password:{
        type: String,
        required:true,
        min:6
    },
    profilePicture:{
        type: String,
        default: ""
    },
    favorite: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    desc:{
        type:String,
        max:50
    },
    location:{
        type:String,
    },
    activity:{
        type:String,

    },
   
},
{timestamps:true}
);

module.exports = mongoose.model("User", UserSchema)