const express = require("express");
const Event = require("../models/Event");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/", verifyToken, isAdmin, async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json(event);
});


router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});


router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
});

module.exports = router;
