const router = require("express").Router();
const User = require("../models/User");
const Notification = require("../models/Notification");
const Verify = require("../util/verify");

//add
router.post("/", Verify, async (req, res) => {
  let notifications = [];
  let noties = [];
  const data = req.body;
  for(const n of data){
    noties.push(new Notification(n));
  }
  for(const noti of noties){
    const res = await User.findById(noti.sender,'username profile').exec();
    const { _id, ...user } = res._doc;
    notifications.push({...noti._doc,...user});
  }
  try {
    await Notification.insertMany(noties);
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/", Verify, async(req, res)=>{
  try {
    
    const notifications = await Notification.find({ 
                                receiver: req.user.id, opened: false}).exec();
    if(notifications.length > 0){
      for(const noti of notifications){
        await noti.updateOne({ $set: { opened: true } });
      }
    }
    res.status(200).json("No more notifications.");   
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  } 
});

// update read a notification
router.put("/:id", Verify, async(req, res)=>{
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id, {
        $set: { viewed: true }
      },
      { new: true }
    );
    if(updatedNotification){
      const user_res = await User.findById(updatedNotification.sender,'username profile').exec();
      const { _id, ...user } = user_res._doc;
      res.status(200).json({...updatedNotification._doc,...user});
    }else{
      res.status(401).json("No record found!!!");
    }
       
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//delete many
router.delete("/", Verify, async(req, res)=>{
  try {
    const {snd, trg, lnk} = req.query;
    if(snd && trg && lnk){
      await Notification.deleteMany({sender:snd, target:trg, link:lnk});
    }
    res.status(200).json("notifications successfully deleted");   
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
    const noties = await Notification.find({
      receiver: req.user.id,
    });
    let notifications = [];
    for(const noti of noties){
      const usr = await User.findById(noti.sender,'username profile').exec();
      const { _id, ...user } = usr._doc;
      notifications.push({...noti._doc,...user});
    }
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get open notifications
router.get("/:id/open", Verify, async (req, res) => {
  if(req.params.id === req.user.id){
    try {
      const noties = await Notification.find({ receiver: req.user.id, opened: false}).exec();
      let notifications = [];
      for(const n of noties){
        const usr = await User.findById(n.sender,'username profile').exec();
        const { _id, ...user } = usr._doc;
        notifications.push({...n._doc,...user});
      }
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).json(err);
    }
  }else{
    res.status(401).json("You can only get your open notifications");
  }
  
});

//get unreaded notifications
router.get("/:id/unread", Verify, async (req, res) => {
  if(req.params.id === req.user.id){
    try {
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
