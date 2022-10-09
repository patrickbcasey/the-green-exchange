const User = require("../models/User");


module.exports = {
    getSearch: async (req, res) => {
        try {
        const user = await User.find({ userName: { $regex: `${req.params.query}` } }, { password: 0, __v: 0, email: 0 });
            res.render("search.ejs", { user });
          } catch (err) {
            console.log(err);
            res.redirect("/feed")
          }
    },
    getNoSearch: (req, res) => {
        try {
        const user = false;
            res.render("search.ejs", { user });
          } catch (err) {
            console.log(err);
            res.redirect("/feed")
          }
    },
    
};