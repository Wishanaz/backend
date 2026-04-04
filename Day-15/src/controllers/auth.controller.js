const userModel = require("../models/user.model");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  // checking if username or email exist?
  const isUserExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExists) {
    return res.status(409).json({
      message:
        "User is already existing with this " +
        (isUserExists.email === email ? "Eamil" : "Username"),
    });
  }

  // now if user does not exists then do password hashing
  const hashedPassword = await bcrypt.hash(password, 10);
  // store that password in db:
  const user = await userModel.create({
    email,
    username,
    bio,
    password: hashedPassword,
    profileImage,
  });

  //create token
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  // save it in cookie
  res.cookie("token", token);

  // if all goes well then do:
  res.status(201).json({
    message: "user registered successfully!",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

async function loginController(req, res) {
  const { email, username, password } = req.body;

  // checking if user exists on the basis of username or password
  const user = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  // if user not found it means user is no even registered so
  if(!user){
    return res.status(404).json({
        message: "User not found"
    })
  }

  // Now we found user 
  // 1. check its password is valid?
  // for this we have bcrypt.compare
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if(!isPasswordValid){
    return res.status(401).json({
        message: "Password is invalid"
    })
  }

  // if all goes well
  // create token

  const token = jwt.sign(
    {id: user._id}, 
    process.env.JWT_SECRET,
    {expiresIn: "1d"}
  )

  // save in cookie
  res.cookie("token", token)

  res.status(201).json({
    message: "User Logged in successfully!",
    user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
  })

}

module.exports = {
  registerController,
  loginController
};
