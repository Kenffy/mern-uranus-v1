const router = require("express").Router();
const Notification = require("../models/Notification");
const Verify = require("../util/verify");

//add
router.post("/", Verify, async (req, res) => {
  const newNotification = new Notification(req.body);

  try {
    const savedNotification = await newNotification.save();
    res.status(200).json(savedNotification);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/", Verify, async(req, res)=>{
  try {
    const notifications = await Notification.find({ 
                                receiver: req.user.id, viewed: false}).exec();
    if(notifications.length > 0){
      for(const noti of notifications){
        await noti.updateOne({ $set: { viewed: true } });
      }
    }
    res.status(200).json("No more notifications.");   
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get a notification
router.get("/:id", Verify, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all notifications
router.get("/", Verify, async (req, res) => {
  try {
    const notifications = await Notification.find({
      receiver: req.user.id,
    });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get open notifications
router.get("/:id/open", Verify, async (req, res) => {
  if(req.params.id === req.user.id){
    try {
      console.log("open noti called")
      const notifications = await Notification.find({ receiver: req.user.id, opened: false}).exec();
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).json(err);
    }
  }else{
    res.status(401).json("You can only open your notifications");
  }
  
});

//get unreaded notifications
router.get("/:id/unread", Verify, async (req, res) => {
  if(req.params.id === req.user.id){
    try {
      console.log("unread noti called")
      const notifications = await Notification.find({ receiver: req.user.id, viewed: false}).exec();
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).json(err);
    }
  }else{
    res.status(401).json("You can only read your notifications");
  }
});

module.exports = router;
