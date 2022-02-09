const router = require("express").Router();
const User = require("../models/User");
const Comment = require("../models/Comment");
const Reply = require("../models/Reply");
const Verify = require("../util/verify");

//get a reply
router.get("/:id", Verify, async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);
    if(reply){
      const result = await User.findById(reply.userId);
      const { password, updatedAt, ...user } = result._doc;
        const com = {
          ...reply._doc, 
          username: user.username,
          profile: user.profile,
        }
      res.status(200).json(com);
    }else{
      res.status(404).send('reply record not found!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all comments
router.get("/", Verify, async(req, res) => {
  try{
    const replies = await Reply.find();
    if(replies){
      res.status(200).json(replies);
    }else{
      res.status(404).json('No comments record found!');
    }
  }catch(err){
    res.status(500).json(err);
  }
})

//get replies by comment id
router.get("/:id/comment", async (req, res) => {
  try {
    const replies = await Reply.find({ commentId: req.params.id });
    const users = await User.find();
    let results = [];
    if(replies && users){
      replies.forEach((r)=>{
        const result = users.filter(u=>u._id.toString() === r.userId)[0];
        const { password, updatedAt, ...user } = result._doc;
        const reply = {
          ...r._doc, 
          username: user.username,
          profile: user.profile,
        }
        results.push(reply);
      });
      res.status(200).json(results);
    }else{
      res.status(404).json('No replies records to comments found!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//create a reply to comment

router.post("/", Verify, async (req, res) => {
  const newReply = new Reply(req.body);
  try {
    const savedReply = await newReply.save();
    const currComment = await Comment.findById(req.body.commentId);
    await currComment.updateOne({ $push: { replies: savedReply._id.toString() } });
    const result = await User.findById(savedReply.userId);
    const { password, updatedAt, ...user } = result._doc;
    const reply = {
      ...savedReply._doc, 
      username: user.username,
      profile: user.profile,
    }
    res.status(200).json(reply);
    //res.status(200).json('comment successfully added!');
  } catch (err) {
    res.status(500).json(err);
  }
});
//update reply to comment

router.put("/:id",Verify, async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);
    if (reply.userId === req.user.id) {
      try{
        const updatedReply = await Reply.findByIdAndUpdate(
          req.params.id, { 
            $set: req.body 
          }, {new: true}
        );
      res.status(200).json("the reply to comment has been updated");
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

//delete a reply to comment
router.delete("/:id",Verify, async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);
    if (reply.userId === req.user.id) {
      try{
        const comment = await Comment.findById(reply.commentId);
        if(comment.replies.includes(reply._id.toString())){
          await comment.updateOne({$pull: {replies: reply._id.toString()}});
        }
        await reply.deleteOne();
        res.status(200).json("the reply to comment has been deleted");
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
//like / dislike a reply to comment

router.put("/:id/like",Verify, async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);
    if (!reply.likes.includes(req.user.id)) {
      await reply.updateOne({ $push: { likes: req.user.id } });
      res.status(200).json("The comment has been liked");
    } else {
      await reply.updateOne({ $pull: { likes: req.user.id } });
      res.status(200).json("The comment has been disliked");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
