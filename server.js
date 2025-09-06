import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"

dotenv.config();

const app = express()
const port = 3100

app.use(cors())
app.use(bodyParser.json())

// connecting my mongoDB


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MONGO ERROR: ", err));

// schema
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
})

//create model
const User = mongoose.model("user", userSchema)


app.get('/', (req, res) => {
  res.send('Server is running')

})

app.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body)
    await newUser.save()
    res.json({ success: true, message: "form submitted", user: newUser })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})