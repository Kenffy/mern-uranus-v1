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
    const friendId = savedConversation.members.find(id=>id !== req.user.id);
    const user = await User.findById(friendId,'username profile').exec();

    const conv = {...savedConversation._doc,
      friend: {...user._doc},
      message: null,
      readed: 0
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

    var results = [];
    if(conversations){
      for (const c of conversations){
        const friendId = c.members.find(id=>id !== userId);
        const user = await User.findById(friendId,'username profile').exec();
        const lastMessage = await Message.find({conversationId: c._id})
        .limit(1).sort({createdAt: "desc"}).exec();

        const nLastMessages = await Message.countDocuments({conversationId: c._id, receiver: req.user.id, viewed: false})
        .sort({createdAt: "desc"}).exec();

        const conv = {...c._doc,
          friend: {...user._doc},
          message: lastMessage[0] || null,
          readed: nLastMessages
        }
        results.push(conv);
      };
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv by convid
router.get("/:id/conv", Verify, async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    const friendId = conversation.members.find(id=>id !== req.user.id)
    const user = await User.findById(friendId,'username profile').exec();

    const lastMessage = await Message.find({conversationId: conversation._id})
    .limit(1).sort({createdAt: "desc"}).exec();

    const nLastMessages = await Message.countDocuments({conversationId: c._id, receiver: req.user.id, viewed: false})
    .sort({createdAt: "desc"}).exec();

    const conv = {...c._doc,
      friend: {...user._doc},
      message: lastMessage[0] || null,
      readed: nLastMessages
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
    const user = await User.findById(friendId,'username profile').exec();

    const lastMessage = await Message.find({conversationId: conversation._id})
    .limit(1).sort({createdAt: "desc"}).exec();

    const nLastMessages = await Message.countDocuments({conversationId: c._id, receiver: req.user.id, viewed: false})
    .sort({createdAt: "desc"}).exec();

    const conv = {...c._doc,
      friend: {...user._doc},
      message: lastMessage[0] || null,
      readed: nLastMessages
    }
    res.status(200).json(conv)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
