require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const app = express();

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173", // Local Frontend
  "https://frontend-zeta-gray-43.vercel.app", // Deployed Frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies/session handling
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

// User Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", userSchema);

// Sign Up Route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Error in /signup:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

// Sign In Route
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid email or password" });

    res.status(200).json({ message: "Login successful", user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error("❌ Error in /signin:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

// Start Server (ONLY for Local Development)
if (process.env.NODE_ENV !== "production") {
  app.listen(process.env.PORT, () => console.log(`✅ Server running on port ${process.env.PORT}`));
}

// Required for Vercel Deployment
module.exports = app;
