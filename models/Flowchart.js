const mongoose = require("mongoose");

const flowchartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // This connects it to your User model
    required: true,
  },
  nodes: [
    {
      id: String,
      data: {
        label: String, // This is where the node's name is stored
      },
      position: {
        x: Number,
        y: Number,
      },
    },
  ],
  edges: [
    {
      source: String,
      target: String,
    },
  ],
});

module.exports = mongoose.model("Flowschart", flowchartSchema);
