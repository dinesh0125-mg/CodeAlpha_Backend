const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  userName: String,
  email: String,
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  }
});

module.exports = mongoose.model("Registration", registrationSchema);
