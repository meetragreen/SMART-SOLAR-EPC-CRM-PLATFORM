const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  // Core Fields
  clientRef: { type: String, required: true },
  clientName: { type: String, required: true },
  siteLocation: { type: String, required: true },
  systemSize: { type: String, required: true },

  // Details
  category: { type: String, default: "Industrial" },
  details: { type: String },
  imgThumb: { type: String },
  imgLarge: { type: String },
  date: { type: Date },

  // ✅ FIX: These must be 'String' to accept "completed/pending"
  progressFlow: {
    leadSurvey: { type: String, default: 'pending' },
    systemDesign: { type: String, default: 'pending' },
    approval: { type: String, default: 'pending' },
    procurement: { type: String, default: 'pending' },
    installation: { type: String, default: 'pending' },
    netMeter: { type: String, default: 'pending' },
    handover: { type: String, default: 'pending' },
  },
  
  createdBy: { type: String } 

}, { timestamps: true });

// Prevent model overwrite error
module.exports = mongoose.models.Project || mongoose.model("Project", projectSchema);