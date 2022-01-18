const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Verify = require("../util/verify");

//get a comment
router.get("/:id", Verify, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if(comment){
      const result = await User.findById(comment.userId);
      const { password, updatedAt, ...user } = result._doc;
        const com = {
          ...comment._doc, 
          username: user.username,
          profile: user.profile,
        }
      res.status(200).json(com);
    }else{
      res.status(404).send('comment record not found!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all comments
router.get("/", Verify, async(req, res) => {
  try{
    const comments = await Comment.find();
    if(comments){
      res.status(200).json(comments);
    }else{
      res.status(404).json('No comments record found!');
    }
  }catch(err){
    res.status(500).json(err);
  }
})

//get comments by post id
router.get("/:id/post", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });
    const users = await User.find();
    let results = [];
    if(comments && users){
      comments.forEach((c)=>{
        const result = users.filter(u=>u._id.toString() ===c.userId)[0];
        const { password, updatedAt, ...user } = result._doc;
        const com = {
          ...c._doc, 
          username: user.username,
          profile: user.profile,
        }
        results.push(com);
      });
      res.status(200).json(results);
    }else{
      res.status(404).json('No comments record found!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//create a post comment

router.post("/", Verify, async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    const currentPost = await Post.findById(req.body.postId);
    await currentPost.updateOne({ $push: { comments: savedComment._id.toString() } });
    const result = await User.findById(savedComment.userId);
    const { password, updatedAt, ...user } = result._doc;
    const com = {
      ...savedComment._doc, 
      username: user.username,
      profile: user.profile,
    }
    res.status(200).json(com);
    //res.status(200).json('comment successfully added!');
  } catch (err) {
    res.status(500).json(err);
  }
});
//update a post comment

router.put("/:id",Verify, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.userId === req.user.id) {
      try{
        const updatedPost = await Comment.findByIdAndUpdate(
          req.params.id, { 
            $set: req.body 
          }, {new: true}
        );
      res.status(200).json("the post comment has been updated");
      }catch(err){
        console.log(err);
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you can update only your comment");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//delete a post comment
router.delete("/:id",Verify, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.userId === req.user.id) {
      try{
        const post = await Post.findById(comment.postId);
        if(post.comments.includes(comment._id.toString())){
          await post.updateOne({$pull: {comments: comment._id.toString()}});
        }
        await comment.deleteOne();
        res.status(200).json("the comment has been deleted");
      }catch(err){
        console.log(err);
        res.status(500).json(err);
      }      
    } else {
      res.status(401).json("you can delete only your comment");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//like / dislike a comment

router.put("/:id/like",Verify, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment.likes.includes(req.user.id)) {
      await comment.updateOne({ $push: { likes: req.user.id } });
      res.status(200).json("The comment has been liked");
    } else {
      await comment.updateOne({ $pull: { likes: req.user.id } });
      res.status(200).json("The comment has been disliked");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
