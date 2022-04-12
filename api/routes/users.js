const User = require("../models/User");
const router = require("express").Router();
const Verify = require("../util/verify");
//const bcrypt = require("bcrypt");

//get a user
router.get("/:id", Verify, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(user){
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    }else{
      res.status(404).send('user record not found');
    }   
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get all users
router.get("/", Verify, async (req, res) => {
  const popular = req.query.pop || null;
  const search = req.query.search || null;
  try {
    let users;
    if(popular !== null && popular > 0){
      const popularUserIds = await User.aggregate([
        {$project: {"followers_count": { $size: "$followers" } }},
        {$sort: {"followers_count": -1}}]).limit(Number(popular));

      const popularUsers = [];
      for(item of popularUserIds){
        let userItem = await User.findById(item._id, 'username profile cover posts followers followings description').exec();
        if(userItem){
          userItem._doc = {...userItem._doc, nfollowers: item.followers_count};
          popularUsers.push(userItem);
        }
      } 
      users = popularUsers;

      //users = await User.find();
      //users = users.sort((a,b)=>b.followers.length-a.followers.length).slice(0, Number(popular));
    }else if(search){
      users = await User.find({username: {"$regex": search, "$options": "i"}});
    }else{
      users = await User.find();
    }  
    if(users){
      const usersArray = [];
      users.forEach(u => {
        const { password, updatedAt, ...other } = u._doc;
        usersArray.push(other);
      })      
      res.status(200).json(usersArray);
    }else{
      res.status(404).send('No users record found');
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user by array of ids
router.get("/:id/followers", Verify, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const users = await User.find({'_id': { $in: user.followers } });  
    if(users){
      const usersArray = [];
      users.forEach(u => {
        const { password, updatedAt, ...other } = u._doc;
        usersArray.push(other);
      })      
      res.status(200).json(usersArray);
    }else{
      res.status(404).send('No users record found');
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id/following", Verify, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const users = await User.find({'_id': { $in: user.followings } });  
    if(users){
      const usersArray = [];
      users.forEach(u => {
        const { password, updatedAt, ...other } = u._doc;
        usersArray.push(other);
      })      
      res.status(200).json(usersArray);
    }else{
      res.status(404).send('No users record found');
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

//update user
router.put("/:id", Verify, async (req, res) => {
  if (req.user.id === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
      },
      { new: true }
      );
      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

//delete user
router.delete("/:id", Verify, async (req, res) => {
  if (req.user.id === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//follow a user
router.put("/:id/follow", Verify, async (req, res) => {
  if (req.user.id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.user.id);
      if (!user.followers.includes(req.user.id)) {
        await user.updateOne({ $push: { followers: req.user.id } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a user

router.put("/:id/unfollow", Verify, async (req, res) => {
    if (req.user.id !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);
        if (user.followers.includes(req.user.id)) {
          await user.updateOne({ $pull: { followers: req.user.id } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  });

module.exports = router;
