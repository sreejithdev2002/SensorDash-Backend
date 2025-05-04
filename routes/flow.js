const express = require("express");
const router = express.Router();
const flowController = require("../controllers/flowchartController");
const auth = require("../middleware/authMiddleware");

router.post("/save", auth, flowController.Save);
router.get("/load", auth, flowController.Load);

module.exports = router;
