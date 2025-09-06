import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = 3100;

// Use CORS only once
app.use(cors({
  origin: "https://maxnetisp.netlify.app" // your frontend URL
}));

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MONGO ERROR: ", err));

// Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  houseNo: String,
  floor: String,
  block: String,
  type: String,
  deal: String,
  plan: String,
  static: Boolean,
  agree: Boolean
});

// Create model
const User = mongoose.model("user", userSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ success: true, message: "form submitted", user: newUser });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
