const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const auth = require("../middleware/authMiddleware");

router.post("/start", auth, dataController.Start);
router.post("/stop", auth, dataController.Stop);
router.get("/history", auth, dataController.History);

module.exports = router;
