const express = require("express");
const fs = require("fs").promises;  // Use the asynchronous fs API
const cors = require("cors");
const bcrypt = require("bcrypt");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const USERS_FILE = path.join(__dirname, "users.json");

// CORS Configuration (Allow Local + Deployed Frontend)
const allowedOrigins = [
  "http://localhost:5173",  
  "https://frontend-8ymbgq1u0-jija-saraks-projects.vercel.app/",  
];

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Ensure users.json Exists
const ensureUsersFileExists = async () => {
  try {
    await fs.access(USERS_FILE);
  } catch (error) {
    await fs.writeFile(USERS_FILE, "[]");
  }
};

// Load users from file
const loadUsers = async () => {
  await ensureUsersFileExists();
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading users:", error);
    return [];
  }
};

// Save users to file
const saveUsers = async (users) => {
  try {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error saving users:", error);
  }
};

// Sign Up Route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let users = await loadUsers();
  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword };
    users.push(newUser);
    await saveUsers(users);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Sign In Route
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  let users = await loadUsers();
  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  res.status(200).json({
    message: "Login successful",
    user: { name: user.name, email: user.email },
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
