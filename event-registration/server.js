const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");

const app = express();


app.use(cors());
app.use(express.json());


mongoose
  .connect("mongodb://127.0.0.1:27017/eventDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));


app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/registrations", registrationRoutes);


app.get("/", (req, res) => {
  res.send("Event Registration System API Running");
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
