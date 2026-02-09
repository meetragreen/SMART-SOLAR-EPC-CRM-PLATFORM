const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Project = require("../models/Project"); 

/* ================= 1. GET ALL PROJECTS ================= */
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

/* ================= 2. CREATE PROJECT ================= */
router.post("/", async (req, res) => {
  try {
    const { clientRef, clientName, siteLocation, systemSize, category, details, imgThumb, imgLarge, date, createdBy } = req.body;
    
    const newProject = new Project({
      clientRef, clientName, siteLocation, systemSize, category, details, imgThumb, imgLarge, date, createdBy
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error("Create Project Error:", err);
    res.status(500).json({ error: "Failed to create project" });
  }
});

/* ================= 3. UPDATE PROGRESS ================= */
router.patch("/staff/update-progress/:id", async (req, res) => {
  try {
    const { stage, value } = req.body;
    
    console.log(`Updating Project: ${req.params.id} | Stage: ${stage} | Value: ${value}`);

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { [`progressFlow.${stage}`]: value }, 
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(updatedProject);
  } catch (err) {
    console.error("Update Progress Error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ================= 4. GET PROJECT FOR CLIENT ================= */
router.get("/client/:id", async (req, res) => {
  try {
    const project = await Project.findOne({ clientRef: req.params.id });
    if (!project) return res.status(404).json({ message: "No project found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch client project" });
  }
});

/* ================= 5. DELETE PROJECT (Added Back) ================= */
router.delete("/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    
    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

module.exports = router;