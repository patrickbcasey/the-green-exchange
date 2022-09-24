const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const plantsController = require("../controllers/plants");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/", ensureAuth, plantsController.getPlantIndex);

router.get("/id/:id", ensureAuth, plantsController.getPlantById);

router.get("/api", plantsController.getAPI);

module.exports = router;
