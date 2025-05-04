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

// Update Node Name (or other element properties)
// const Update = async (req, res) => {
//   const { id } = req.params; // Flowchart ID
//   const { nodeId, newLabel } = req.body; // nodeId to identify the node and newLabel for the new name

//   try {
//     const flowchart = await Flowchart.findOne({ userId: req.user.id });

//     if (!flowchart) {
//       return res.status(404).send("Flowchart not found");
//     }

//     // Find the specific node to update
//     const node = flowchart.nodes.find((node) => node.id === nodeId);

//     if (node) {
//       // Update the node's label (name)
//       node.data.label = newLabel;
//     } else {
//       return res.status(404).send("Node not found");
//     }

//     await flowchart.save();
//     res.status(200).send("Node name updated!");
//   } catch (error) {
//     console.error("Error updating node name:", error);
//     res.status(500).send("Error updating node name");
//   }
// };

module.exports = { Save, Load };
