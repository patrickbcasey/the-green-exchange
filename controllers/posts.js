const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getFeedById: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.params.id }).sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getLikes: async (req, res) => {
    try {
      const posts = await Post.find({ wantedBy: req.user.id }).sort({ createdAt: "desc" }).lean();
      res.render("likes.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const postUser = await User.findById(post.user);
      const wantUser = await User.find( { _id: post.wantedBy });
      const likeList = []
      wantUser.forEach(x=> likeList.push(x.userName))
      res.render("post.ejs", { post: post, postUser: postUser, user: req.user, likeList: likeList });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        plantName: req.body.plantName,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        info: req.body.info,
        wantedBy: [],
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
    const isPresent = await Post.find(
      { _id: req.params.id },
      {
         wantedBy: { 
            $elemMatch: { $eq: req.user.id }
         }
      }
  )

      if(isPresent[0].wantedBy.length === 0) {
        await Post.findOneAndUpdate(
          { _id: req.params.id },
            {
              $push: { wantedBy: req.user.id },
            }
        );
      } else {
        await Post.findOneAndUpdate(
          { _id: req.params.id },
            {
              $pull: { wantedBy: req.user.id },
            }
        );
      }
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },

  likeFeedPost: async (req, res) => {
    try {
    const isPresent = await Post.find(
      { _id: req.params.id },
      {
         wantedBy: { 
            $elemMatch: { $eq: req.user.id }
         }
      }
  )

      if(isPresent[0].wantedBy.length === 0) {
        await Post.findOneAndUpdate(
          { _id: req.params.id },
            {
              $push: { wantedBy: req.user.id },
            }
        );
      } else {
        await Post.findOneAndUpdate(
          { _id: req.params.id },
            {
              $pull: { wantedBy: req.user.id },
            }
        );
      }
      console.log("Likes +1");
      res.redirect(`/feed`);a
    } catch (err) {
      console.log(err);
    }
  },
  unlikePost: async (req, res) => {
    try {
    const isPresent = await Post.find(
      { _id: req.params.id },
      {
         wantedBy: { 
            $elemMatch: { $eq: req.user.id }
         }
      }
  )
        await Post.findOneAndUpdate(
          { _id: req.params.id },
            {
              $pull: { wantedBy: req.user.id },
            }
        );

      console.log("Likes +1");
      res.redirect(`/likes`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
