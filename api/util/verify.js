const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
    const headers = req.headers.authorization;
    //console.log(headers)
    if (headers) {
      const token = headers.split(" ")[1];
  
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You are not authenticated!");
    }
  };

  module.exports = verify;