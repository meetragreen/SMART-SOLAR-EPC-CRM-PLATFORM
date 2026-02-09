const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const path = require("path");
const dotenv = require("dotenv");

/* ================= LOAD ENV ================= */
dotenv.config();

/* ================= APP INIT ================= */
const app = express();
const PORT = process.env.PORT || 5000;

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

/* ================= DATABASE CONNECTION ================= */
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://meetragreen:meetra123@cluster0.ray2juw.mongodb.net/meetraDB?appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* ================= MODELS (DEFINED IN SERVER) ================= */
// NOTE: These models are defined here and used in Auth logic below.
// EmployeeRoutes.js will access 'Employee' via mongoose.models.Employee

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    systemId: { type: String },
    password: { type: String, required: true, select: false },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

// Check if model exists before defining (prevents overwrite errors on reload)
const User = mongoose.models.User || mongoose.model("User", userSchema);

const employeeSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, required: true },
    joinedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

/* ================= AUTHENTICATION ROUTES (IN SERVER) ================= */
// Helper: System ID Generator
const generateSystemId = () => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `MEETRA-${randomNum}`;
};

// 1. Signup
app.post("/api/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      systemId: generateSystemId(),
    });
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      systemId: newUser.systemId,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error during signup" });
  }
});

// 2. Add Employee
app.post("/api/employees", async (req, res) => {
  try {
    const { employeeId, name, email, password, role } = req.body;
    if (!employeeId || !name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existing = await Employee.findOne({ $or: [{ email }, { employeeId }] });
    if (existing) {
      return res.status(400).json({ error: "Email or Employee ID already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployee = new Employee({
      employeeId,
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newEmployee.save();
    res.status(201).json({
      message: "Employee added successfully",
      employee: {
        employeeId: newEmployee.employeeId,
        name: newEmployee.name,
        email: newEmployee.email,
        role: newEmployee.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to save employee" });
  }
});

// 3. Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Credentials required" });
    }

    let authenticatedUser = null;

    // Check Employee
    const employee = await Employee.findOne({
      $or: [{ email }, { employeeId: email }],
    }).select("+password");

    if (employee) {
      const isMatch = await bcrypt.compare(password, employee.password);
      if (isMatch) {
        authenticatedUser = {
          fullName: employee.name,
          email: employee.email,
          role: "employee",
          designation: employee.role,
          employeeId: employee.employeeId,
        };
      }
    }

    // Check User if not Employee
    if (!authenticatedUser) {
      const user = await User.findOne({ email }).select("+password");
      if (user && (await bcrypt.compare(password, user.password))) {
        authenticatedUser = {
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          systemId: user.systemId,
        };
      }
    }

    if (!authenticatedUser) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user: authenticatedUser });
  } catch (err) {
    res.status(500).json({ error: "Server error during login" });
  }
});

/* ================= IMPORT & USE ROUTES ================= */
// We require these AFTER defining the models to ensure no loading issues

const applicationRoutes = require("./routes/applicationRoutes");
const projectRoutes = require("./routes/projectRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const staffRoutes = require("./routes/staffRoutes"); 

// Mount Routes
app.use("/api/applications", applicationRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/employees", employeeRoutes); // Requires 'Employee' model defined above
app.use("/api", surveyRoutes);
app.use("/api/staff", staffRoutes);

/* ================= STATIC FILES & ROOT ================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("SERVER RUNNING 🚀");
});

/* ================= START SERVER ================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});