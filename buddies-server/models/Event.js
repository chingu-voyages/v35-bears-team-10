const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    date: {
      type: Date,
      // required: true
    },
    picture: {
      type: String,
      default: "",
    },
    location: {
      type: Array,
      default: [],
    },
    activity: {
      type: String,
      enum: [
        "drink",
        "talk",
        "walk",
        "sports",
        "coffee",
        "party",
        "boardgames",
        "videogames",
      ],
      // required: true,
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
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
