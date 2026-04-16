const jwt = require("jsonwebtoken");

async function identifyUser(req,res,next){
    const token = req.cookies.token;
      // if a user dont have that token it means he hasent logged in or registered
      if (!token) {
        return res.status(401).json({
          message: "Token not provided, Unauthorised access",
        });
      }
    
      // console.log("token", token);
    
      // if user has a token then we need its user id to create a post, and we can get that from cookies
      // handle it with try and catch becoz if token is tempered so catch will handle the error
      let decoded = null;
      try {
         decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        return res.status(401).json({
          message: "user not authorized",
        });
      }

      // add req.user a new property which will have the user id of the user who is logged in and making the request
        req.user = decoded
    // now to forward req we do:
    next()
    
}

module.exports = identifyUser