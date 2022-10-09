const Plant = require("../models/Plant");


module.exports = {
    getPlantIndex: async (req, res) => {
        try {
          const plants = await Plant.find().sort({ plantName: "1" })
            res.render("plantIndex.ejs", { plants: plants });
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
            const plant = await Plant.find({ plantName: req.params.name }, { _id: 0, plantName: 1, botanicalName: 1, image: 1, variety: 1, exposure: 1 }).lean();
            res.json({ plant });
          } catch (err) {
            console.log(err);
            res.redirect("/plants")
          }
    },

    getRandAPI: async (req, res) => {
      try {
        const plant = await Plant.aggregate( [ { $sample: { size: 1 } }, { $project: { _id: 0, __v: 0 } } ] );
          res.json({ plant });
        } catch (err) {
          console.log(err);
          res.redirect("/plants")
        }
  },
  
       
};