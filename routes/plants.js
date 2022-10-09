const express = require("express");
const router = express.Router();
const plantsController = require("../controllers/plants");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/", ensureAuth, plantsController.getPlantIndex);

router.get("/id/:id", ensureAuth, plantsController.getPlantById);

router.get("/api/:name", plantsController.getAPI);

router.get("/api/", plantsController.getRandAPI);

module.exports = router;
