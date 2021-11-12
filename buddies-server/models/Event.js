const mongoose = require ("mongoose");

const EventSchema = new mongoose.Schema({
  eventName:{
    type:String,
    required: true,
  },
  date:{
    type: Date,
    required: true
  },
  picture: {
    type: String,
    default: ""
  },
  location: {
    type: String
  },
  activity: {
    type: String,
    enum:['drink','talk','walk','sports','coffee','party','boardgames', 'videogames'],
    required: true,
  },
  // hostId: {
    // type: Schema.Types.ObjectId,
    // ref: 'User',
  // },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  guests: {
    type: Array,
    default: [],
  },
},
  {timestamps: true}
)

module.exports = mongoose.model("Event", EventSchema)