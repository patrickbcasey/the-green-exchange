const Comment = require("../models/Comments")


module.exports = {
    createComment: async (req, res) => {
        try {
            await Comment.create({
                comment: req.body.comment,
                post: req.params.id,
                user: req.user.id,
            });
            console.log("Comment has been added!");
            res.redirect(`/post/${req.params.id}`);
        } catch (err) {
            console.log(err);
        }
    },
    deleteComment: async (req, res) => {
        try {
            // Find comment by id
            let comment = await Comment.findById({ _id: req.params.id });
            console.log({ comment })
            // if req.user == comment.user
            await Comment.deleteOne({ _id: req.params.id });
            console.log("Deleted Comment");
            res.redirect("/post/" + comment.post);
        } catch (err) {
            res.redirect("/profile");
        }
    }

}