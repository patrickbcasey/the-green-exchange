const express = require("express");
const router = express.Router();
const searchController = require("../controllers/search");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:query", ensureAuth, searchController.getSearch);
router.get("/", ensureAuth, searchController.getNoSearch);

module.exports = router;
