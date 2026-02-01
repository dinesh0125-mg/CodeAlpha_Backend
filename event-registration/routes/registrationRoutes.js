const express = require("express");
const Registration = require("../models/Registration");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/", verifyToken, async (req, res) => {
  const registration = new Registration({
    ...req.body,
    userId: req.user.id
  });

  await registration.save();
  res.json(registration);
});


router.get("/", verifyToken, async (req, res) => {
  const data = await Registration.find().populate("eventId");
  res.json(data);
});

module.exports = router;
