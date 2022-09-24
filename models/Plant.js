const mongoose = require("mongoose");

const PlantSchema = new mongoose.Schema({
    plantName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    botanicalName: {
        type: String,
        required: true,
    },
    variety: {
        type: String,
    },
    exposure: {
        type: String,
        enum: ["Full Sun", "Bright Light", "Medium Light", "Low Light"]
    },
});


module.exports = mongoose.model("Plant", PlantSchema);
