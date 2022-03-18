const router = require("express").Router();
const Conversation = require("../models/Conversation");
const User = require("../models/User");
const Message = require("../models/Message");
const Verify = require("../util/verify");

//new conv

router.post("/", Verify, async (req, res) => {
  const newConversation = new Conversation({
    members: req.body.members,
  });

  try {
    const savedConversation = await newConversation.save();
    const friendId = savedConversation.members.find(id=>id !== req.user.id)
    const user = await User.findById(friendId);
    const conv = { 
            ...savedConversation._doc,
            friend: {
              _id: user._id,
              username: user.username,
              profile: user.profile
            },
            message: null
          }
    res.status(200).json(conv);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", Verify, async (req, res) => {
  try {

    const userId = req.params.userId;
    const conversations = await Conversation.find({
      members: { $in: [userId] },
    });

    let users = await User.find();
    const messages = await Message.find();
    let results = [];
    if(conversations && users){
      conversations.forEach((c)=>{
        const friendId = c.members.find(id=>id !== userId)
        const result = users.find(u=>u._id.toString() === friendId);
        const { password, updatedAt, ...user } = result._doc;
        const currMessages = messages.filter(m=>m.conversationId === c._id.toString());
        const conv = {
          ...c._doc,
          friend: {
            _id: user._id,
            username: user.username,
            profile: user.profile
          },
          message: currMessages[currMessages?.length-1] || null
        }
        results.push(conv);
      });
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv by convid
router.get("/unique/:id", Verify, async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    const friendId = conversation.members.find(id=>id !== req.user.id)
    const user = await User.findById(friendId);
    const messages = await Message.find({
      conversationId: conversation?._id,
    });
    const conv = { 
            ...p._doc,
            friend: {
              _id: user._id,
              username: user.username,
              profile: user.profile
            },
            message: messages[messages?.length-1] || null
          }
    res.status(200).json(conv)
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:usr1/:usr2", Verify, async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.usr1, req.params.usr2] },
    });
    const friendId = conversation.members.find(id=>id !== req.user.id)
    const user = await User.findById(friendId);
    const messages = await Message.find({
      conversationId: conversation?._id,
    });
    const conv = { 
            ...p._doc,
            friend: {
              _id: user._id,
              username: user.username,
              profile: user.profile
            },
            message: messages[messages?.length-1] || null
          }
    res.status(200).json(conv)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
