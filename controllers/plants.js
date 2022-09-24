const Plant = require("../models/Plant");


module.exports = {
    getPlantIndex:  (req, res) => {
        try {
            res.render("plantIndex.ejs");
          } catch (err) {
            console.log(err);
          }
    },

    getPlantById: async (req, res) => {
        try {
            const plant = await Plant.findById({ _id: req.params.id });
            res.render("plantPage.ejs", { plant: plant });
          } catch (err) {
            console.log(err);
            res.redirect("/plants")
          }
    },

    getAPI: async (req, res) => {
        try {
            const plants = await Plant.find();
            res.json(plants);
          } catch (err) {
            console.log(err);
            res.redirect("/plants")
          }
    },
  
       
};