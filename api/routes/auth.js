const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Token = require("../models/Token");
//const Verify = require("../util/verify");
const bcrypt = require("bcrypt");


// Generate token
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin, username:user.username }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
};

// Generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin, username:user.username }, process.env.SECRETREFRESH_KEY);
};

router.post("/refresh", async (req, res) => {
  //take the refresh token from the user
  const refreshToken = req.body.token;

  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json("You are not authenticated!");

  const isToken = await Token.find({refresh: refreshToken});
  if (!isToken) {
    return res.status(403).json("Refresh token is not valid!");
  }

  jwt.verify(refreshToken, process.env.SECRETREFRESH_KEY, async (err, user) => {
    err && console.log(err);
    try {
      await Token.findOneAndDelete({refresh: refreshToken});
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      const newToken = new Token({refresh:newRefreshToken});
      await newToken.save();

      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (err) {
      res.status(500).json(err);
    }    
  });

});

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      description: "Hello Bloggies"
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err)
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(user){
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if(validPassword){
        //Generate an access token
        const creds = {id: user._id, isAdmin: user.isAdmin, username: user.username}
        const accessToken = generateAccessToken(creds);
        const refreshToken = generateRefreshToken(creds);
        
        //TO DO: Perform token
        const newToken = new Token({refresh: refreshToken});
        await newToken.save();
  
        res.status(200).json({
          id: user._id,
          username: user.username,
          profile: user.profile,
          isAdmin: user.isAdmin,
          accessToken,
          refreshToken,
        });
  
      }else{
        res.status(400).json("Username or password incorrect!");
      } 
    }else{
      res.status(404).json("user not found");
    }   
  } catch (err) {
    res.status(500).json(err)
  }
});

// LOGOUT
router.post("/logout", async (req, res) => {
  const refreshToken = req.body.token;
  try{
    await Token.findOneAndDelete({refresh: refreshToken});
    res.status(200).json("You logged out successfully.");
  }catch(err){
    res.status(500).json("Oop! something went wrong!");
  }
  
});

module.exports = router;