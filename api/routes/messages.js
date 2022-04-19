const router = require("express").Router();
const Message = require("../models/Message");
const Verify = require("../util/verify");

//add
router.post("/", Verify, async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/conv/:id", Verify, async(req, res)=>{
  try {
    const messages = await Message.find({conversationId: req.params.id, 
                                         receiver: req.user.id, viewed: false}).exec();
    if(messages.length > 0){
      for(const message of messages){
        await message.updateOne({ $set: { viewed: true } });
      }
    }
    res.status(200).json("No more messages to read.");   
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get
router.get("/chat/:id", Verify, async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.id,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get unreaded messages
router.get("/news", Verify, async (req, res) => {
  try {
    const messages = await Message.find({ receiver: req.user.id, viewed: false}).exec();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
