const Flowchart = require("../models/Flowchart");

// Save Flowchart
const Save = async (req, res) => {
  const { nodes, edges } = req.body.elements; // Ensure nodes contain labels (names)

  try {
    let flowchart = await Flowchart.findOne({ userId: req.user.id }); // Find by userId

    if (flowchart) {
      // If flowchart already exists for the user, update it
      flowchart.nodes = nodes;
      flowchart.edges = edges;
    } else {
      // Otherwise, create a new flowchart for the user
      flowchart = new Flowchart({ userId: req.user.id, nodes, edges });
    }

    await flowchart.save();
    res.status(200).send("Flowchart saved!");
  } catch (error) {
    console.error("Error saving flowchart:", error);
    res.status(500).send("Error saving flowchart");
  }
};

// Load Flowchart for a user
const Load = async (req, res) => {
  const userId = req.user.id;
  try {
    const flow = await Flowchart.findOne({ userId });

    if (!flow) {
      return res.status(404).send(`No flowchart found + ${req.user.id} `);
    }

    res.json(flow);
  } catch (error) {
    console.error("Error loading flowchart:", error);
    res.status(500).send("Error loading flowchart");
  }
};

module.exports = { Save, Load };
