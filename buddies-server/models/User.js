const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

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
    followers: {
        type: Array,
        default: [],
      },
      followings: {
        type: Array,
        default: [],
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
    mood:{
        type:String,
        enum:['drink','talk','walk','sports','coffee','party','boardgames', 'videogames']
    },
   
},
{timestamps:true}
);

module.exports = mongoose.model("User", UserSchema)