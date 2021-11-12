const Event = require("../models/Event");
const router = require("express").Router();

//create event
router.get("/",(req, res) => {
 res.send("eventpage")
})


module.exports = router;