const router = require("express").Router();
const User = require("../models/User");
const Notification = require("../models/Notification");
const Verify = require("../util/verify");

//add
router.post("/", Verify, async (req, res) => {
  //const newNotification = new Notification(req.body);
  let notifications = [];
  let noties = [];
  const data = req.body;
  for(const n of data){
    noties.push(new Notification(n));
  }
  for(const noti of noties){
    console.log(noti)
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
router.put("/:id/open", Verify, async(req, res)=>{
  try {
    //console.log(req.params.id, req.user.id)
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

//update read a notification
router.put("/:id/read", Verify, async(req, res)=>{
  try {
    console.log(req.params.id, req.user.id)
    const notification = await Notification.findById(req.params.id);
    let noti = notification;
    noti.opened = true; 
    if(notification){
        await notification.updateOne({ $set: { viewed: true } });
    }
    res.status(200).json(noti);   
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//delete many
router.delete("/", Verify, async(req, res)=>{
  try {
    console.log("delete many")
    const {snd, trg, lnk} = req.query;
    if(snd && trg && lnk){
      await Notification.deleteMany({sender:snd, target:trg, link:lnk});
    }
    console.log("delete many success")
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
      const res = await Notification.find({ receiver: req.user.id, opened: false}).exec();
      let notifications = [];
      for(const n of res){
        const res = await User.findById(n.sender,'username profile').exec();
        const { _id, ...user } = res._doc;
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
