const Event = require("../models/Event");
const User = require("../models/User");
const router = require("express").Router();

//create event
router.post("/", async (req, res) => {
  const newEvent = new Event(req.body);
  try {
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update event
router.put("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event.userId === req.body.userId) {
      await event.updateOne({ $set: req.body });
      res.status(200).json("you updated your event");
    } else {
      res.status(403).json("You can only update your own posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// join event
router.put("/join/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const userId = req.body.user._id;
    if (!event.guests.includes(userId)) {
      event.guests.push(userId);
      await event.updateOne({ $set: event });
      res.status(200).json(event);
    } else {
      res.status(403).json("You are already attending this event");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// leave event

router.put("/leave/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const userId = req.body.user._id;
    if (event.guests.includes(userId)) {
      event.guests.splice(event.guests.indexOf(userId), 1);
      await event.updateOne({ $set: event });
      res.status(200).json(event);
    } else {
      res.status(403).json("You have not joined this event!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delet event
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event.userId === req.body.userId) {
      await event.deleteOne();
      res.status(200).json("event has been deleted");
    } else {
      res.status(403).json("you can only delete your own event");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// get Event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const { password, updatedAt, ...other } = event._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
